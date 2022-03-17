import { useNavigation, useNavigationState } from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors, FAB, Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ArticleProps } from '../Articles/ArticleProps';
import { RootStackParamListCategorie } from '../Categorie/CategorieMain';
import { CustomStyle } from '../Theme/CustomStyle';

type PropsTitle = {
  title: string;
  subtitle: string;
}
export const Title: React.FC<PropsTitle> = ({title, subtitle}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 20,
          color: Colors.black,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: 'Roboto-Light',
          fontSize: 15,
          color: Colors.black,
        }}>
        {subtitle}
      </Text>
    </View>
  );
};

type SearchProps = {
  search: string;
  setInput: (text: string) => void,
  text: string
}

export const Search: React.FC<SearchProps> = ({search, setInput, text}) => {
  let placeholder = `Chercher par le nom de ${text}`;
  return <View style={CustomStyle.viewSearch}>
  <View
    style={{
      display: 'flex',
      alignSelf: 'center',
      paddingLeft: 10,
    }}>
    <Icon name="search" size={20} color={Colors.black} />
  </View>
  <TextInput
    style={CustomStyle.inputSearch}
    onChangeText = {text => setInput(text)}
    placeholder={placeholder}
    placeholderTextColor={Colors.black}
  />
</View>
}
type FormProps = {
  setName: (text: string) => void;
  name: string
}
export const FormCategorieMesure: React.FC<FormProps> = ({setName, name}) => {
  return <View>
    <TextInput
          style={CustomStyle.input}
          onChangeText={text => setName(text)}
          placeholder="Nom"
          defaultValue={name}
          placeholderTextColor={Colors.black}
        />
  </View>
}
type SnackProps = {
  visible: boolean;
  onDismissSnackBar: () => void;
  setVisible: (visible: boolean) => void;
}
export const Snack: React.FC<SnackProps> = ({visible, onDismissSnackBar, setVisible}) => {
  const navigation = useNavigation();
  return <Snackbar
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
}