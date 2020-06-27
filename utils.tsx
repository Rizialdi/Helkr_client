import { ChatFragment, UserFragment } from './graphql/helpkr-types';
import { User } from 'react-native-gifted-chat';
const yearMonths: string[] = [
  'jan.',
  'fev.',
  'mar.',
  'avr.',
  'mai',
  'jui.',
  'juil.',
  'aou.',
  'sep.',
  'oct.',
  'nov.',
  'dec.'
];

export const formatDate = (timestamp: string = '15886987435'): string => {
  const difference = Date.now() / 1000 - parseInt(timestamp) / 1000;
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

export const formatDateAvis = (timestamp: string = '15886987435'): string => {
  const date = new Date(parseInt(timestamp));
  return yearMonths[date.getMonth()] + ' ' + date.getFullYear();
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
      avatar: user.avatar || require('./assets/images/default-user-image.png')
    };
  });

  const newMessages = channel.messages.map(message => {
    const { id: _id, text, createdAt, sentById } = message;
    return { _id, text, createdAt, user: users[sentById as string] };
  });

  return newMessages;
};
