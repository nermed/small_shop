import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Colors} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomStyle} from '../Theme/CustomStyle';
import {Title} from '../Tools/CustomTools';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RootStackParamListArticle} from './ArticleMain';
import {CustomContext} from '../Tools/CustomContext';
import {useDetailPerArticle} from '../Tools/CustomHooks';
import {AchatDetailProps} from '../Achats/AchatDetailProps';
import {Achat} from '../Achats/Achat';
import {VenteDetailProps} from '../Ventes/VenteDetailProps';
import {Vente} from '../Ventes/Vente';
import moment from 'moment';

type Props = StackScreenProps<RootStackParamListArticle, 'ArticleDetail'>;

export const ArticleDetail: React.FC<Props> = ({navigation, route}) => {
  let articlee = route.params.article;
  const {appros, ventes} = useContext(CustomContext);
  const {loadDetail, detailsAppros, detailsVentes} = useDetailPerArticle();
  const [option, setOption] = useState<string>('achat');
  let dataPosting = option == 'achat' ? detailsAppros : detailsVentes;
  const [dateFilter, setDateFilter] = useState(new Date(Date.now()));
  const [mode, setMode] = useState<AndroidMode | undefined>('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateFilter;
    setShow(false);
    if (event.type == 'set') {
      setDateFilter(currentDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const achatRender: ListRenderItem<AchatDetailProps> = ({item}) => {
    return <Achat achat={item} />;
  };
  const venteRender: ListRenderItem<VenteDetailProps> = ({item}) => {
    return <Vente vente={item} />;
  };
  loadDetail(articlee.id, appros, ventes);
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      // console.log(dateFilter)
      let subtitle = `Detail`;
      navigation.setOptions({
        headerRight: () => (
          <View style={{paddingRight: widthPercentageToDP('2%')}}>
            <Button
              color={Colors.blue900}
              onPress={showDatepicker}
              style={CustomStyle.btnSaveHeader}>
              <Icon name="calendar" size={20} />
            </Button>
          </View>
        ),
        headerTitle: () => <Title title={articlee.name} subtitle={subtitle} />,
        headerTitleStyle: {fontSize: 18},
      });
    });
    return refresh;
  }, [navigation, dateFilter]);
  return (
    <View style={CustomStyle.customScreen}>
      {show && (
        <DateTimePicker
          value={dateFilter}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#cccccc',
          marginBottom: heightPercentageToDP('1%'),
          paddingVertical: heightPercentageToDP('0.4%')
        }}>
        <Text
          style={{fontSize: 20, fontFamily: 'Roboto-Light', color: 'black'}}>
          {moment(dateFilter).format('DD-MM-YYYY')}
        </Text>
      </View>
      <View style={styles.rangeButton}>
        <Button
          style={option == 'achat' ? styles.disabledStyle : styles.buttonFilter}
          color={Colors.black}
          onTouchStart={() => setOption('achat')}
          labelStyle={{fontFamily: 'Roboto-Light'}}
          icon="cart-plus">
          Achat
        </Button>
        <Button
          style={option == 'vente' ? styles.disabledStyle : styles.buttonFilter}
          color={Colors.black}
          onTouchStart={() => setOption('vente')}
          labelStyle={{fontFamily: 'Roboto-Light'}}
          icon="cart-arrow-up">
          Ventes
        </Button>
      </View>
      <View style={{marginTop: heightPercentageToDP('2%')}}>
        <FlatList
          data={dataPosting}
          scrollEnabled
          ListFooterComponent={() => <></>}
          ListFooterComponentStyle={{
            marginBottom: heightPercentageToDP('10%'),
          }}
          renderItem={option == 'achat' ? achatRender : venteRender}
          keyExtractor={item => String(item.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rangeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonFilter: {
    backgroundColor: '#cccccc',
    borderRadius: 15,
  },
  disabledStyle: {
    // backgroundColor: Colors.blue200,
    borderRadius: 15,
  },
});
