import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { User } from 'react-native-gifted-chat';

import { chatMessagesContextInterface } from './models/ChatMessages';
import {
  ChatFragment,
  Utilisateur,
  Message,
  Offering
} from './graphql/helpkr-types';

export const yearMonths: string[] = [
  'janvier',
  'fevrier',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'aout',
  'septembre',
  'octobre',
  'novembre',
  'decembre'
];

const daysOfWeek: string[] = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche'
];

export const formatDate = (
  timestamp: string | number = '15886987435'
): string => {
  const time = new Date(timestamp);
  const difference = Date.now() / 1000 - time.valueOf() / 1000;
  // Calculate the number of days
  var days = Math.floor(difference / 86400);
  // Calculate the number of months
  var mois = Math.floor(days / 30);
  // After deducting the days calculate the number of hours
  var hours = Math.floor((difference - days * 86400) / 3600);
  // After days and hours , how many minutes are passed
  var minutes = Math.floor((difference - days * 86400 - hours * 3600) / 60);
  // Finally how many seconds left after removing days, hours and minutes.
  var secs = Math.floor(
    difference - days * 86400 - hours * 3600 - minutes * 60
  );

  const elapsedTime =
    days > 30
      ? ' dep. ' + mois + ' mois '
      : days <= 0
      ? ' auj. '
      : 'dep. ' + days + ' jrs ';

  return elapsedTime;
};

export const getDayAndDate = (
  timestamp: string = '1595798432136'
): (string | number)[] => {
  const date = new Date(parseInt(timestamp));
  return [
    daysOfWeek[date.getDay()].slice(0, 3),
    date.getDate(),
    yearMonths[date.getMonth()]
  ];
};

export const plainDayAndDate = (
  timestamp: string = '1595798432136'
): (string | number)[] => {
  const date = new Date(parseInt(timestamp));
  return [
    daysOfWeek[date.getDay()],
    date.getDate(),
    yearMonths[date.getMonth()],
    date.getFullYear()
  ];
};

export const formatDateAvis = (
  timestamp: string | number = '15886987435'
): string => {
  const date = new Date(timestamp);
  return yearMonths[date.getMonth()].slice(0, 3) + ' ' + date.getFullYear();
};

export const makePseudoName = (nom: string, prenom: string): string =>
  prenom.replace(/^./, prenom[0].toUpperCase()) + ' ' + nom.charAt(0) + '.';

export const inputSanitization = (text: string) =>
  text.replace(/^\s+|\s+$/g, '');

export const getFileName = (chaine: string) =>
  String(chaine).split('/')[String(chaine).split('/').length - 1];

interface IDictionary<TValue> {
  [id: string]: TValue;
}

export const formattingTextMessages = (channel: ChatFragment) => {
  let users: IDictionary<User> = {};

  channel.users.map(user => {
    users[user.id] = {
      _id: user.id,
      name: makePseudoName(user.nom, user.prenom),
      avatar: user.avatar || require('./assets/images/defaultUserImage.png')
    };
  });

  const newMessages = channel.messages.map(message => {
    const { id: _id, text, createdAt, sentById } = message;
    return { _id, text, createdAt, user: users[sentById as string] };
  });

  return newMessages;
};

export const storeLastMessageReadIds = async (
  array: chatMessagesContextInterface[]
) => {
  (async () => {
    try {
      await AsyncStorage.setItem('lastMessageReadIds', JSON.stringify(array));
    } catch (error) {
      throw new Error('lastMessageReadIds storage failed');
    }
  })();
};

type chatAndMessagesArray = Array<{
  channelId: string;
  userFiltered: {
    __typename?: 'utilisateur' | undefined;
  } & {
    __typename?: 'utilisateur' | undefined;
  } & Pick<Utilisateur, 'id' | 'prenom' | 'nom' | 'avatar'>;
  lastMessage: {
    __typename?: 'message' | undefined;
  } & {
    __typename?: 'message' | undefined;
  } & Pick<Message, 'text' | 'id' | 'createdAt' | 'sentById'>;
  unReadMessageCount: number | null;
}>;

export const sortChatMessages = (
  array: chatAndMessagesArray
): chatAndMessagesArray => {
  const sortedChatMessages = array.sort(
    (a, b) =>
      new Date(b.lastMessage.createdAt).getTime() -
      new Date(a.lastMessage.createdAt).getTime()
  );

  return sortedChatMessages;
};

export const capitalize = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPermissionAsync = async (
  permission: Permissions.PermissionType
): Promise<boolean> => {
  const { status } = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ');

    Permissions.NOTIFICATIONS != permission &&
      Alert.alert(
        'Action impossible 😞',
        `Si vous voulez utiliser cette fonctionnailté, vous devrez permettre l'activation de ${permissionName} dans les réglages de votre téléphone.`,
        [
          {
            text: 'Allons Y',
            onPress: () => Linking.openURL('app-settings:')
          },
          { text: 'Annuler', onPress: () => {}, style: 'cancel' }
        ],
        { cancelable: true }
      );

    return false;
  }
  return true;
};

const sordOnField = (array: Offering[], field: string) => {
  return array.sort(
    (a: any, b: any) =>
      new Date(parseInt(b[field] || 0)).getTime() -
      new Date(parseInt(a[field] || 0)).getTime()
  );
};

export const sortPostuleeOnInterest = (array: Offering[] = []) => {
  const havingEventDay: Offering[] = [];
  const notHavingEventDay: Offering[] = [];
  array.map(item => {
    if (item.eventday) {
      havingEventDay.push(item);
      return;
    }
    notHavingEventDay.push(item);
  });
  const reorderByValue = notHavingEventDay.map(item => {
    switch (item.status) {
      case 'en attente':
        return { ...item, orderingDate: item.updatedAt };
      case 'acceptée':
        return { ...item, orderingDate: item.updatedAt };
      default:
        return { ...item, orderingDate: item.createdAt };
    }
  });

  return [
    ...sordOnField(havingEventDay, 'eventday'),
    ...sordOnField(reorderByValue, 'orderingDate')
  ];
};

// media Utils

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default getPermissionAsync;

export async function getLocationAsync(onSend: any) {
  if (await getPermissionAsync(Permissions.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{ location: location.coords }]);
    }
  }
}

export async function pickImageAsync(onSend: any) {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      onSend([{ image: result.uri }]);
      return result.uri;
    }
  }
}

export async function takePictureAsync(onSend: any) {
  if (await getPermissionAsync(Permissions.CAMERA)) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      onSend([{ image: result.uri }]);
      return result.uri;
    }
  }
}

export const removeAccent = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
