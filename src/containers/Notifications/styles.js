import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    height: '100%',
    width: '100%',
  },
  text: {
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: 'transparent',
  },
  lottie: {
    width: '80%',
    marginRight: '10%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Regular',
    marginBottom: 30,
    color: 'black',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 28,
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 10,
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    margin: 10,
    fontSize: 14,
  },
  indicatorWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
