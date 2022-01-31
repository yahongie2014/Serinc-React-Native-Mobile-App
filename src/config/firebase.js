import PushNotification from 'react-native-push-notification';
import {AsyncStorage} from 'react-native';

PushNotification.configure({
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
});
var token = PushNotification.onRegister();
