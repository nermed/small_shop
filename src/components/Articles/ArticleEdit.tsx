import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button, Checkbox, Colors, Snackbar} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomStyle} from '../Theme/CustomStyle';
import {ArticleProps} from './ArticleProps';
import {RootStackParamListArticle} from './ArticleMain';
import {useMutation, useQueryClient} from 'react-query';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStoreData} from '../Tools/CustomApiHooks';
import {Title} from '../Tools/CustomTools';
import {CustomContext} from '../Tools/CustomContext';
import SelectDropdown from 'react-native-select-dropdown';

type Props = StackScreenProps<RootStackParamListArticle, 'Modification'>;

export const ArticleEdit: React.FC<Props> = ({navigation, route}) => {
  const articlee = route.params.article;
  const [name, setName] = useState<string>(articlee.name);
  const [category, setCategory] = useState<string>(articlee.category);
  const [mesureType, setMesureType] = useState<string>(articlee.mesureType);
  const [price, setPrice] = useState<number>(articlee.price);
  const [isActif, setIsActif] = useState<boolean>(articlee.isActif);
  let {articles: bigData, categories, mesures} = useContext(CustomContext);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const categorie = categories.map(categ => categ.name);
  const mesure = mesures.map(mes => mes.name);

  const queryClient = useQueryClient();

  const {isLoading: isUpdating, isSuccess, mutate} = useMutation(
    async () => {
      if (
        name.length !== 0 &&
        category.length !== 0 &&
        mesureType.length !== 0
      ) {
        let articleP = {
          id: articlee.id,
          name: name,
          category: category,
          mesureType: mesureType,
          price: price,
          quantity: articlee.quantity,
          priceAchat: articlee.priceAchat,
          isActif: isActif,
        };
        if (articleP) {
          await useStoreData(articleP, bigData);
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
              color={Colors.black}
              style={CustomStyle.buttonIcon}
              onPress={mutate}>
              <Icon name="save" size={25} />
            </Button>
          </View>
        ),
        headerTitle: () => <Title title={articlee.name} subtitle="Modifier" />,
        headerTitleStyle: {fontSize: 18},
      });
    });
    return refresh;
  }, [navigation]);

  return (
    <View>
      <View style={CustomStyle.form}>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          placeholder="Nom"
          placeholderTextColor={Colors.black}
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPrice(Number(text))}
          keyboardType="numeric"
          placeholder="Prix de vente"
          placeholderTextColor={Colors.black}
          value={String(price)}
        />
        <View 
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: heightPercentageToDP('1%'),
          }}>
          <Text
            style={[
              CustomStyle.simpleText,
              {marginTop: heightPercentageToDP('2.5%')},
            ]}>
            Categorie
            <Icon name="arrow-right" color={Colors.black} />
          </Text>
          <SelectDropdown
            rowTextStyle={{fontFamily: 'Roboto-Light', fontSize: 14}}
            rowStyle={{padding: 1, height: heightPercentageToDP('7%')}}
            dropdownStyle={{
              width: widthPercentageToDP('60%'),
              maxHeight: heightPercentageToDP('30%'),
            }}
            buttonTextStyle={{fontFamily: 'Roboto-Light', fontSize: 14}}
            defaultButtonText="Taper pour selectionner"
            data={categorie}
            defaultValue={category}
            statusBarTranslucent
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: heightPercentageToDP('1%'),
          }}>
          <Text
            style={[
              CustomStyle.simpleText,
              {marginTop: heightPercentageToDP('2.5%')},
            ]}>
            Unite de mesure
            <Icon name="arrow-right" color={Colors.black} />
          </Text>
          <SelectDropdown
            rowTextStyle={{fontFamily: 'Roboto-Light', fontSize: 14}}
            rowStyle={{padding: 1, height: heightPercentageToDP('7%')}}
            dropdownStyle={{
              width: widthPercentageToDP('60%'),
              maxHeight: heightPercentageToDP('30%'),
            }}
            buttonTextStyle={{fontFamily: 'Roboto-Light', fontSize: 14}}
            defaultButtonText="Taper pour selectionner"
            data={mesure}
            defaultValue={mesureType}
            statusBarTranslucent
            onSelect={(selectedItem, index) => {
              setMesureType(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        {/* <View style={styles.checkboxContainer}>
        <Text style={[CustomStyle.simpleText, {paddingTop: 5}]}>
          Disponible:{' '}
        </Text>
        <Checkbox
          status={isActif ? 'checked' : 'unchecked'}
          uncheckedColor={Colors.black}
          color={Colors.blue900}
          onPress={() => {
            setIsActif(!isActif);
          }}
        />
      </View> */}
      </View>
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
