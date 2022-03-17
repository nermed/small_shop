import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import {ArticleProps} from './ArticleProps';
import {CustomStyle} from '../Theme/CustomStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  article: ArticleProps;
};

export const Article: React.FC<Props> = ({article}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <Text style={styles.headerText}>{article.name}</Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            <Icon name="arrow-right" size={20} />
            {article.category}
          </Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            <Icon name="arrow-right" size={20} />
            {article.mesureType}
          </Text>
        </View>
        <View>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            Q: {article.quantity}
          </Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            P.U: {article.price}
          </Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            T: {article.price * article.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: hp('12%'),
    width: '100%',
    backgroundColor: '#cccccc',
    borderRadius: 10,
    borderColor: '#e2d7d0',
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: hp('0.06%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('0.5%'),
    marginBottom: hp('2%')
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
  },
  simpleText: {
    fontSize: 13,
  },
  headerText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#0f1830',
  },
});
