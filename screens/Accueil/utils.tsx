import Constants from 'expo-constants';
import { Platform, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Restart } from 'fiction-expo-restart';
import { getPermissionAsync } from '../../utils';
import {
  StackNavigationInterface,
  BottomStackParamList
} from '../../navigation/Routes';

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
  try {
    const cst = await AsyncStorage.getItem('firstOpening');
    if (cst) return false;
    await AsyncStorage.setItem('firstOpening', 'someValue');
    return true;
  } catch (error) {
    return false;
  }
};

type screenToRedirect =
  | 'Postulées'
  | 'Candidats'
  | 'Mes Offres'
  | 'Offres'
  | 'Discussions'
  | 'Reload';

export interface Payload {
  screenToRedirect: screenToRedirect;
  offeringId?: string;
}

export const navigationOnNotification = (
  navigation: StackNavigationInterface<BottomStackParamList, 'Accueil'>,
  payload: Payload
) => {
  const tab =
    payload.screenToRedirect === 'Postulées' ||
    payload.screenToRedirect === 'Candidats'
      ? 'tabTwo'
      : 'tabOne';
  switch (payload.screenToRedirect) {
    case 'Mes Offres':
    case 'Candidats':
      navigation.navigation.navigate('Gerer', { tab });
      break;
    case 'Postulées':
    case 'Offres':
      navigation.navigation.navigate('Postuler', { tab });
      break;
    case 'Discussions':
      navigation.navigation.navigate('Discussions');
      break;
    case 'Reload':
      Restart();
      navigation.navigation.navigate('Accueil');
      break;
    default:
      navigation.navigation.navigate('Accueil');
  }
};

//
