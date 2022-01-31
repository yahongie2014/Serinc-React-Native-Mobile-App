import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  lottie: {
    width: '80%',
    marginRight: '10%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    color: 'black',
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    margin: 10,
    marginRight: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  description: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 28,
  },
  row: {
    flexDirection: 'row-reverse',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
