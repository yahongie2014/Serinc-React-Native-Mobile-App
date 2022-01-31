import {StyleSheet, Dimensions} from 'react-native';
import {Textarea} from 'native-base';
export default StyleSheet.create({
  placeholderContainer: {
    width: '100%',
    backgroundColor: '#ffff',
    height: 150,
    borderRadius: 50,
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 20,
  },
  placeholder: {
    width: '40%',
    height: '40%',
    marginTop: 12,
    marginLeft: 18,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  placeholderList: {
    marginLeft: 68,
    width: '45%',
    marginTop: -50,
  },
  placeholderblog: {
    width: '40%',
    height: 7,
    marginTop: 40,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  placeholdertitle: {
    height: 7,
    marginBottom: 10,
    marginLeft: 40,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  placeholderlisting: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: -15,
    width: '100%',
  },
  notifyContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffff',
    borderRadius: 50,
    marginTop: 20,
    height: 600,
    borderWidth: 1,
    borderColor: '#eeeeee',
    shadowColor: '#eeeeee',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  notifylist: {
    marginTop: 20,
    borderRadius: 50,
    width: '100%',
    backgroundColor: '#ffff',
  },

  list: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },

  flatcover: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 15,
  },
  imageCover: {
    width: '90%',
    height: 250,
    borderRadius: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 15,
    overflow: 'hidden',
    resizeMode: 'cover',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rating: {
    marginRight: -200,
    marginTop: -30,
  },
  txtarea: {
    color: '#eeeeee',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  headtitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginTop: 20,
  },
  headtitlecolor: {
    color: '#3498db',
  },
  viewer: {
    position: 'absolute',
    backgroundColor: '#ffff',
    borderRadius: 10,
    width: '20%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 280,
    marginTop: 66,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  txtview: {
    flex: 1,
  },
  notfound: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textnotfound: {
    alignSelf: 'center',
    fontSize: 24,
    color: '#b2bec3',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 30,
  },
  headeing2: {
    color: 'grey',
    fontSize: 13,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontStyle: 'normal',
  },
  author: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    padding: 20,
  },
  authorImg: {
    width: '10%',
    height: 36,
    borderRadius: 200,
    marginRight: 5,
  },
});
