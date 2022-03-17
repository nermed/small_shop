import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Button,
  Checkbox,
  Colors,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useMutation, useQueryClient} from 'react-query';
import {ArticleProps} from '../Articles/ArticleProps';
import {CustomStyle} from '../Theme/CustomStyle';
import {useStoreAppro, useStoreData} from '../Tools/CustomApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamListArticle} from '../Articles/ArticleMain';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackScreenProps} from '@react-navigation/stack';
import {Title} from '../Tools/CustomTools';
import {AchatDetailProps} from './AchatDetailProps';
import {CustomContext} from '../Tools/CustomContext';
import {RootStackParamListAchat} from './AchatMain';

type Props = StackScreenProps<RootStackParamListAchat, 'AchatEdit'>;

export const AchatEdit: React.FC<Props> = ({navigation, route}) => {
  const achat = route.params.achat;
  const {articles} = useContext(CustomContext);
  let [articlee, setArticlee] = useState<ArticleProps>(() => {
    let selected;
    selected = articles.find(art => art.id == achat.id_article);
    return selected;
  });
  const [priceAchat, setPriceAchat] = useState(achat.priceAchat);
  const [quantity, setQuantity] = useState(achat.quantity);
  const [disable, setDisable] = useState<boolean>(false);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const queryClient = useQueryClient();
  let {articles: bigData, appros: allApprov} = useContext(CustomContext);

  const {isLoading: isUpdating, isSuccess, mutate} = useMutation(
    async () => {
      if (priceAchat != null && quantity != 0) {
        let approv = {
          id: achat.id,
          id_article: achat.id_article,
          quantity: quantity,
          priceAchat: priceAchat,
        };
        let appro =
          quantity > achat.quantity
            ? quantity - achat.quantity
            : achat.quantity - quantity;
        let articleP = {
          quantity:
            quantity > achat.quantity
              ? articlee.quantity + appro
              : articlee.quantity - appro,
          priceAchat: priceAchat,
          name: articlee.name,
          price: articlee.price,
          isActif: articlee.isActif,
          id: articlee.id,
          category: articlee.category,
          mesureType: articlee.mesureType,
        };
        if (articleP) {
          await useStoreData(articleP, bigData);
          await useStoreAppro(approv, allApprov);
        }
      } else {
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['general']);
        setVisible(!visible);
      },
    },
  );
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{paddingRight: widthPercentageToDP('2%')}}>
            <Button
              color={Colors.blue900}
              style={CustomStyle.btnSaveHeader}
              onPress={mutate}>
              <Icon name="save" size={20} />
            </Button>
          </View>
        ),
        headerTitle: () => (
          <Title title={articlee?.name} subtitle="Approvisionner" />
        ),
        headerTitleStyle: {fontSize: 18},
      });
    });
    return refresh;
  }, [navigation]);
  return (
    <View style={[CustomStyle.form, {marginTop: heightPercentageToDP('3%')}]}>
      <Text style={CustomStyle.headerTextSimple}>Quantite</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={text => setQuantity(Number(text))}
        placeholder="Quantite"
        defaultValue={String(achat.quantity)}
        placeholderTextColor={Colors.black}
      />
      <Text
        style={[
          CustomStyle.headerTextSimple,
          {marginTop: heightPercentageToDP('4%')},
        ]}>
        Prix d'achat
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPriceAchat(Number(text))}
        keyboardType="numeric"
        placeholder="Prix d'achat"
        defaultValue={String(achat.priceAchat)}
        placeholderTextColor={Colors.black}
      />
      {isUpdating ? (
        <ActivityIndicator
          size="large"
          style={{
            bottom: 0,
            position: 'absolute',
            width: widthPercentageToDP('70%'),
            left: 50,
          }}
        />
      ) : (
        <></>
      )}
      <Snackbar
        visible={visible}
        style={CustomStyle.snackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Retour',
          labelStyle: {fontFamily: 'Roboto-Medium'},
          onPress: () => {
            navigation.goBack();
            setVisible(!visible);
          },
        }}>
        Enregistrement avec succes
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    borderBottomColor: Colors.teal100,
    color: Colors.black,
    borderBottomWidth: heightPercentageToDP('0.1%'),
    fontFamily: 'Roboto-Light',
    // backgroundColor: Colors.blue900,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
