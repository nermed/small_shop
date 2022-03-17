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
import {useStoreData, useStoreVente} from '../Tools/CustomApiHooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackScreenProps} from '@react-navigation/stack';
import {Snack, Title} from '../Tools/CustomTools';
import {CustomContext} from '../Tools/CustomContext';
import {RootStackParamListVente} from './VenteMain';

type Props = StackScreenProps<RootStackParamListVente, 'VenteEdit'>;

export const VenteEdit: React.FC<Props> = ({navigation, route}) => {
  const vente = route.params.vente;
  const {articles} = useContext(CustomContext);
  let [articlee, setArticlee] = useState<ArticleProps>(() => {
    let selected;
    selected = articles.find(art => art.id == vente.id_article);
    return selected;
  });
  const [priceAchat, setPriceAchat] = useState(vente.priceAchat);
  const [quantity, setQuantity] = useState(vente.quantity);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const queryClient = useQueryClient();
  let {articles: bigData, ventes: AllVente} = useContext(CustomContext);

  const {isLoading: isUpdating, isSuccess, mutate} = useMutation(
    async () => {
      if (priceAchat != null && quantity != 0) {
        let venteChange = {
          id: vente.id,
          id_article: vente.id_article,
          quantity: quantity,
          priceAchat: priceAchat,
        };
        let ventee =
          quantity > vente.quantity
            ? quantity - vente.quantity
            : vente.quantity - quantity;
        let articleP = {
          quantity:
            quantity > vente.quantity
              ? articlee.quantity - ventee
              : articlee.quantity + ventee,
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
          await useStoreVente(venteChange, AllVente);
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
    <View>
      <View style={[CustomStyle.form, {marginTop: heightPercentageToDP('3%')}]}>
        <Text style={CustomStyle.headerTextSimple}>Quantite</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => setQuantity(Number(text))}
          placeholder="Quantite"
          defaultValue={String(vente.quantity)}
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
          defaultValue={String(vente.priceAchat)}
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
      </View>
      {isSuccess ? (
        <Snack
          visible={visible}
          setVisible={setVisible}
          onDismissSnackBar={onDismissSnackBar}
        />
      ) : (
        <></>
      )}
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
