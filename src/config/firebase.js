import PushNotification from 'react-native-push-notification';
import {AsyncStorage} from 'react-native';

PushNotification.configure({
  popInitialNotification: true,
  requestPermissions: true,
  playSound: true,
  onRegister: function (fbtoken) {
    AsyncStorage.setItem('TokenFirebase', fbtoken);
    console.log('Just InCase:', fbtoken);
  },
  onNotification: function (notification) {
    const {data} = notification;
  },
  senderID: '452080621011',
  popInitialNotification: true,
  requestPermissions: true,
  playSound: true,
});
const token = PushNotification.onRegister();

export default {token};
