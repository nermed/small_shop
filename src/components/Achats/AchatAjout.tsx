import React, { useContext } from 'react';
import {FlatList, ListRenderItem, Pressable, Text, View} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Article } from '../Articles/Article';
import { ArticleContext } from '../Articles/ArticleContext';
import { ArticleProps } from '../Articles/ArticleProps';
import { CustomStyle } from '../Theme/CustomStyle';

export const AchatAjout = () => {
  const {articles} = useContext(ArticleContext);
  const articlesRender: ListRenderItem<ArticleProps> = ({item}) => {
    return (
      <Pressable onPress={() => console.log('hey')}>
        <Article article={item} />
      </Pressable>
    );
  };
  return (
    <View style={CustomStyle.customScreen}>
      <FlatList
        data={articles}
        scrollEnabled
        ListFooterComponent={() => <></>}
        ListFooterComponentStyle={{marginBottom: heightPercentageToDP('3%')}}
        renderItem={articlesRender}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};