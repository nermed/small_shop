import React, {} from 'react';
import { Pressable, View } from 'react-native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
//import files
import {ArticleProps} from './ArticleProps';
import {Articles} from './Articles';
import {ArticleAdd} from './ArticleAdd';
import {ArticleEdit} from './ArticleEdit';
import { AchatDetail } from '../Achats/AchatDetail';
import { Title } from '../Tools/CustomTools';
import { VenteDetail } from '../Ventes/VenteDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native-paper';
import { ArticleDetail } from './ArticleDetail';

export type RootStackParamListArticle = {
  Listes: undefined;
  Ajout: undefined;
  Modification: {article: ArticleProps};
  Approvisionnement: undefined;
  Ventes: undefined;
  AchatDetail: {article: ArticleProps};
  VenteDetail: {article: ArticleProps};
  ArticleDetail: {article: ArticleProps};
};

type Props = StackScreenProps<RootStackParamListArticle, 'Listes'>;

const Stack = createStackNavigator();

export const ArticleMain: React.FC<Props> = ({navigation}) => {
  
  return (
    <Stack.Navigator
      initialRouteName="Listes"
      screenOptions={{
        gestureDirection: 'vertical',
        gestureEnabled: true,
        animationEnabled: true,
        headerStyle: {
          // elevation: 1,
          backgroundColor: '#cccccc'
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: () => <Title title="Listes" subtitle="Articles" />,
          headerTitleStyle: {fontSize: 18},
          headerLeft: () => (
            <View style={{paddingLeft: 30, paddingRight: 5}} >
              <Pressable onPress={() => navigation.openDrawer()}>
                <Icon name="list" color={Colors.black} size={18} />
              </Pressable>
            </View>
          ),
        }}
        name="Listes"
        component={Articles}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Title title="Ajout" subtitle="Article" />
          ),
          headerTitleStyle: {fontSize: 18},
        }}
        name="Ajout"
        component={ArticleAdd}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="Modification"
        component={ArticleEdit}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="AchatDetail"
        component={AchatDetail}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name="VenteDetail"
        component={VenteDetail}
      />
      <Stack.Screen
        options={{
          headerShown: true
        }}
        name="ArticleDetail"
        component={ArticleDetail}
      />
    </Stack.Navigator>
  );
};
