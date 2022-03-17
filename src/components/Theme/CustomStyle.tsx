import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const CustomStyle = StyleSheet.create({
  simpleText: {
    color: Colors.black,
    fontFamily: 'Roboto-Light',
  },
  headerText: {
    color: Colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
  },
  headerTextSimple: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.black
  },
  form: {
    padding: 30,
    display: 'flex',
    // justifyContent: 'center',
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('85%'),
  },
  button: {
    backgroundColor: Colors.blue900,
  },
  snackBar: {
    bottom: 0,
    display: 'flex',
    fontFamily: 'Roboto-Light',
    // marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    top: heightPercentageToDP('0%'),
    bottom: heightPercentageToDP('25%'),
    left: heightPercentageToDP('43%'),
    right: heightPercentageToDP('50%'),
    marginBottom: heightPercentageToDP('4%'),
    backgroundColor: Colors.blue900,
    marginRight: heightPercentageToDP('44%')
  },
  customScreen: {
    paddingTop: 10,
    height: heightPercentageToDP('88%'),
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  buttonIcon: {
    width: widthPercentageToDP('2%'),
  },
  btnSaveHeader: {
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#f7f7f7',
    borderRadius: 15,
    borderColor: '#e2d7d0',
    width: widthPercentageToDP('0.5%'),
  },
  viewSearch: {
    display: 'flex',
    elevation: 2,
    flexDirection: 'row',
    flex: 0,
    marginBottom: heightPercentageToDP('2%'),
    width: widthPercentageToDP('80%'),
  },
  inputSearch: {
    borderBottomWidth: heightPercentageToDP('0.1%'),
    borderBottomColor: '#e2d7d0',
    width: widthPercentageToDP('80%'),
    color: Colors.black,
    marginHorizontal: widthPercentageToDP('3%'),
    fontFamily: 'Roboto-Medium',
  },
  input: {
    marginBottom: 10,
    borderBottomColor: Colors.teal100,
    color: Colors.black,
    borderBottomWidth: heightPercentageToDP('0.1%'),
    fontFamily: 'Roboto-Light',
  }

});
