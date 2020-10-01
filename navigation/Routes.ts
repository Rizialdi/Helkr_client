import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryInterface } from '../screens/Accueil/components/Interfaces';

type Tab = 'tabOne' | 'tabTwo';
export type BottomStackParamList = {
  Accueil: undefined;
  Gerer: undefined | { tab: Tab };
  SignIn: undefined;
  Postuler: undefined | { tab: Tab };
  Discussions: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  DetailCategory: { screen: keyof DetailStackParamsList; params: any };
  DetailOffering: { screen: keyof DetailOfferingParamsList; params: any };
  Reglages: undefined;
  Avis: { id: string };
  Profile: undefined | { id: string };
  OnBoarding: undefined;
  LoadedUserData: { token: string; id: string; nom: string; prenom: string };
  RegisterPhoneNumber: undefined;
  RegisterPhoneNumberVerification: { phoneNumberToVerify: string };
  RegisterUsername: { phoneNumberToVerify: string };
  PrincipalView: { screen: keyof BottomStackParamList };
};

export interface StackNavigationInterface<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type DetailStackParamsList = {
  DetailCategory: { category: CategoryInterface };
  DetailItem: { category: CategoryInterface; categoryItem: string };
};

export type DetailOfferingParamsList = {
  MyOfferingsModal: { id: string };
  MyCandidateToOffering: { id: string };
};
