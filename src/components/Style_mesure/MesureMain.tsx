import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {Title} from '../Tools/CustomTools';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MesureList} from './MesureList';
import {useNavigation} from '@react-navigation/native';
import { MesureAdd } from './MesureAdd';
import { MesureEdit } from './MesureEdit';

const Stack = createStackNavigator();

export type RootStackParamListMesure = {
  ListesMesure: undefined;
  AjoutMesure: undefined;
  MesureEdit: {mesure: {}};
};

export const MesureMain = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="ListesMesure"
      screenOptions={{
        animationEnabled: true,
        headerStyle: {
          backgroundColor: '#cccccc',
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: () => <Title title="Listes" subtitle="Unite de Mesure" />,
          headerTitleStyle: {fontSize: 18},
          headerLeft: () => (
            <View style={{paddingLeft: 30, paddingRight: 5}}>
              <Pressable onPress={() => navigation.openDrawer()}>
                <Icon name="list" color={Colors.black} size={18} />
              </Pressable>
            </View>
          ),
        }}
        name="ListesMesure"
        component={MesureList}
      />
      <Stack.Screen
        options={{
          headerTitle: () => <Title title="Ajout" subtitle="Unite de Mesure" />,
          headerTitleStyle: {fontSize: 18},
        }}
        name="AjoutMesure"
        component={MesureAdd}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="MesureEdit"
        component={MesureEdit}
      />
    </Stack.Navigator>
  );
};
