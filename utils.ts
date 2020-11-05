import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Offering } from './graphql/helpkr-types';

// media Utils

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { CategoryInterface } from './screens/Accueil/components/Interfaces';
import { queryDetailsItem } from './navigation/Routes';

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
  const days = Math.floor(difference / 86400);
  // Calculate the number of months
  const mois = Math.floor(days / 30);

  const elapsedTime =
    days > 30
      ? ' dep. ' + mois + ' mois '
      : days <= 0
      ? ' auj. '
      : 'dep. ' + days + ' jrs ';

  return elapsedTime;
};

export const getDayAndDate = (
  timestamp = '1595798432136'
): (string | number)[] => {
  const date = new Date(parseInt(timestamp));
  if (!date) return [];
  return [
    daysOfWeek[date.getDay()].slice(0, 3),
    date.getDate(),
    yearMonths[date.getMonth()]
  ];
};

export const plainDayAndDate = (
  timestamp = '1595798432136'
): (string | number)[] => {
  const date = new Date(parseInt(timestamp));
  if (!date) return [];
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
  if (!date) return '';
  return yearMonths[date.getMonth()].slice(0, 3) + ' ' + date.getFullYear();
};

export const makePseudoName = (nom: string, prenom: string): string =>
  prenom.replace(/^./, prenom[0].toUpperCase()) + ' ' + nom.charAt(0) + '.';

export const inputSanitization = (text: string) =>
  text.replace(/^\s+|\s+$/g, '');

export const getFileName = (chaine: string) =>
  String(chaine).split('/')[String(chaine).split('/').length - 1];

export const sortDemandes = (
  array: Array<queryDetailsItem>
): Array<queryDetailsItem> => {
  const sortedDemandes = array.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sortedDemandes;
};

export const capitalize = (str: string | null) => {
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
        `Si vous voulez utiliser cette fonctionnalité, vous devrez permettre l'activation de ${permissionName} dans les réglages de votre téléphone.`,
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

export default getPermissionAsync;

export async function getLocationAsync(onSend: any): Promise<string | void> {
  if (await getPermissionAsync(Permissions.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{ location: location.coords }]);
    }
  }
}

export async function pickImageAsync(onSend: any): Promise<string | void> {
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

export const takePictureAsync = async (onSend: any): Promise<string | void> => {
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
};

export const removeAccent = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const storeCredentials = ({
  id,
  prenom,
  token
}: StoreCredentialsProps): void => {
  (async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.multiSet([
        ['id', id],
        ['token', token],
        ['prenom', prenom]
      ]);
    } catch (error) {
      throw error;
    }
  })();
};

export const getReferenceIdOnCategory = (
  category: CategoryInterface,
  categoryItem: string
): string => {
  const result = Object.entries(category.tag).filter(
    i => i[0] === categoryItem
  );
  return result[0][1].referenceId;
};

interface StoreCredentialsProps {
  id: string;
  token: string;
  prenom: string;
}
