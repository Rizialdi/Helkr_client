import React, { SFC, useState } from 'react';
import { LocaleConfig, Calendar } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};
LocaleConfig.defaultLocale = 'fr';

export interface LocalDateObject {
  [field: string]: { selected: boolean };
}

interface Props {
  parentCallback: React.Dispatch<React.SetStateAction<LocalDateObject | null>>;
}
const CalendarComponent: SFC<Props> = ({ parentCallback }) => {
  const [localDateObject, setLocalDateObject] = useState<LocalDateObject>({});

  const dateNow = Date.now();

  const filterObjectOnKeys = (
    object: LocalDateObject,
    keys: Array<string>
  ): LocalDateObject => {
    const newKeys = Object.keys(object).filter(item => !keys.includes(item));
    return newKeys.reduce(
      (result, key) => ({ ...result, [key]: object[key] }),
      {}
    );
  };

  const setFunction = (item: LocalDateObject) => {
    setLocalDateObject(item);
    parentCallback(item);
  };

  return (
    <Calendar
      current={dateNow}
      minDate={dateNow + 2 * 24 * 3600 * 1000}
      maxDate={dateNow + 7 * 24 * 3600 * 1000}
      showWeekNumbers={true}
      onDayPress={day => {
        Object.keys(localDateObject).includes(day.dateString)
          ? setFunction(
              filterObjectOnKeys(localDateObject, [day.dateString.toString()])
            )
          : Object.keys(localDateObject).length >= 3
          ? null
          : setFunction({
              ...localDateObject,
              ...{ [day.dateString]: { selected: true } }
            });
      }}
      markedDates={localDateObject}
      firstDay={1}
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      monthFormat={'MM yyyy'}
    />
  );
};

export default CalendarComponent;
