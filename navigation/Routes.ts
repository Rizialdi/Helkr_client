import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryInterface } from '../screens/Accueil/components/Interfaces';
import { Utilisateur, Demande } from '../graphql/helpkr-types';

type Tab = 'tabOne' | 'tabTwo';
export type BottomStackParamList = {
  Accueil: undefined;
  Gerer: undefined | { tab: Tab };
  SignIn: undefined;
  Postuler: undefined | { tab: Tab };
  Demandes: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  DetailCategory: {
    screen: keyof DetailStackParamsList;
    params: { [key: string]: string | number };
  };
  DetailOffering: {
    screen: keyof DetailOfferingParamsList;
    params: { [key: string]: string | number };
  };
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
  route: RouteProp<ParamList, RouteName>;
  navigation: StackNavigationProp<ParamList, RouteName>;
}

export type DetailStackParamsList = {
  DetailCategory: { category: CategoryInterface };
  DetailItem: { category: CategoryInterface; categoryItem: string };
  JoinOrFindAJobber: { category: CategoryInterface; categoryItem: string };
};

export type DetailOfferingParamsList = {
  MyOfferingsModal: { id: string };
  MakeAnOffer: { id: string; type: string; category: string; date: string };
  OfferingsListModal: { id: string };
  MyCandidateToOffering: { id: string };
  MyAppliedOfferingModal: { id: string; status: string };
  DetailsOnOfferingProposition: {
    userId: string;
    offeringId: string;
    avatar: string | null | undefined;
    professional: boolean;
  };
};

export type DemandesParamsList = {
  Demandes: undefined;
  QueryDetails: {
    item: queryDetailsItem;
  };
};

export type queryDetailsItem = { __typename?: 'demande' | undefined } & {
  sentBy?:
    | ({
        __typename?: 'utilisateur' | undefined;
      } & Pick<Utilisateur, 'nom' | 'prenom' | 'avatar' | 'numero' | 'address'>)
    | null
    | undefined;
} & Pick<Demande, 'message' | 'createdAt' | 'sentById'>;
