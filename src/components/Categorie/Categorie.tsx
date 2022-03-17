import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import {CategorieProps} from './CategorieProps';
import {CustomStyle} from '../Theme/CustomStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

type Props = {
  categorie: CategorieProps;
};

export const Categorie: React.FC<Props> = ({categorie}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <Text style={styles.headerText}>{categorie.name}</Text>
        </View>
        <View>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            {moment(categorie.id).format('YYYY-MM-DD hh:mm')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: hp('8%'),
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
    marginBottom: hp('2%'),
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
