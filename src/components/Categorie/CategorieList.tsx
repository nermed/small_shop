import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {FlatList, ListRenderItem, Pressable, Text, View} from 'react-native';
import {Colors, FAB} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CustomStyle} from '../Theme/CustomStyle';
import {CustomContext} from '../Tools/CustomContext';
import {Search} from '../Tools/CustomTools';
import {ModalCategorieMesure} from '../Tools/Modal';
import {Categorie} from './Categorie';
import {RootStackParamListCategorie} from './CategorieMain';
import {CategorieProps} from './CategorieProps';

type Props = StackScreenProps<RootStackParamListCategorie, 'ListesCategorie'>;

export const CategorieList: React.FC<Props> = ({navigation}) => {
  const {categories} = useContext(CustomContext);
  const [input, setInput] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState<CategorieProps>();

  const openClose = () => {
    setModalVisible(!modalVisible);
  };

  const openModal = (el: CategorieProps): any => {
    const id = categories?.find(art => art.id === el.id);
    if (id) {
      setSelect(id);
    } else {
      setSelect(el);
    }
    openClose();
  };

  const categorieRender: ListRenderItem<CategorieProps> = ({item}) => {
    return (
      <Pressable onPress={() => openModal(item)}>
        <Categorie categorie={item} />
      </Pressable>
    );
  };
  return (
    <View style={CustomStyle.customScreen}>
      <ModalCategorieMesure
        openClose={openClose}
        modalVisible={modalVisible}
        select={select}
        type="categorie"
      />
      <Search setInput={setInput} search={input} text="la categorie" />
      <FlatList
        data={categories}
        scrollEnabled
        ListFooterComponent={() => <></>}
        ListFooterComponentStyle={{marginBottom: heightPercentageToDP('10%')}}
        renderItem={categorieRender}
        keyExtractor={item => String(item.id)}
      />
      <FAB
        color={Colors.white}
        icon={'plus'}
        onPress={() => navigation.navigate('AjoutCategorie')}
        style={{
          top: heightPercentageToDP('0%'),
          bottom: heightPercentageToDP('25%'),
          left: heightPercentageToDP('43%'),
          right: heightPercentageToDP('60%'),
          marginBottom: heightPercentageToDP('4%'),
          backgroundColor: Colors.blue900,
          marginRight: heightPercentageToDP('44%'),
        }}
      />
    </View>
  );
};
