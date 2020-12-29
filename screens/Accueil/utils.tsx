import Constants from 'expo-constants';
import { Updates } from 'expo';
import { Platform, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
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
  | 'Reload'
  | 'Demandes';

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
    case 'Demandes':
      navigation.navigation.navigate('Demandes');
      break;
    case 'Reload':
      Updates.reload();
      navigation.navigation.navigate('Accueil');
      break;
    default:
      navigation.navigation.navigate('Accueil');
  }
};

type EventType = {
  url: string;
  nativeEvent?: MessageEvent | undefined;
};

export const handleOpenURL = async (
  { navigation }: StackNavigationInterface<BottomStackParamList, 'Accueil'>,
  strOrObj: string | EventType
) => {
  let url = '';

  const myuserId = await AsyncStorage.getItem('id');

  if (typeof strOrObj === 'string') {
    url = strOrObj;
  } else if (typeof strOrObj === 'object') {
    url = strOrObj.url;
  }

  let { path, queryParams } = Linking.parse(url);

  if (path?.includes('profile') && queryParams) {
    if (!queryParams || !queryParams.id) return;

    if (myuserId && myuserId === queryParams.id) {
      navigation.navigate('Profile');
    } else {
      const { id } = queryParams;
      navigation.navigate('Demandes', {
        screen: 'LinkedIdProfile',
        params: { id: id }
      });
    }
  }
};
