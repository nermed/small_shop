import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import {AchatDetailProps} from './AchatDetailProps';
import {CustomStyle} from '../Theme/CustomStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useGetName } from '../Tools/CustomHooks';
import { CustomContext } from '../Tools/CustomContext';

type Props = {
  achat: AchatDetailProps;
};

export const Achat: React.FC<Props> = ({achat}) => {
  let {articles} = useContext(CustomContext);
  let { article: name_article } = useGetName(achat.id_article, articles);
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <Text style={styles.headerText}>{name_article}</Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            <Icon name="arrow-right" size={20} />
            {moment(achat.id).format("HH:mm:ss")}
          </Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            <Icon name="arrow-right" size={20} />
            {moment(achat.id).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            Q: {achat.quantity}
          </Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            P.U: {achat.priceAchat}
          </Text>
          <Text style={[CustomStyle.simpleText, styles.simpleText]}>
            T: {achat.priceAchat * achat.quantity}
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
