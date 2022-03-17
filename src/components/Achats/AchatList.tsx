import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, Pressable, Text, View} from 'react-native';
import {CustomStyle} from '../Theme/CustomStyle';
import {RootStackParamListAchat} from './AchatMain';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {AchatDetailProps} from './AchatDetailProps';
import {Achat} from './Achat';
import { ModalGeneral } from '../Tools/Modal';
import { CustomContext } from '../Tools/CustomContext';

type Props = StackScreenProps<RootStackParamListAchat, 'ListesAchat'>;

export const Achats: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState<AchatDetailProps>();
  const {appros} = useContext(CustomContext);

  
  const openClose = () => {
    setModalVisible(!modalVisible);
  };
  
  const openModal = (el: AchatDetailProps): any => {
    const id = appros?.find(art => art.id === el.id);
    if (id) {
      setSelect(id);
    } else {
      setSelect(el);
    }
    openClose();
  };
  
  const achatRender: ListRenderItem<AchatDetailProps> = ({item}) => {
    return (
      <Pressable onPress={() => openModal(item)}>
        <Achat achat={item} />
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
        type = "achat"
      />
      <FlatList
        data={appros}
        scrollEnabled
        ListFooterComponent={() => <></>}
        ListFooterComponentStyle={{marginBottom: heightPercentageToDP('10%')}}
        renderItem={achatRender}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};
