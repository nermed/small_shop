import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, Pressable, Text, View} from 'react-native';
import {CustomStyle} from '../Theme/CustomStyle';
import {RootStackParamListVente} from './VenteMain';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {VenteDetailProps} from './VenteDetailProps';
import {Vente} from './Vente';
import { ModalGeneral } from '../Tools/Modal';
import { CustomContext } from '../Tools/CustomContext';

type Props = StackScreenProps<RootStackParamListVente, 'ListesVentes'>;

export const Ventes: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState<VenteDetailProps>();
  const {ventes} = useContext(CustomContext);

  const openClose = () => {
    setModalVisible(!modalVisible);
  };
  
  const openModal = (el: VenteDetailProps): any => {
    const id = ventes?.find(art => art.id === el.id);
    if (id) {
      setSelect(id);
    } else {
      setSelect(el);
    }
    openClose();
  };
  
  const venteRender: ListRenderItem<VenteDetailProps> = ({item}) => {
    return (
      <Pressable onPress={() => openModal(item)}>
        <Vente vente = {item} />
      </Pressable>
    );
  };

  useEffect(() => {

  }, [])

  return (
    <View style={[CustomStyle.customScreen, {paddingVertical: heightPercentageToDP('0%')}]}>
      <ModalGeneral
        openClose={openClose}
        modalVisible={modalVisible}
        select={select}
        type = "vente"
      />
      <FlatList
        data={ventes}
        scrollEnabled
        ListFooterComponent={() => <></>}
        ListFooterComponentStyle={{marginBottom: heightPercentageToDP('10%')}}
        renderItem={venteRender}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};
