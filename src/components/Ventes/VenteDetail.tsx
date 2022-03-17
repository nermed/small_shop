import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button, Colors, Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useMutation, useQueryClient} from 'react-query';
import {CustomStyle} from '../Theme/CustomStyle';
import {useStoreData, useStoreVente} from '../Tools/CustomApiHooks';
import {RootStackParamListArticle} from '../Articles/ArticleMain';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackScreenProps} from '@react-navigation/stack';
import {Title} from '../Tools/CustomTools';
import {CustomContext} from '../Tools/CustomContext';

type Props = StackScreenProps<RootStackParamListArticle, 'VenteDetail'>;

export const VenteDetail: React.FC<Props> = ({navigation, route}) => {
  const articlee = route.params.article;
  const [priceVente, setPriceVente] = useState(articlee.price);
  const [quantity, setQuantity] = useState(articlee.quantity);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const queryClient = useQueryClient();
  let {articles: bigData, ventes: allVentes} = useContext(CustomContext);

  const verifyQuantity = () => {
    Alert.alert(
        `${articlee.name}`,
        "Vous n'avez pas assez de quantite pour realiser cette vente!",
        [
          {
            // text: "Cancel",
            // onPress: () => console.log("Cancel Pressed"),
            // style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
  }

  const {isLoading: isUpdating, isSuccess, mutate} = useMutation(
    async () => {
      if (priceVente != null && quantity != 0) {
        if(quantity > articlee.quantity) {
            verifyQuantity();
            return;
        }
        let vente = {
          id: Date.now(),
          id_article: articlee.id,
          quantity: quantity,
          priceAchat: priceVente,
        };
        let articleP = {
          quantity: articlee.quantity - quantity,
          priceAchat: articlee.priceAchat,
          name: articlee.name,
          price: priceVente,
          isActif: articlee.isActif,
          id: articlee.id,
          category: articlee.category,
          mesureType: articlee.mesureType,
        };
        if (articleP) {
          await useStoreData(articleP, bigData);
          await useStoreVente(vente, allVentes);
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
            <Button color={Colors.blue900} style={CustomStyle.btnSaveHeader} onPress={mutate}>
              <Icon name="save" size={20} />
            </Button>
          </View>
        ),
        headerTitle: () => <Title title={articlee.name} subtitle="Vente" />,
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
        onChangeText={text => {
            setQuantity(Number(text));
        }}
        placeholder="Quantite"
        defaultValue={String(0)}
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
        onChangeText={text => setPriceVente(Number(text))}
        keyboardType="numeric"
        placeholder="Prix d'achat"
        defaultValue={String(0)}
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
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
