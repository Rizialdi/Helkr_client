//@ts-ignore
import Image from 'react-native-remote-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Block, Text } from '../sharedComponents';
import { mocks, theme } from '../../constants';
import { useStoreState } from '../../models';
import { MainStackParamList } from '../../navigation/Routes';
import { StackNavigationInterface } from '../../navigation/Routes';
import { UserWelcome } from './components';
import { CategoriesInterface } from './components/Interfaces';
import { Categories } from './components';

export default function Accueil(
  navigation: StackNavigationInterface<MainStackParamList, 'PrincipalView'>
) {
  const [categories, setCategories] = useState<CategoriesInterface | null>();
  const [inputText, setInputText] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const { user } = useStoreState(state => state.User);

  const handleInput = () => setInputText('');

  useMemo(() => {
    setCategories(mocks.accueil);
    user && user.prenom && setUsername(user.prenom);
  }, []);

  return (
    <Block style={{ backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}>
        {username && <UserWelcome {...{ username }} />}
        <View style={styles.container}>
          <Block style={styles.tabBar}>
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <TextInput
                style={{ flex: 1, marginLeft: 10, ...styles.input }}
                defaultValue={inputText}
                onChangeText={text => setInputText(text)}
              />
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => handleInput()}>
                {inputText ? (
                  <Icon name="close" size={16} color="black" />
                ) : (
                  <Icon name="search1" size={16} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </Block>
          {/* When many cities */}
          {/* <TouchableOpacity
            style={styles.loopTouchable}
            onPress={() => handleInput()}>
            <Icon name="ellipsis1" size={16} color="black" />
          </TouchableOpacity> */}
        </View>
        {categories && (
          <Categories {...{ categories, inputText, navigation }} />
        )}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    marginHorizontal: 23,
    marginVertical: 10,
    height: 40
  },
  tabBar: {
    flex: 0.9,
    alignItems: 'center',
    backgroundColor: 'rgba(238, 240, 246, 0.5)',
    borderRadius: 7,
    marginHorizontal: 5
  },
  input: {
    backgroundColor: 'rgba(238, 240, 246, 0)'
  },
  touchable: {
    flex: 0.1,
    padding: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginRight: 5
  },
  loopTouchable: {
    flex: 0.1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238, 240, 246, 0.5)',
    borderRadius: 7,
    marginLeft: 5
  }
});

// import Icon from 'react-native-vector-icons/AntDesign';
// import React, { useMemo, useState, useRef, useEffect } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import * as Notifications from 'expo-notifications';

// import { Block, Text, Button } from '../sharedComponents';
// import { mocks, theme } from '../../constants';
// import { useStoreState } from '../../models';
// import { MainStackParamList } from '../../navigation/Routes';
// import { StackNavigationInterface } from '../../navigation/Routes';
// import { UserWelcome } from './components';
// import { CategoriesInterface } from './components/Interfaces';
// import { Categories } from './components';
// import {
//   sendPushNotification,
//   registerForPushNotificationsAsync
// } from './utils';

// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowAlert: true,
// //     shouldPlaySound: false,
// //     shouldSetBadge: false
// //   })
// // });

// const Accueil = (
//   navigation: StackNavigationInterface<MainStackParamList, 'PrincipalView'>
// ) => {
//   const [categories, setCategories] = useState<CategoriesInterface | null>();
//   const [inputText, setInputText] = useState<string>('');
//   const [username, setUsername] = useState<string>('');

//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   const { user } = useStoreState(state => state.User);

//   const handleInput = () => setInputText('');

//   useMemo(() => {
//     setCategories(mocks.accueil);
//     user && user.prenom && setUsername(user.prenom);
//   }, []);

//   // useEffect(() => {
//   //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//   //   // This listener is fired whenever a notification is received while the app is foregrounded
//   //   notificationListener.current = Notifications.addNotificationReceivedListener(
//   //     notification => {
//   //       setNotification(notification);
//   //     }
//   //   );

//   //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//   //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
//   //     response => {
//   //       console.log(response);
//   //     }
//   //   );

//   //   return () => {
//   //     Notifications.removeNotificationSubscription(notificationListener);
//   //     Notifications.removeNotificationSubscription(responseListener);
//   //   };
//   // }, []);

//   return (
//     <Block style={{ backgroundColor: '#FFFFFF' }}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{ paddingVertical: theme.sizes.base * 2 }}>
//         {username && <UserWelcome {...{ username }} />}
//         <View style={styles.container}>
//           <Block style={styles.tabBar}>
//             <View
//               style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
//               <TextInput
//                 style={{ flex: 1, marginLeft: 10, ...styles.input }}
//                 defaultValue={inputText}
//                 onChangeText={text => setInputText(text)}
//               />
//               <TouchableOpacity
//                 style={styles.touchable}
//                 onPress={() => handleInput()}>
//                 {inputText ? (
//                   <Icon name="close" size={16} color="black" />
//                 ) : (
//                   <Icon name="search1" size={16} color="black" />
//                 )}
//               </TouchableOpacity>
//             </View>
//           </Block>
//           {/* <Button
//             onPress={async () => {
//               await sendPushNotification(expoPushToken);
//             }}>
//             <Text>Please</Text>
//           </Button> */}
//           {/* <Text>{JSON.stringify(notification)}</Text> */}
//           {/* When many cities */}
//           {/* <TouchableOpacity
//             style={styles.loopTouchable}
//             onPress={() => handleInput()}>
//             <Icon name="ellipsis1" size={16} color="black" />
//           </TouchableOpacity> */}
//         </View>
//         {categories && (
//           <Categories {...{ categories, inputText, navigation }} />
//         )}
//       </ScrollView>
//     </Block>
//   );
// };

// export default Accueil;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flex: 1,
//     marginBottom: 0,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'space-between',
//     marginHorizontal: 23,
//     marginVertical: 10,
//     height: 40
//   },
//   tabBar: {
//     flex: 0.9,
//     alignItems: 'center',
//     backgroundColor: 'rgba(238, 240, 246, 0.5)',
//     borderRadius: 7,
//     marginHorizontal: 5
//   },
//   input: {
//     backgroundColor: 'rgba(238, 240, 246, 0)'
//   },
//   touchable: {
//     flex: 0.1,
//     padding: 7,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'center',
//     alignSelf: 'center',
//     marginRight: 5
//   },
//   loopTouchable: {
//     flex: 0.1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(238, 240, 246, 0.5)',
//     borderRadius: 7,
//     marginLeft: 5
//   }
// });
