import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import { Title } from '../Tools/CustomTools';
import {AchatAjout} from './AchatAjout';
import {AchatConfirm} from './AchatConfirm';
import {AchatContext} from './AchatContext';
import {AchatDetailProps} from './AchatDetailProps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Achats} from './AchatList';
import { useNavigation } from '@react-navigation/native';
import { AchatEdit } from './AchatEdit';

const Stack = createStackNavigator();

export type RootStackParamListAchat = {
  ListesAchat: undefined;
  AjoutAchat: undefined;
  ConfirmationAchat: undefined;
  AchatEdit: {achat: AchatDetailProps}
};

export const AchatMain = () => {
  const navigation = useNavigation();
  return (
      <Stack.Navigator
        initialRouteName="ListesAchat"
        screenOptions={{
          animationEnabled: true,
          headerStyle: {
            backgroundColor: '#cccccc'
          },
        }}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <Title title="Listes" subtitle="Approvisionnement" />
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
          name="ListesAchat"
          component={Achats}
        />
        <Stack.Screen
          options={{
            headerTitle: () => (
              <Title title="Ajout Multiple" subtitle="Approvisionnement" />
            ),
            headerTitleStyle: {fontSize: 18},
          }}
          name="AjoutAchat"
          component={AchatAjout}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ConfirmationAchat"
          component={AchatConfirm}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="AchatEdit"
          component={AchatEdit}
        />
      </Stack.Navigator>
  );
};
