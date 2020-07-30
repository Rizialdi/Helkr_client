import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BottomStackParamList = {
  Accueil: undefined;
  Gerer: undefined;
  Postuler: undefined;
  Discussions: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  DetailCategory: { category: { name: string } };
  Discussion: undefined;
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