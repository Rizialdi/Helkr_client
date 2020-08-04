import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryInterface } from '../screens/Accueil/components/Interfaces';

type Tab = 'tabOne' | 'tabTwo';
export type BottomStackParamList = {
  Accueil: undefined;
  Gerer: undefined | { tab: Tab };
  Postuler: undefined | { tab: Tab };
  Discussions: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  DetailCategory: { screen: keyof DetailStackParamsList; params: any };
  Reglages: undefined;
  Avis: { id: string };
  Profile: undefined | { id: string };
  Enregistrement: undefined;
  Identification: undefined;
  Verification: undefined;
  Screen: undefined;
  PrincipalView: BottomStackParamList;
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
