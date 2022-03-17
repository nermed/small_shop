/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import {Button, View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationTheme} from './src/components/Theme/NavigationTheme';
import {useQuery} from 'react-query';
import {ArticleProps} from './src/components/Articles/ArticleProps';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from 'react-native-paper';
import {CustomContext} from './src/components/Tools/CustomContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AchatDetailProps} from './src/components/Achats/AchatDetailProps';
import { VenteDetailProps } from './src/components/Ventes/VenteDetailProps';
import { CategorieProps } from './src/components/Categorie/CategorieProps';

function App() {
  let articles: ArticleProps[] = [];
  let appros: AchatDetailProps[] = [];
  let ventes: VenteDetailProps[] = [];
  let categories: CategorieProps[] = [];
  let mesures: CategorieProps[] = [];

  let query = ['general'];
  let {data, isLoading, error, refetch} = useQuery(
    query,
    async () => {
      let values;
      try {
        values = await AsyncStorage.multiGet(['@articles', '@appro', '@ventes', '@categorie', '@mesure'])
      } catch(e) {
        console.log(e)
      }
      return values;
    },
    {
      staleTime: 120000,
    },
  );
  if (isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          paddingTop: heightPercentageToDP('40%'),
          backgroundColor: Colors.white,
        }}>
        <ActivityIndicator size="large" color={Colors.blue900} />
      </View>
    );
  } else {
    if(data) {
      data.forEach(dt => {
        if(dt[0] == "@appro") {
          if(dt[1]) {
            appros = JSON.parse(dt[1]);
          }
        } else if(dt[0] == "@articles") {
          if(dt[1]) {
            articles = JSON.parse(dt[1]);
          }
        } else if(dt[0] == "@ventes") {
          if(dt[1]) {
            ventes = JSON.parse(dt[1]);
          }
        } else if(dt[0] == "@categorie") {
          if(dt[1]) {
            categories = JSON.parse(dt[1]);
          }
        } else if(dt[0] == "@mesure") {
          if(dt[1]) {
            mesures = JSON.parse(dt[1]);
          }
        }
      })
    }
  }
  return (
    <CustomContext.Provider
      value={{
        articles: articles == undefined ? [] : articles,
        appros: appros == undefined ? [] : appros,
        ventes: ventes == undefined ? [] : ventes,
        categories: categories == undefined ? [] : categories,
        mesures: mesures == undefined ? [] : mesures
      }}>
    <StatusBar backgroundColor= "#cccccc" translucent barStyle={'dark-content'} />

      <NavigationContainer>
        <NavigationTheme />
      </NavigationContainer>
    </CustomContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
