import Constants from 'expo-constants';
import { Platform, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { getPermissionAsync } from '../../utils';
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
export const sendPushNotification = async (expoPushToken: string) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' }
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
};

export const registerForPushNotificationsAsync = async (): Promise<string> => {
  let token = '';
  if (Constants.isDevice) {
    if (!(await getPermissionAsync(Permissions.NOTIFICATIONS))) return '';
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }
  return token;
};

export const firstAppOpening = async (): Promise<boolean> => {
  // try {
  //   const cst = await AsyncStorage.getItem('firstOpening');
  //   if (cst) return false;
  //   await AsyncStorage.setItem('firstOpening', 'someValue');
  //   return true;
  // } catch (error) {
  //   return false;
  // }
  return true;
};
