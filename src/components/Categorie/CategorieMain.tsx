import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {Title} from '../Tools/CustomTools';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CategorieList} from './CategorieList';
import {useNavigation} from '@react-navigation/native';
import { CategorieAdd } from './CategorieAdd';
import { CategorieEdit } from './CategorieEdit';

const Stack = createStackNavigator();

export type RootStackParamListCategorie = {
  ListesCategorie: undefined;
  AjoutCategorie: undefined;
  CategorieEdit: {categorie: {}};
};
export const CategorieMain = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="ListesCategorie"
      screenOptions={{
        animationEnabled: true,
        headerStyle: {
          backgroundColor: '#cccccc',
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: () => <Title title="Listes" subtitle="Categorie" />,
          headerTitleStyle: {fontSize: 18},
          headerLeft: () => (
            <View style={{paddingLeft: 30, paddingRight: 5}}>
              <Pressable onPress={() => navigation.openDrawer()}>
                <Icon name="list" color={Colors.black} size={18} />
              </Pressable>
            </View>
          ),
        }}
        name="ListesCategorie"
        component={CategorieList}
      />
      <Stack.Screen
        options={{
          headerTitle: () => <Title title="Ajout" subtitle="Categorie" />,
          headerTitleStyle: {fontSize: 18},
        }}
        name="AjoutCategorie"
        component={CategorieAdd}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="CategorieEdit"
        component={CategorieEdit}
      />
    </Stack.Navigator>
  );
};
