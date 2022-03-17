import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomStyle} from '../Theme/CustomStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FormCategorieMesure, Snack} from '../Tools/CustomTools';
import {RootStackParamListMesure} from './MesureMain';
import {Colors, Button} from 'react-native-paper';
import {useStoreCategorie, useStoreMesure} from '../Tools/CustomApiHooks';
import {CustomContext} from '../Tools/CustomContext';
import {useMutation, useQueryClient} from 'react-query';

type Props = StackScreenProps<RootStackParamListMesure, 'AjoutMesure'>;

export const MesureAdd: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const {mesures} = useContext(CustomContext);
  const queryClient = useQueryClient();
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const {isLoading: isAdding, isSuccess, mutate} = useMutation(
    async () => {
      if (name.length !== 0) {
        let articleP = {
          id: Date.now(),
          name: name,
        };
        if (articleP) {
          await useStoreMesure(articleP, mesures);
        }
      } else {
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['general']);
        setVisible(!visible);
      },
    },
  );
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{paddingRight: widthPercentageToDP('2%')}}>
            <Button
              color={Colors.black}
              style={CustomStyle.buttonIcon}
              onPress={mutate}>
              <Icon name="save" size={25} />
            </Button>
          </View>
        ),
        headerTitleStyle: {fontSize: 18},
      });
    });
    return refresh;
  }, [navigation]);
  return (
    <View>
      <View style={CustomStyle.form}>
        <FormCategorieMesure name={name} setName={setName} />
      </View>
      {isAdding ? (
        <ActivityIndicator
          size="large"
          style={{
            bottom: 0,
            position: 'absolute',
            width: widthPercentageToDP('70%'),
            left: 50,
          }}
        />
      ) : (
        <></>
      )}
      {isSuccess ? (
        <Snack
          visible={visible}
          setVisible={setVisible}
          onDismissSnackBar={onDismissSnackBar}
        />
      ) : (
        <></>
      )}
    </View>
  );
};
