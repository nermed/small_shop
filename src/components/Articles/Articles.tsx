import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Pressable,
} from 'react-native';
import {
  Button,
  Colors,
  DefaultTheme,
  FAB,
  IconButton,
  Portal,
  ProgressBar,
} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StackScreenProps} from '@react-navigation/stack';
//import files
import {ArticleProps} from './ArticleProps';
import {Article} from './Article';
import {RootStackParamListArticle} from './ArticleMain';
import {CustomStyle} from '../Theme/CustomStyle';
import {ModalChoice} from '../Tools/Modal';
import { CustomContext } from '../Tools/CustomContext';
import { useFilterName } from '../Tools/CustomHooks';
import { Search } from '../Tools/CustomTools';

type Props = StackScreenProps<RootStackParamListArticle, 'Listes'>;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue900,
    accent: Colors.blue900,
  },
};
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const Articles: React.FC<Props> = ({navigation}) => {
  let {articles, categories} = useContext(CustomContext);
  const [select, setSelect] = useState<ArticleProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = React.useState({open: false});
  const [input, setInput] = useState<string>('');
  const {filterFunction, newArticles} = useFilterName();
  const [option, setOption] = useState<string>('');
  let articlesParCategorie: ArticleProps[] = [];
  let articleDisplay = newArticles;
  const {open} = state;
  const openModal = (el: ArticleProps): any => {
    const id = articles?.find(art => art.id === el.id);
    if (id) {
      setSelect(id);
    } else {
      setSelect(el);
    }
    openClose();
  };
  // visibility or not for modal
  const openClose = () => {
    setModalVisible(!modalVisible);
  };
  const filterCategory = (text: string) => {
    option == text ? setOption('') : setOption(text);
    setInput('');
  }
  const articlesRender: ListRenderItem<ArticleProps> = ({item}) => {
    return (
      <Pressable
        onLongPress={() => {
          navigation.navigate('Modification', {article: item});
        }}
        onPress={() => openModal(item)}>
        <Article article={item} />
      </Pressable>
    );
  };
  useEffect(() => {
    if(input.length > 0) {
      setOption('')
    }
    filterFunction(input, articles, option);
  }, [input, option]);
  return (
    <View style={CustomStyle.customScreen}>
      <ModalChoice
        openClose={openClose}
        modalVisible={modalVisible}
        select={select}
      />
      <Search setInput={setInput} search={input} text="l'article" />
      <View style={styles.rangeButton}>
        <FlatList 
        data={categories}
        scrollToOverflowEnabled
        horizontal
        renderItem={ ({item}) =>
          <Button
            style={option.length > 0 ? (option == item.name ? styles.disabledStyle : styles.buttonFilter) : styles.buttonFilter}
            color={Colors.black}
            onPress={() => filterCategory(item.name)}
            labelStyle={{fontFamily: 'Roboto-Light'}}
            >
            {item.name}
          </Button>
        }
        keyExtractor={item => String(item.id)}
        />
      </View>
      <FlatList
        data={articleDisplay}
        scrollEnabled
        ListFooterComponent={() => <></>}
        ListFooterComponentStyle={{marginBottom: heightPercentageToDP('10%')}}
        renderItem={articlesRender}
        keyExtractor={item => String(item.id)}
      />
      <FAB
        color={Colors.white}
        icon={'plus'}
        onPress={() => navigation.navigate('Ajout')}
        style={CustomStyle.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('3%')
  },
  buttonFilter: {
    backgroundColor: '#cccccc',
    borderRadius: 15,
    marginHorizontal: 1
  },
  disabledStyle: {
    // backgroundColor: Colors.blue200,
    marginHorizontal: 1,
    borderRadius: 15,
  },
});
