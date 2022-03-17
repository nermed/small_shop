import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Route, StatusBar, StyleSheet, Text, View} from 'react-native';
//import main files
import {ArticleMain} from '../Articles/ArticleMain';
import {AchatMain} from '../Achats/AchatMain';
import {VenteMain} from '../Ventes/VenteMain';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CategorieMain} from '../Categorie/CategorieMain';
import { MesureMain } from '../Style_mesure/MesureMain';

const Drawer = createDrawerNavigator();

const screenOptions = (route: Route, color: string) => {
  let iconName: string = '';

  switch (route.name) {
    case 'Produits':
      iconName = 'home';
      break;
    case 'Categorie':
      iconName = 'addfile';
      break;
    case 'Mesure':
      iconName = 'calculator';
      break;
    case 'Approvisionnement':
      iconName = 'carryout';
      break;
    case 'Ventes':
      iconName = 'shoppingcart';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

export const NavigationTheme = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Produits"
      screenOptions={({route}) => ({
        drawerIcon: ({color}) => screenOptions(route, color),
        drawerLabelStyle: {fontFamily: 'Roboto-Bold'},
        drawerStyle: styles.menu,
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f2f2f2',
          borderBottomWidth: heightPercentageToDP('0.1%'),
        },
        headerTitleStyle: {fontFamily: 'Roboto-Bold', color: Colors.black},
      })}>
      <Drawer.Screen name="Produits" component={ArticleMain} />
      <Drawer.Screen name="Categorie" component={CategorieMain} />
      <Drawer.Screen name="Mesure" component={MesureMain} />
      <Drawer.Screen name="Approvisionnement" component={AchatMain} />
      <Drawer.Screen name="Ventes" component={VenteMain} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
});
