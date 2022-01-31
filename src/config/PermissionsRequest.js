import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

async function checkMultiplePermissions() {
  try {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    ]).then((statuses) => {
      console.log(
        'Location',
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
      );
      console.log(
        'Accurate Location',
        statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION],
      );
      console.log(
        'PhoneStatus',
        statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE],
      );
    });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}
