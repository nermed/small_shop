import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Card, Colors} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQueryClient } from 'react-query';
import { AchatDetailProps } from '../Achats/AchatDetailProps';
import { ArticleContext } from '../Articles/ArticleContext';
import {RootStackParamListArticle} from '../Articles/ArticleMain';
import {ArticleProps} from '../Articles/ArticleProps';
import { CategorieProps } from '../Categorie/CategorieProps';
import {CustomStyle} from '../Theme/CustomStyle';
import { VenteDetailProps } from '../Ventes/VenteDetailProps';
import { useDeleteAppro, useDeleteCateMesure, useDeleteVente } from './CustomApiHooks';
import { CustomContext } from './CustomContext';
import { useGetName } from './CustomHooks';

type Props = {
  select: ArticleProps | undefined;
  modalVisible: boolean;
  openClose: () => void;
};

type PropsGeneral = {
  select: AchatDetailProps | undefined;
  modalVisible: boolean;
  type: string;
  openClose: () => void;
};

type PropsMesure = {
  select: CategorieProps | undefined;
  modalVisible: boolean;
  type: string;
  openClose: () => void;
};

export const ModalChoice: React.FC<Props> = ({
  select,
  modalVisible,
  openClose,
}) => {
  const quantite = select?.quantity === undefined ? '' : select.quantity;
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredVieww}>
        <Card style={styles.modalVieww}>
          <Text style={styles.modalText}>{select?.name}</Text>
          <Card.Content>
            <View style={styles.content}>
              <Pressable
                style={styles.butt}
                onPress={() => {
                  openClose();
                  navigation.navigate('Modification', {article: select});
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Modification</Text>
                <Icon name="plus-circle" size={25} color={Colors.black} />
              </Pressable>
              <Pressable
                style={[styles.butt, {marginTop: heightPercentageToDP('1%')}]}
                onPress={() => {
                  openClose();
                  navigation.navigate('ArticleDetail', {article: select});
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16, fontWeight: '600'}]}>Detail</Text>
                <Icon name="eye-circle" size={25} color={Colors.black} />
              </Pressable>
              <Pressable
                style={[styles.butt, {marginTop: heightPercentageToDP('1%')}]}
                onPress={() => {
                  openClose();
                  navigation.navigate('AchatDetail', {article: select});
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16, fontWeight: '600'}]}>Approvisionnement</Text>
                <Icon name="plus-circle" size={25} color={Colors.black} />
              </Pressable>
              <Pressable
                style={[styles.butt, {marginTop: heightPercentageToDP('1%')}]}
                onPress={() => {
                  openClose();
                  navigation.navigate('VenteDetail', {article: select});
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16, fontWeight: '600'}]}>Ventes</Text>
                <Icon name="plus-circle" size={25} color={Colors.black} />
              </Pressable>
            </View>
          </Card.Content>
          <Card.Actions style={styles.buttonView}>
            <Pressable onPress={() => openClose()} style={[styles.buttonn]}>
              <Text style={[CustomStyle.simpleText, {fontSize: 16, fontWeight: '600'}]}>Annuler</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

export const ModalGeneral: React.FC<PropsGeneral> = ({
  select,
  modalVisible,
  type,
  openClose,
}) => {
  const {articles, appros, ventes} = useContext(CustomContext);
  let id_article = select?.id_article == undefined ? 0 : select?.id_article;
  let { article: name_article } = useGetName(id_article, articles);
  const quantite = select?.quantity === undefined ? '' : select.quantity;
  let {loadDelete, response} = useDeleteAppro();
  let {loadDeleteV, response: rep} = useDeleteVente();
  let query = useQueryClient();
  const deleteApprov = (
    appro: AchatDetailProps | undefined,
  ) => {
    let appross: AchatDetailProps[] = [];
    if(appro) {
      appros.forEach(appr => {
        if(appr.id != appro.id) {
          appross.push(appr);
        }
      });
      articles.forEach(art => {
        if(art.id == appro.id_article) {
          let minusQ = art.quantity - appro.quantity
          let minusP = art.priceAchat - appro.priceAchat
          art.quantity = (minusQ) > 0 ? minusQ : 0;
          art.priceAchat = (minusP) > 0 ? minusP : 0;
        }
      });
      loadDelete(appross, articles);
    }
    if(response) {
      query.invalidateQueries(['general']);
      openClose();
    }
  };
  const deleteVente = (
    vente: VenteDetailProps | undefined,
  ) => {
    let ventess: VenteDetailProps[] = [];
    if(vente) {
      ventes.forEach(appr => {
        if(appr.id != vente.id) {
          ventess.push(appr);
        }
      });
      articles.forEach(art => {
        if(art.id == vente.id_article) {
          let plusQ = art.quantity + vente.quantity;
          art.quantity = plusQ;
        }
      });
      loadDeleteV(ventess, articles);
    }
    if(rep) {
      query.invalidateQueries(['general']);
      openClose();
    }
  };
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredVieww}>
        <Card style={styles.modalVieww}>
          <Text style={styles.modalText}>{name_article}</Text>
          <Card.Content>
            <View style={styles.content}>
              <Pressable
                style={styles.butt}
                onPress={() => {
                  openClose();
                  if(type == "vente") {
                    navigation.navigate('VenteEdit', {vente: select});
                  } else {
                    navigation.navigate('AchatEdit', {achat: select});
                  }
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Modification</Text>
                <Icon name="plus-circle" size={25} color={Colors.black} />
              </Pressable>
              <Pressable
                style={[styles.butt, {marginTop: heightPercentageToDP('2%')}]}
                onPress={() => {
                  if(type == "vente") {
                    deleteVente(select);
                  } else {
                    deleteApprov(select);
                  }
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Supprimer</Text>
                <Icon name="minus-circle" size={25} color={Colors.red900} />
              </Pressable>
            </View>
          </Card.Content>
          <Card.Actions style={styles.buttonView}>
            <Pressable onPress={() => openClose()} style={[styles.buttonn]}>
              <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Annuler</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

export const ModalCategorieMesure: React.FC<PropsMesure> = ({
  select,
  modalVisible,
  type,
  openClose,
}) => {
  const {articles, categories, mesures} = useContext(CustomContext);
  let {loadDelete, response} = useDeleteCateMesure();
  let query = useQueryClient();
  const deleteCategorie = (
    category: CategorieProps | undefined,
  ) => {
    let categoriess: CategorieProps[] = [];
    if(category) {
      categories.forEach(appr => {
        if(appr.id != category.id) {
          categoriess.push(appr);
        }
      });
      articles.forEach(art => {
        if(art.category.toLowerCase() == category.name.toLowerCase()) {
          art.category = ''
        }
      });
      loadDelete(categoriess, articles, 'categorie');
    }
    if(response) {
      query.invalidateQueries(['general']);
      openClose();
    }
  };
  const deleteMesure = (
    mesure: CategorieProps | undefined,
  ) => {
    let mesuress: CategorieProps[] = [];
    if(mesure) {
      mesures.forEach(mes => {
        if(mes.id != mesure.id) {
          mesuress.push(mes);
        }
      });
      articles.forEach(art => {
        if(art.mesureType.toLowerCase() == mesure.name.toLowerCase()) {
          art.mesureType = '';
        }
      });
      loadDelete(mesuress, articles, 'mesure');
    }
    if(response) {
      query.invalidateQueries(['general']);
      openClose();
    }
  };
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredVieww}>
        <Card style={styles.modalVieww}>
          <Text style={styles.modalText}>{select?.name}</Text>
          <Card.Content>
            <View style={styles.content}>
              <Pressable
                style={styles.butt}
                onPress={() => console.log('modif')}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Modification</Text>
                <Icon name="plus-circle" size={25} color={Colors.black} />
              </Pressable>
              <Pressable
                style={[styles.butt, {marginTop: heightPercentageToDP('2%')}]}
                onPress={() => {
                  if(type == "mesure") {
                    deleteMesure(select);
                  } else {
                    deleteCategorie(select);
                  }
                }}>
                <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Supprimer</Text>
                <Icon name="minus-circle" size={25} color={Colors.red900} />
              </Pressable>
            </View>
          </Card.Content>
          <Card.Actions style={styles.buttonView}>
            <Pressable onPress={() => openClose()} style={[styles.buttonn]}>
              <Text style={[CustomStyle.simpleText, {fontSize: 16}]}>Annuler</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputModal: {
    top: 5,
    height: heightPercentageToDP('8%'),
    color: 'black',
    fontFamily: 'Roboto-Light',
    width: widthPercentageToDP('50%'),
    marginBottom: 20,
    borderColor: 'gray',
    borderBottomWidth: heightPercentageToDP('0.1%'),
    borderRadius: 3,
    marginVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredVieww: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E8EDED',
    borderRadius: 10,
    width: widthPercentageToDP('60%'),
    paddingTop: 0,
    paddingHorizontal: 0,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  modalVieww: {
    margin: 10,
    backgroundColor: '#E8EDED',
    borderRadius: 10,
    width: widthPercentageToDP('70%'),
    paddingTop: 0,
    paddingHorizontal: 0,
    padding: 1,
    // alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  buttonn: {
    paddingBottom: heightPercentageToDP('2%'),
    fontFamily: 'Roboto-Medium',
  },
  button: {
    borderRadius: 20,
    padding: 5,
    fontFamily: 'Roboto-Medium',
  },
  buttonOpen: {
    color: Colors.blue900,
  },
  buttonClose: {
    color: '#383939',
    fontFamily: 'Roboto-Medium',
  },
  textStyle: {
    color: '#383939',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Roboto-Medium',
    top: 8,
    fontSize: 17,
  },
  modalHeader: {
    paddingTop: 0,
    marginBottom: 10,
    fontSize: 20,
    backgroundColor: Colors.blue900,
  },
  cardTitle: {
    fontSize: 17,
    color: 'white',
  },
  content: {
    paddingVertical: heightPercentageToDP('2%'),
    paddingHorizontal: heightPercentageToDP('1%'),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
  },
  butt: {
    marginBottom: heightPercentageToDP('2%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: heightPercentageToDP('0.04%'),
    borderBottomColor: Colors.black,
  },
});
