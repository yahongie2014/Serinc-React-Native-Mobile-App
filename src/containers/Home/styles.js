import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    height: '100%',
    width: '100%',
  },
  search: {
    width: '100%',
  },
  slider: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
  },
  dot_slider: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  paginationSlider: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  placeholderContainer: {
    width: '80%',
    backgroundColor: '#ffff',
    height: 150,
    borderRadius: 50,
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 20,
  },
  placeholder: {
    width: '90%',
    height: '60%',
    marginTop: 12,
    marginLeft: 15,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  placeholdertitle: {
    height: 7,
    marginBottom: 40,
    marginLeft: 25,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  footer: {
    padding: 20,
  },
});
