import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    marginTop: -100,
  },
  placeholderContainer: {
    width: '90%',
    backgroundColor: '#ffff',
    height: 200,
    borderRadius: 50,
  },
  placeholder: {
    height: 7,
    marginTop: 12,
    marginLeft: 15,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
});
