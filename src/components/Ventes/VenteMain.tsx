import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import { Title } from '../Tools/CustomTools';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Ventes} from './VenteList';
import { useNavigation } from '@react-navigation/native';
import { VenteDetailProps } from './VenteDetailProps';
import { VenteEdit } from './VenteEdit';

const Stack = createStackNavigator();

export type RootStackParamListVente = {
  ListesVentes: undefined;
  VenteEdit: {vente: VenteDetailProps};
};

export const VenteMain = () => {
  const navigation = useNavigation();
  return (
      <Stack.Navigator
        initialRouteName="ListesVentes"
        screenOptions={{
          animationEnabled: true,
          headerStyle: {
            backgroundColor: '#cccccc'
          },
        }}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <Title title="Listes" subtitle="Ventes" />
            ),
            headerTitleStyle: {fontSize: 18},
            headerLeft: () => (
              <View style={{paddingLeft: 30, paddingRight: 5}}>
                <Pressable onPress={() => navigation.openDrawer()}>
                  <Icon name="list" color={Colors.black} size={18} />
                </Pressable>
              </View>
            ),
          }}
          name="ListesVentes"
          component={Ventes}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="VenteEdit"
          component={VenteEdit}
        />
      </Stack.Navigator>
  );
};
