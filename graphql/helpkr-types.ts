/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
  JSON: any;
};

export type AddJobberTagResponse = {
  __typename?: 'AddJobberTagResponse';
  added: Scalars['Boolean'];
  max: Scalars['Boolean'];
};

export type Authorizedcategories = {
  __typename?: 'authorizedcategories';
  id: Scalars['String'];
  listofauthorizedcategories?: Maybe<Scalars['Json']>;
  userId?: Maybe<Scalars['String']>;
  utilisateur?: Maybe<Utilisateur>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user?: Maybe<Utilisateur>;
};

export type Avis = {
  __typename?: 'avis';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  offering: Offering;
  score: Scalars['Int'];
  scored: Utilisateur;
  scorer: Utilisateur;
};

export type AvisWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type CandidateToOfferingSuccess = {
  __typename?: 'CandidateToOfferingSuccess';
  success: Scalars['Boolean'];
};


export type Demande = {
  __typename?: 'demande';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  message: Scalars['String'];
  receivedById?: Maybe<Scalars['String']>;
  sentBy?: Maybe<Utilisateur>;
  sentById?: Maybe<Scalars['String']>;
};



export type Moyenne = {
  __typename?: 'moyenne';
  id: Scalars['String'];
  moyenne: Scalars['Float'];
  userId: Scalars['String'];
  utilisateur: Utilisateur;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthorizedCategories: Scalars['Boolean'];
  addOffering: Scalars['JSON'];
  addressUpdate: Scalars['Boolean'];
  addVerificationpieces: Scalars['Boolean'];
  avatarUpload: Scalars['Boolean'];
  candidateToOffering: CandidateToOfferingSuccess;
  chooseCandidate: Scalars['Boolean'];
  chooseEventDay: Scalars['Boolean'];
  completeOffering: Scalars['Boolean'];
  createAvis: Scalars['Boolean'];
  createDemande: Scalars['Boolean'];
  deleteDemande: Scalars['Boolean'];
  deleteOffering: Scalars['Boolean'];
  descriptionUpdate: Scalars['Boolean'];
  notificationsTokenUpdate: Scalars['Boolean'];
  registerUser: AuthPayload;
  removeAuthorizedCategories: Scalars['Boolean'];
  statusChangeToDenyAuthorization: Scalars['Boolean'];
  tagsAddJobber: AddJobberTagResponse;
  tagsUpdate: Scalars['Boolean'];
  updateOffering: Scalars['Boolean'];
};


export type MutationAddAuthorizedCategoriesArgs = {
  authorizedcategory: Scalars['String'];
  id: Scalars['String'];
};


export type MutationAddOfferingArgs = {
  category: Scalars['String'];
  description: Scalars['String'];
  details: Scalars['String'];
  referenceId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationAddressUpdateArgs = {
  text: Scalars['String'];
};


export type MutationAddVerificationpiecesArgs = {
  id?: Maybe<Scalars['String']>;
  listofpieces: Scalars['String'];
  referenceId: Scalars['String'];
};


export type MutationAvatarUploadArgs = {
  file?: Maybe<UploadImageType>;
};


export type MutationCandidateToOfferingArgs = {
  id: Scalars['String'];
  message: Scalars['String'];
  priceRange: Scalars['String'];
};


export type MutationChooseCandidateArgs = {
  candidateId: Scalars['String'];
  id: Scalars['String'];
  preferreddays: Array<Scalars['String']>;
};


export type MutationChooseEventDayArgs = {
  id: Scalars['String'];
  timestamp: Scalars['String'];
};


export type MutationCompleteOfferingArgs = {
  completedById: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateAvisArgs = {
  comment: Scalars['String'];
  offeringId: Scalars['String'];
  score: Scalars['Int'];
  scoredId: Scalars['String'];
};


export type MutationCreateDemandeArgs = {
  message: Scalars['String'];
  recipient: Scalars['String'];
};


export type MutationDeleteDemandeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOfferingArgs = {
  id: Scalars['String'];
};


export type MutationDescriptionUpdateArgs = {
  text: Scalars['String'];
};


export type MutationNotificationsTokenUpdateArgs = {
  token: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  address: Scalars['String'];
  nom: Scalars['String'];
  numero: Scalars['String'];
  prenom: Scalars['String'];
};


export type MutationRemoveAuthorizedCategoriesArgs = {
  id: Scalars['String'];
  referenceId: Scalars['String'];
};


export type MutationStatusChangeToDenyAuthorizationArgs = {
  id: Scalars['String'];
  referenceId: Scalars['String'];
};


export type MutationTagsAddJobberArgs = {
  tag: Scalars['String'];
};


export type MutationTagsUpdateArgs = {
  tags: Array<Scalars['String']>;
};


export type MutationUpdateOfferingArgs = {
  description: Scalars['String'];
  id: Scalars['String'];
};

export type Notificationstoken = {
  __typename?: 'notificationstoken';
  id: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  userid?: Maybe<Scalars['String']>;
  utilisateur?: Maybe<Utilisateur>;
};

export type Offering = {
  __typename?: 'offering';
  author: Utilisateur;
  avis: Array<Avis>;
  candidates: Array<Utilisateur>;
  category: Scalars['String'];
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  details: Scalars['JSON'];
  eventday?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  preferreddays: Array<Scalars['String']>;
  referenceId?: Maybe<Scalars['String']>;
  selectedCandidate?: Maybe<Utilisateur>;
  status?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type OfferingAvisArgs = {
  after?: Maybe<AvisWhereUniqueInput>;
  before?: Maybe<AvisWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OfferingCandidatesArgs = {
  after?: Maybe<UtilisateurWhereUniqueInput>;
  before?: Maybe<UtilisateurWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type OfferingAugmented = {
  __typename?: 'OfferingAugmented';
  endCursor: Scalars['String'];
  hasNext: Scalars['Boolean'];
  offerings?: Maybe<Array<Offering>>;
};

export type OfferingWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type PayLoad = {
  __typename?: 'PayLoad';
  endCursor: Scalars['String'];
  hasNext: Scalars['Boolean'];
  users?: Maybe<Array<Utilisateur>>;
};

export type PropositionToOffering = {
  __typename?: 'propositionToOffering';
  candidateUsername: Scalars['String'];
  descriptionPrestataire?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  priceRange: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allOfferings: Array<Offering>;
  allUsersToken: Array<Notificationstoken>;
  AUTH_STEP_ONE: Step_One_Response;
  AUTH_STEP_TWO: Step_Two_Response;
  demandes: Array<Demande>;
  demandesenvoyees: Array<Demande>;
  demandesrecues: Array<Demande>;
  getAuthorizedCategories: Authorizedcategories;
  getAvisUser: Array<Avis>;
  getSendVerificationPiecesReferenceIdsAndStatus: Scalars['String'];
  getUserInfo: AuthPayload;
  getUserStats: Stats;
  getVerificationPieces: Verificationpieces;
  incompleteOfferings: OfferingAugmented;
  isCandidateTo: OfferingAugmented;
  myIncompleteOffering: OfferingAugmented;
  myIncompleteOfferingWithCandidates: OfferingAugmented;
  offeringById: Offering;
  offeringsUser: Array<Offering>;
  propositionToOfferingDetails: PropositionToOffering;
  userById?: Maybe<Utilisateur>;
  users: Array<Utilisateur>;
  usersPagination?: Maybe<PayLoad>;
};


export type QueryAllOfferingsArgs = {
  filters: Array<Scalars['String']>;
};


export type QueryAuth_Step_OneArgs = {
  numero: Scalars['String'];
};


export type QueryAuth_Step_TwoArgs = {
  id: Scalars['String'];
  numero: Scalars['String'];
  token: Scalars['String'];
};


export type QueryGetAuthorizedCategoriesArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetAvisUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetSendVerificationPiecesReferenceIdsAndStatusArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUserInfoArgs = {
  numero: Scalars['String'];
};


export type QueryGetUserStatsArgs = {
  id: Scalars['String'];
};


export type QueryGetVerificationPiecesArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryIncompleteOfferingsArgs = {
  filters: Array<Scalars['String']>;
  lastCursorId?: Maybe<Scalars['String']>;
  take: Scalars['Int'];
};


export type QueryIsCandidateToArgs = {
  lastCursorId?: Maybe<Scalars['String']>;
  take: Scalars['Int'];
};


export type QueryMyIncompleteOfferingArgs = {
  lastCursorId?: Maybe<Scalars['String']>;
  take: Scalars['Int'];
};


export type QueryMyIncompleteOfferingWithCandidatesArgs = {
  lastCursorId?: Maybe<Scalars['String']>;
  take: Scalars['Int'];
};


export type QueryOfferingByIdArgs = {
  id: Scalars['String'];
};


export type QueryOfferingsUserArgs = {
  numero: Scalars['String'];
};


export type QueryPropositionToOfferingDetailsArgs = {
  offeringId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryUsersPaginationArgs = {
  lastCursorId?: Maybe<Scalars['String']>;
  take: Scalars['Int'];
};

export type ReferenceidUserIdIdCompoundUniqueInput = {
  id: Scalars['String'];
  referenceid: Scalars['String'];
  userId: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  average: Scalars['Float'];
  done: Scalars['Int'];
  proposed: Scalars['Int'];
};

export type Step_One_Response = {
  __typename?: 'STEP_ONE_RESPONSE';
  id: Scalars['String'];
  status: Scalars['String'];
};

export type Step_Two_Response = {
  __typename?: 'STEP_TWO_RESPONSE';
  id?: Maybe<Scalars['String']>;
  nom?: Maybe<Scalars['String']>;
  prenom?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newAvis: Avis;
  newDemande: Demande;
  onOfferingAdded: Offering;
  updateAppliedTo: UpdateAppliedToType;
  updatedEventDay: UpdateSelectedEventDay;
};


export type SubscriptionNewAvisArgs = {
  userId: Scalars['String'];
};


export type SubscriptionNewDemandeArgs = {
  recipientId: Scalars['String'];
};


export type SubscriptionOnOfferingAddedArgs = {
  tags: Array<Scalars['String']>;
};


export type SubscriptionUpdateAppliedToArgs = {
  userId: Scalars['String'];
};


export type SubscriptionUpdatedEventDayArgs = {
  userId: Scalars['String'];
};

export type Tags = {
  __typename?: 'tags';
  id: Scalars['String'];
  tags: Scalars['String'];
  userid?: Maybe<Scalars['String']>;
  utilisateur?: Maybe<Utilisateur>;
};

export type UpdateAppliedToType = {
  __typename?: 'updateAppliedToType';
  id: Scalars['String'];
  status: Scalars['String'];
};

export type UpdateSelectedEventDay = {
  __typename?: 'updateSelectedEventDay';
  eventday: Scalars['String'];
  offeringId: Scalars['String'];
};

export type UploadImageType = {
  name: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
};

export type Utilisateur = {
  __typename?: 'utilisateur';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  avisgave: Array<Avis>;
  avisreceived: Array<Avis>;
  completedofferings: Array<Offering>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  moyenne: Scalars['Int'];
  nom: Scalars['String'];
  numero: Scalars['String'];
  offerings: Array<Offering>;
  prenom: Scalars['String'];
  professional: Scalars['Boolean'];
  tags?: Maybe<Array<Scalars['String']>>;
  verificationpieces: Array<Verificationpieces>;
  verified: Scalars['Boolean'];
};


export type UtilisateurAvisgaveArgs = {
  after?: Maybe<AvisWhereUniqueInput>;
  before?: Maybe<AvisWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UtilisateurAvisreceivedArgs = {
  after?: Maybe<AvisWhereUniqueInput>;
  before?: Maybe<AvisWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UtilisateurCompletedofferingsArgs = {
  after?: Maybe<OfferingWhereUniqueInput>;
  before?: Maybe<OfferingWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UtilisateurOfferingsArgs = {
  after?: Maybe<OfferingWhereUniqueInput>;
  before?: Maybe<OfferingWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UtilisateurVerificationpiecesArgs = {
  after?: Maybe<VerificationpiecesWhereUniqueInput>;
  before?: Maybe<VerificationpiecesWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UtilisateurWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  numero?: Maybe<Scalars['String']>;
};

export type Verificationpieces = {
  __typename?: 'verificationpieces';
  id: Scalars['String'];
  listofpieces?: Maybe<Scalars['Json']>;
  referenceid: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  utilisateur: Utilisateur;
};

export type VerificationpiecesWhereUniqueInput = {
  referenceid_userId_id?: Maybe<ReferenceidUserIdIdCompoundUniqueInput>;
  userId?: Maybe<Scalars['String']>;
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
export type AvisFragment = (
  { __typename?: 'avis' }
  & Pick<Avis, 'id' | 'comment' | 'createdAt' | 'score'>
  & { scorer: (
    { __typename?: 'utilisateur' }
    & UserFragment
  ) }
);

export type DemandeFragment = (
  { __typename?: 'demande' }
  & Pick<Demande, 'id' | 'sentById' | 'message' | 'createdAt'>
);

export type OfferingFragment = (
  { __typename?: 'offering' }
  & Pick<Offering, 'id' | 'type' | 'category' | 'createdAt' | 'updatedAt' | 'description' | 'referenceId'>
);

export type ScorerFragment = (
  { __typename?: 'utilisateur' }
  & UserFragment
);

export type UserFragment = (
  { __typename?: 'utilisateur' }
  & Pick<Utilisateur, 'id' | 'nom' | 'prenom' | 'avatar'>
);

export type AddOfferingMutationVariables = Exact<{
  type: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  details: Scalars['String'];
  referenceId: Scalars['String'];
}>;


export type AddOfferingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addOffering'>
);

export type AddVerificationpiecesMutationVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  listofpieces: Scalars['String'];
  referenceId: Scalars['String'];
}>;


export type AddVerificationpiecesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addVerificationpieces'>
);

export type CandidateToOfferingMutationVariables = Exact<{
  id: Scalars['String'];
  message: Scalars['String'];
  priceRange: Scalars['String'];
}>;


export type CandidateToOfferingMutation = (
  { __typename?: 'Mutation' }
  & { candidateToOffering: (
    { __typename?: 'CandidateToOfferingSuccess' }
    & Pick<CandidateToOfferingSuccess, 'success'>
  ) }
);

export type ChooseCandidateMutationVariables = Exact<{
  id: Scalars['String'];
  candidateId: Scalars['String'];
  preferreddays: Array<Scalars['String']>;
}>;


export type ChooseCandidateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'chooseCandidate'>
);

export type ChooseEventDayMutationVariables = Exact<{
  id: Scalars['String'];
  timestamp: Scalars['String'];
}>;


export type ChooseEventDayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'chooseEventDay'>
);

export type CreateDemandeMutationVariables = Exact<{
  message: Scalars['String'];
  recipient: Scalars['String'];
}>;


export type CreateDemandeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createDemande'>
);

export type DeleteDemandeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDemandeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDemande'>
);

export type DeleteOfferingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteOfferingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteOffering'>
);

export type RegisterUserMutationVariables = Exact<{
  nom: Scalars['String'];
  prenom: Scalars['String'];
  numero: Scalars['String'];
  address: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'id' | 'prenom'>
    )> }
  ) }
);

export type TagsAddJobberMutationVariables = Exact<{
  tag: Scalars['String'];
}>;


export type TagsAddJobberMutation = (
  { __typename?: 'Mutation' }
  & { tagsAddJobber: (
    { __typename?: 'AddJobberTagResponse' }
    & Pick<AddJobberTagResponse, 'max' | 'added'>
  ) }
);

export type NotificationsTokenUpdateMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type NotificationsTokenUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'notificationsTokenUpdate'>
);

export type UpdateOfferingMutationVariables = Exact<{
  id: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateOfferingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateOffering'>
);

export type AvatarUploadMutationVariables = Exact<{
  file?: Maybe<UploadImageType>;
}>;


export type AvatarUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'avatarUpload'>
);

export type DescriptionUpdateMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type DescriptionUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'descriptionUpdate'>
);

export type AddressUpdateMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type AddressUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addressUpdate'>
);

export type TagsUpdateMutationVariables = Exact<{
  tags: Array<Scalars['String']>;
}>;


export type TagsUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'tagsUpdate'>
);

export type AuthStepOneQueryVariables = Exact<{
  numero: Scalars['String'];
}>;


export type AuthStepOneQuery = (
  { __typename?: 'Query' }
  & { AUTH_STEP_ONE: (
    { __typename?: 'STEP_ONE_RESPONSE' }
    & Pick<Step_One_Response, 'id' | 'status'>
  ) }
);

export type AuthStepTwoQueryVariables = Exact<{
  id: Scalars['String'];
  token: Scalars['String'];
  numero: Scalars['String'];
}>;


export type AuthStepTwoQuery = (
  { __typename?: 'Query' }
  & { AUTH_STEP_TWO: (
    { __typename?: 'STEP_TWO_RESPONSE' }
    & Pick<Step_Two_Response, 'id' | 'nom' | 'token' | 'prenom' | 'success'>
  ) }
);

export type GetAuthorizedCategoriesQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type GetAuthorizedCategoriesQuery = (
  { __typename?: 'Query' }
  & { getAuthorizedCategories: (
    { __typename?: 'authorizedcategories' }
    & Pick<Authorizedcategories, 'listofauthorizedcategories'>
  ) }
);

export type GetAvisUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetAvisUserQuery = (
  { __typename?: 'Query' }
  & { getAvisUser: Array<(
    { __typename?: 'avis' }
    & Pick<Avis, 'id' | 'score' | 'comment' | 'createdAt'>
    & { scorer: (
      { __typename?: 'utilisateur' }
      & ScorerFragment
    ) }
  )> }
);

export type DemandesrecuesQueryVariables = Exact<{ [key: string]: never; }>;


export type DemandesrecuesQuery = (
  { __typename?: 'Query' }
  & { demandesrecues: Array<(
    { __typename?: 'demande' }
    & { sentBy?: Maybe<(
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'nom' | 'prenom' | 'avatar' | 'numero' | 'address'>
    )> }
    & DemandeFragment
  )> }
);

export type GetSendVerificationPiecesReferenceIdsAndStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSendVerificationPiecesReferenceIdsAndStatusQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getSendVerificationPiecesReferenceIdsAndStatus'>
);

export type GetUserStatsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserStatsQuery = (
  { __typename?: 'Query' }
  & { getUserStats: (
    { __typename?: 'Stats' }
    & Pick<Stats, 'done' | 'proposed' | 'average'>
  ) }
);

export type IncompleteOfferingsQueryVariables = Exact<{
  take: Scalars['Int'];
  lastCursorId?: Maybe<Scalars['String']>;
  filters: Array<Scalars['String']>;
}>;


export type IncompleteOfferingsQuery = (
  { __typename?: 'Query' }
  & { incompleteOfferings: (
    { __typename?: 'OfferingAugmented' }
    & Pick<OfferingAugmented, 'hasNext' | 'endCursor'>
    & { offerings?: Maybe<Array<(
      { __typename?: 'offering' }
      & OfferingFragment
    )>> }
  ) }
);

export type IsCandidateToQueryVariables = Exact<{
  take: Scalars['Int'];
  lastCursorId?: Maybe<Scalars['String']>;
}>;


export type IsCandidateToQuery = (
  { __typename?: 'Query' }
  & { isCandidateTo: (
    { __typename?: 'OfferingAugmented' }
    & Pick<OfferingAugmented, 'hasNext' | 'endCursor'>
    & { offerings?: Maybe<Array<(
      { __typename?: 'offering' }
      & Pick<Offering, 'status' | 'eventday' | 'completed'>
      & OfferingFragment
    )>> }
  ) }
);

export type MyIncompleteOfferingQueryVariables = Exact<{
  take: Scalars['Int'];
  lastCursorId?: Maybe<Scalars['String']>;
}>;


export type MyIncompleteOfferingQuery = (
  { __typename?: 'Query' }
  & { myIncompleteOffering: (
    { __typename?: 'OfferingAugmented' }
    & Pick<OfferingAugmented, 'hasNext' | 'endCursor'>
    & { offerings?: Maybe<Array<(
      { __typename?: 'offering' }
      & OfferingFragment
    )>> }
  ) }
);

export type MyIncompleteOfferingWithCandidatesQueryVariables = Exact<{
  take: Scalars['Int'];
  lastCursorId?: Maybe<Scalars['String']>;
}>;


export type MyIncompleteOfferingWithCandidatesQuery = (
  { __typename?: 'Query' }
  & { myIncompleteOfferingWithCandidates: (
    { __typename?: 'OfferingAugmented' }
    & Pick<OfferingAugmented, 'hasNext' | 'endCursor'>
    & { offerings?: Maybe<Array<(
      { __typename?: 'offering' }
      & Pick<Offering, 'status' | 'eventday'>
      & { selectedCandidate?: Maybe<(
        { __typename?: 'utilisateur' }
        & Pick<Utilisateur, 'id'>
      )> }
      & OfferingFragment
    )>> }
  ) }
);

export type OfferingByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type OfferingByIdQuery = (
  { __typename?: 'Query' }
  & { offeringById: (
    { __typename?: 'offering' }
    & Pick<Offering, 'details' | 'eventday'>
    & { candidates: Array<(
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'id' | 'avatar' | 'professional' | 'moyenne'>
    )>, selectedCandidate?: Maybe<(
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'id' | 'avatar' | 'professional' | 'moyenne'>
    )> }
    & OfferingFragment
  ) }
);

export type OfferingByIdPostuleesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type OfferingByIdPostuleesQuery = (
  { __typename?: 'Query' }
  & { offeringById: (
    { __typename?: 'offering' }
    & Pick<Offering, 'details' | 'preferreddays' | 'eventday'>
    & { author: (
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'numero' | 'address'>
      & UserFragment
    ) }
    & OfferingFragment
  ) }
);

export type PropositionToOfferingDetailsQueryVariables = Exact<{
  userId: Scalars['String'];
  offeringId: Scalars['String'];
}>;


export type PropositionToOfferingDetailsQuery = (
  { __typename?: 'Query' }
  & { propositionToOfferingDetails: (
    { __typename?: 'propositionToOffering' }
    & Pick<PropositionToOffering, 'message' | 'priceRange' | 'candidateUsername' | 'descriptionPrestataire'>
  ) }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'utilisateur' }
    & Pick<Utilisateur, 'nom' | 'tags' | 'prenom' | 'avatar' | 'numero' | 'address' | 'verified' | 'description' | 'professional'>
  )> }
);

export type GetVerificationPiecesQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type GetVerificationPiecesQuery = (
  { __typename?: 'Query' }
  & { getVerificationPieces: (
    { __typename?: 'verificationpieces' }
    & Pick<Verificationpieces, 'listofpieces'>
  ) }
);

export type NewAvisSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type NewAvisSubscription = (
  { __typename?: 'Subscription' }
  & { newAvis: (
    { __typename?: 'avis' }
    & AvisFragment
  ) }
);

export type NewDemandeSubscriptionVariables = Exact<{
  recipientId: Scalars['String'];
}>;


export type NewDemandeSubscription = (
  { __typename?: 'Subscription' }
  & { newDemande: (
    { __typename?: 'demande' }
    & { sentBy?: Maybe<(
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'nom' | 'prenom' | 'avatar' | 'numero' | 'address'>
    )> }
    & DemandeFragment
  ) }
);

export type OnOfferingAddedSubscriptionVariables = Exact<{
  tags: Array<Scalars['String']>;
}>;


export type OnOfferingAddedSubscription = (
  { __typename?: 'Subscription' }
  & { onOfferingAdded: (
    { __typename?: 'offering' }
    & { author: (
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'id'>
    ) }
    & OfferingFragment
  ) }
);

export type UpdatedEventDaySubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UpdatedEventDaySubscription = (
  { __typename?: 'Subscription' }
  & { updatedEventDay: (
    { __typename?: 'updateSelectedEventDay' }
    & Pick<UpdateSelectedEventDay, 'eventday' | 'offeringId'>
  ) }
);

export type UpdateAppliedToSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UpdateAppliedToSubscription = (
  { __typename?: 'Subscription' }
  & { updateAppliedTo: (
    { __typename?: 'updateAppliedToType' }
    & Pick<UpdateAppliedToType, 'id' | 'status'>
  ) }
);

export const UserFragmentDoc = gql`
    fragment user on utilisateur {
  id
  nom
  prenom
  avatar
}
    `;
export const AvisFragmentDoc = gql`
    fragment avis on avis {
  id
  comment
  createdAt
  score
  scorer {
    ...user
  }
}
    ${UserFragmentDoc}`;
export const DemandeFragmentDoc = gql`
    fragment demande on demande {
  id
  sentById
  message
  createdAt
}
    `;
export const OfferingFragmentDoc = gql`
    fragment offering on offering {
  id
  type
  category
  createdAt
  updatedAt
  description
  referenceId
}
    `;
export const ScorerFragmentDoc = gql`
    fragment scorer on utilisateur {
  ...user
}
    ${UserFragmentDoc}`;
export const AddOfferingDocument = gql`
    mutation addOffering($type: String!, $category: String!, $description: String!, $details: String!, $referenceId: String!) {
  addOffering(type: $type, details: $details, category: $category, description: $description, referenceId: $referenceId)
}
    `;
export type AddOfferingMutationFn = ApolloReactCommon.MutationFunction<AddOfferingMutation, AddOfferingMutationVariables>;

/**
 * __useAddOfferingMutation__
 *
 * To run a mutation, you first call `useAddOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOfferingMutation, { data, loading, error }] = useAddOfferingMutation({
 *   variables: {
 *      type: // value for 'type'
 *      category: // value for 'category'
 *      description: // value for 'description'
 *      details: // value for 'details'
 *      referenceId: // value for 'referenceId'
 *   },
 * });
 */
export function useAddOfferingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddOfferingMutation, AddOfferingMutationVariables>) {
        return ApolloReactHooks.useMutation<AddOfferingMutation, AddOfferingMutationVariables>(AddOfferingDocument, baseOptions);
      }
export type AddOfferingMutationHookResult = ReturnType<typeof useAddOfferingMutation>;
export type AddOfferingMutationResult = ApolloReactCommon.MutationResult<AddOfferingMutation>;
export type AddOfferingMutationOptions = ApolloReactCommon.BaseMutationOptions<AddOfferingMutation, AddOfferingMutationVariables>;
export const AddVerificationpiecesDocument = gql`
    mutation addVerificationpieces($id: String, $listofpieces: String!, $referenceId: String!) {
  addVerificationpieces(id: $id, listofpieces: $listofpieces, referenceId: $referenceId)
}
    `;
export type AddVerificationpiecesMutationFn = ApolloReactCommon.MutationFunction<AddVerificationpiecesMutation, AddVerificationpiecesMutationVariables>;

/**
 * __useAddVerificationpiecesMutation__
 *
 * To run a mutation, you first call `useAddVerificationpiecesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVerificationpiecesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVerificationpiecesMutation, { data, loading, error }] = useAddVerificationpiecesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      listofpieces: // value for 'listofpieces'
 *      referenceId: // value for 'referenceId'
 *   },
 * });
 */
export function useAddVerificationpiecesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddVerificationpiecesMutation, AddVerificationpiecesMutationVariables>) {
        return ApolloReactHooks.useMutation<AddVerificationpiecesMutation, AddVerificationpiecesMutationVariables>(AddVerificationpiecesDocument, baseOptions);
      }
export type AddVerificationpiecesMutationHookResult = ReturnType<typeof useAddVerificationpiecesMutation>;
export type AddVerificationpiecesMutationResult = ApolloReactCommon.MutationResult<AddVerificationpiecesMutation>;
export type AddVerificationpiecesMutationOptions = ApolloReactCommon.BaseMutationOptions<AddVerificationpiecesMutation, AddVerificationpiecesMutationVariables>;
export const CandidateToOfferingDocument = gql`
    mutation candidateToOffering($id: String!, $message: String!, $priceRange: String!) {
  candidateToOffering(id: $id, message: $message, priceRange: $priceRange) {
    success
  }
}
    `;
export type CandidateToOfferingMutationFn = ApolloReactCommon.MutationFunction<CandidateToOfferingMutation, CandidateToOfferingMutationVariables>;

/**
 * __useCandidateToOfferingMutation__
 *
 * To run a mutation, you first call `useCandidateToOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCandidateToOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [candidateToOfferingMutation, { data, loading, error }] = useCandidateToOfferingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      message: // value for 'message'
 *      priceRange: // value for 'priceRange'
 *   },
 * });
 */
export function useCandidateToOfferingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CandidateToOfferingMutation, CandidateToOfferingMutationVariables>) {
        return ApolloReactHooks.useMutation<CandidateToOfferingMutation, CandidateToOfferingMutationVariables>(CandidateToOfferingDocument, baseOptions);
      }
export type CandidateToOfferingMutationHookResult = ReturnType<typeof useCandidateToOfferingMutation>;
export type CandidateToOfferingMutationResult = ApolloReactCommon.MutationResult<CandidateToOfferingMutation>;
export type CandidateToOfferingMutationOptions = ApolloReactCommon.BaseMutationOptions<CandidateToOfferingMutation, CandidateToOfferingMutationVariables>;
export const ChooseCandidateDocument = gql`
    mutation chooseCandidate($id: String!, $candidateId: String!, $preferreddays: [String!]!) {
  chooseCandidate(id: $id, candidateId: $candidateId, preferreddays: $preferreddays)
}
    `;
export type ChooseCandidateMutationFn = ApolloReactCommon.MutationFunction<ChooseCandidateMutation, ChooseCandidateMutationVariables>;

/**
 * __useChooseCandidateMutation__
 *
 * To run a mutation, you first call `useChooseCandidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChooseCandidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chooseCandidateMutation, { data, loading, error }] = useChooseCandidateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      candidateId: // value for 'candidateId'
 *      preferreddays: // value for 'preferreddays'
 *   },
 * });
 */
export function useChooseCandidateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChooseCandidateMutation, ChooseCandidateMutationVariables>) {
        return ApolloReactHooks.useMutation<ChooseCandidateMutation, ChooseCandidateMutationVariables>(ChooseCandidateDocument, baseOptions);
      }
export type ChooseCandidateMutationHookResult = ReturnType<typeof useChooseCandidateMutation>;
export type ChooseCandidateMutationResult = ApolloReactCommon.MutationResult<ChooseCandidateMutation>;
export type ChooseCandidateMutationOptions = ApolloReactCommon.BaseMutationOptions<ChooseCandidateMutation, ChooseCandidateMutationVariables>;
export const ChooseEventDayDocument = gql`
    mutation chooseEventDay($id: String!, $timestamp: String!) {
  chooseEventDay(id: $id, timestamp: $timestamp)
}
    `;
export type ChooseEventDayMutationFn = ApolloReactCommon.MutationFunction<ChooseEventDayMutation, ChooseEventDayMutationVariables>;

/**
 * __useChooseEventDayMutation__
 *
 * To run a mutation, you first call `useChooseEventDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChooseEventDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chooseEventDayMutation, { data, loading, error }] = useChooseEventDayMutation({
 *   variables: {
 *      id: // value for 'id'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useChooseEventDayMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChooseEventDayMutation, ChooseEventDayMutationVariables>) {
        return ApolloReactHooks.useMutation<ChooseEventDayMutation, ChooseEventDayMutationVariables>(ChooseEventDayDocument, baseOptions);
      }
export type ChooseEventDayMutationHookResult = ReturnType<typeof useChooseEventDayMutation>;
export type ChooseEventDayMutationResult = ApolloReactCommon.MutationResult<ChooseEventDayMutation>;
export type ChooseEventDayMutationOptions = ApolloReactCommon.BaseMutationOptions<ChooseEventDayMutation, ChooseEventDayMutationVariables>;
export const CreateDemandeDocument = gql`
    mutation createDemande($message: String!, $recipient: String!) {
  createDemande(message: $message, recipient: $recipient)
}
    `;
export type CreateDemandeMutationFn = ApolloReactCommon.MutationFunction<CreateDemandeMutation, CreateDemandeMutationVariables>;

/**
 * __useCreateDemandeMutation__
 *
 * To run a mutation, you first call `useCreateDemandeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDemandeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDemandeMutation, { data, loading, error }] = useCreateDemandeMutation({
 *   variables: {
 *      message: // value for 'message'
 *      recipient: // value for 'recipient'
 *   },
 * });
 */
export function useCreateDemandeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDemandeMutation, CreateDemandeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDemandeMutation, CreateDemandeMutationVariables>(CreateDemandeDocument, baseOptions);
      }
export type CreateDemandeMutationHookResult = ReturnType<typeof useCreateDemandeMutation>;
export type CreateDemandeMutationResult = ApolloReactCommon.MutationResult<CreateDemandeMutation>;
export type CreateDemandeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDemandeMutation, CreateDemandeMutationVariables>;
export const DeleteDemandeDocument = gql`
    mutation deleteDemande($id: String!) {
  deleteDemande(id: $id)
}
    `;
export type DeleteDemandeMutationFn = ApolloReactCommon.MutationFunction<DeleteDemandeMutation, DeleteDemandeMutationVariables>;

/**
 * __useDeleteDemandeMutation__
 *
 * To run a mutation, you first call `useDeleteDemandeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDemandeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDemandeMutation, { data, loading, error }] = useDeleteDemandeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDemandeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDemandeMutation, DeleteDemandeMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteDemandeMutation, DeleteDemandeMutationVariables>(DeleteDemandeDocument, baseOptions);
      }
export type DeleteDemandeMutationHookResult = ReturnType<typeof useDeleteDemandeMutation>;
export type DeleteDemandeMutationResult = ApolloReactCommon.MutationResult<DeleteDemandeMutation>;
export type DeleteDemandeMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDemandeMutation, DeleteDemandeMutationVariables>;
export const DeleteOfferingDocument = gql`
    mutation deleteOffering($id: String!) {
  deleteOffering(id: $id)
}
    `;
export type DeleteOfferingMutationFn = ApolloReactCommon.MutationFunction<DeleteOfferingMutation, DeleteOfferingMutationVariables>;

/**
 * __useDeleteOfferingMutation__
 *
 * To run a mutation, you first call `useDeleteOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOfferingMutation, { data, loading, error }] = useDeleteOfferingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOfferingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOfferingMutation, DeleteOfferingMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteOfferingMutation, DeleteOfferingMutationVariables>(DeleteOfferingDocument, baseOptions);
      }
export type DeleteOfferingMutationHookResult = ReturnType<typeof useDeleteOfferingMutation>;
export type DeleteOfferingMutationResult = ApolloReactCommon.MutationResult<DeleteOfferingMutation>;
export type DeleteOfferingMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOfferingMutation, DeleteOfferingMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($nom: String!, $prenom: String!, $numero: String!, $address: String!) {
  registerUser(nom: $nom, prenom: $prenom, numero: $numero, address: $address) {
    token
    user {
      id
      prenom
    }
  }
}
    `;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      nom: // value for 'nom'
 *      prenom: // value for 'prenom'
 *      numero: // value for 'numero'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const TagsAddJobberDocument = gql`
    mutation tagsAddJobber($tag: String!) {
  tagsAddJobber(tag: $tag) {
    max
    added
  }
}
    `;
export type TagsAddJobberMutationFn = ApolloReactCommon.MutationFunction<TagsAddJobberMutation, TagsAddJobberMutationVariables>;

/**
 * __useTagsAddJobberMutation__
 *
 * To run a mutation, you first call `useTagsAddJobberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagsAddJobberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagsAddJobberMutation, { data, loading, error }] = useTagsAddJobberMutation({
 *   variables: {
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useTagsAddJobberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TagsAddJobberMutation, TagsAddJobberMutationVariables>) {
        return ApolloReactHooks.useMutation<TagsAddJobberMutation, TagsAddJobberMutationVariables>(TagsAddJobberDocument, baseOptions);
      }
export type TagsAddJobberMutationHookResult = ReturnType<typeof useTagsAddJobberMutation>;
export type TagsAddJobberMutationResult = ApolloReactCommon.MutationResult<TagsAddJobberMutation>;
export type TagsAddJobberMutationOptions = ApolloReactCommon.BaseMutationOptions<TagsAddJobberMutation, TagsAddJobberMutationVariables>;
export const NotificationsTokenUpdateDocument = gql`
    mutation notificationsTokenUpdate($token: String!) {
  notificationsTokenUpdate(token: $token)
}
    `;
export type NotificationsTokenUpdateMutationFn = ApolloReactCommon.MutationFunction<NotificationsTokenUpdateMutation, NotificationsTokenUpdateMutationVariables>;

/**
 * __useNotificationsTokenUpdateMutation__
 *
 * To run a mutation, you first call `useNotificationsTokenUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationsTokenUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationsTokenUpdateMutation, { data, loading, error }] = useNotificationsTokenUpdateMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useNotificationsTokenUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NotificationsTokenUpdateMutation, NotificationsTokenUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<NotificationsTokenUpdateMutation, NotificationsTokenUpdateMutationVariables>(NotificationsTokenUpdateDocument, baseOptions);
      }
export type NotificationsTokenUpdateMutationHookResult = ReturnType<typeof useNotificationsTokenUpdateMutation>;
export type NotificationsTokenUpdateMutationResult = ApolloReactCommon.MutationResult<NotificationsTokenUpdateMutation>;
export type NotificationsTokenUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<NotificationsTokenUpdateMutation, NotificationsTokenUpdateMutationVariables>;
export const UpdateOfferingDocument = gql`
    mutation updateOffering($id: String!, $description: String!) {
  updateOffering(id: $id, description: $description)
}
    `;
export type UpdateOfferingMutationFn = ApolloReactCommon.MutationFunction<UpdateOfferingMutation, UpdateOfferingMutationVariables>;

/**
 * __useUpdateOfferingMutation__
 *
 * To run a mutation, you first call `useUpdateOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOfferingMutation, { data, loading, error }] = useUpdateOfferingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateOfferingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOfferingMutation, UpdateOfferingMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOfferingMutation, UpdateOfferingMutationVariables>(UpdateOfferingDocument, baseOptions);
      }
export type UpdateOfferingMutationHookResult = ReturnType<typeof useUpdateOfferingMutation>;
export type UpdateOfferingMutationResult = ApolloReactCommon.MutationResult<UpdateOfferingMutation>;
export type UpdateOfferingMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOfferingMutation, UpdateOfferingMutationVariables>;
export const AvatarUploadDocument = gql`
    mutation avatarUpload($file: uploadImageType) {
  avatarUpload(file: $file)
}
    `;
export type AvatarUploadMutationFn = ApolloReactCommon.MutationFunction<AvatarUploadMutation, AvatarUploadMutationVariables>;

/**
 * __useAvatarUploadMutation__
 *
 * To run a mutation, you first call `useAvatarUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAvatarUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [avatarUploadMutation, { data, loading, error }] = useAvatarUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAvatarUploadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AvatarUploadMutation, AvatarUploadMutationVariables>) {
        return ApolloReactHooks.useMutation<AvatarUploadMutation, AvatarUploadMutationVariables>(AvatarUploadDocument, baseOptions);
      }
export type AvatarUploadMutationHookResult = ReturnType<typeof useAvatarUploadMutation>;
export type AvatarUploadMutationResult = ApolloReactCommon.MutationResult<AvatarUploadMutation>;
export type AvatarUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<AvatarUploadMutation, AvatarUploadMutationVariables>;
export const DescriptionUpdateDocument = gql`
    mutation descriptionUpdate($text: String!) {
  descriptionUpdate(text: $text)
}
    `;
export type DescriptionUpdateMutationFn = ApolloReactCommon.MutationFunction<DescriptionUpdateMutation, DescriptionUpdateMutationVariables>;

/**
 * __useDescriptionUpdateMutation__
 *
 * To run a mutation, you first call `useDescriptionUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDescriptionUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [descriptionUpdateMutation, { data, loading, error }] = useDescriptionUpdateMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useDescriptionUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DescriptionUpdateMutation, DescriptionUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<DescriptionUpdateMutation, DescriptionUpdateMutationVariables>(DescriptionUpdateDocument, baseOptions);
      }
export type DescriptionUpdateMutationHookResult = ReturnType<typeof useDescriptionUpdateMutation>;
export type DescriptionUpdateMutationResult = ApolloReactCommon.MutationResult<DescriptionUpdateMutation>;
export type DescriptionUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<DescriptionUpdateMutation, DescriptionUpdateMutationVariables>;
export const AddressUpdateDocument = gql`
    mutation addressUpdate($text: String!) {
  addressUpdate(text: $text)
}
    `;
export type AddressUpdateMutationFn = ApolloReactCommon.MutationFunction<AddressUpdateMutation, AddressUpdateMutationVariables>;

/**
 * __useAddressUpdateMutation__
 *
 * To run a mutation, you first call `useAddressUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddressUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addressUpdateMutation, { data, loading, error }] = useAddressUpdateMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddressUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddressUpdateMutation, AddressUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<AddressUpdateMutation, AddressUpdateMutationVariables>(AddressUpdateDocument, baseOptions);
      }
export type AddressUpdateMutationHookResult = ReturnType<typeof useAddressUpdateMutation>;
export type AddressUpdateMutationResult = ApolloReactCommon.MutationResult<AddressUpdateMutation>;
export type AddressUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<AddressUpdateMutation, AddressUpdateMutationVariables>;
export const TagsUpdateDocument = gql`
    mutation tagsUpdate($tags: [String!]!) {
  tagsUpdate(tags: $tags)
}
    `;
export type TagsUpdateMutationFn = ApolloReactCommon.MutationFunction<TagsUpdateMutation, TagsUpdateMutationVariables>;

/**
 * __useTagsUpdateMutation__
 *
 * To run a mutation, you first call `useTagsUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagsUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagsUpdateMutation, { data, loading, error }] = useTagsUpdateMutation({
 *   variables: {
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useTagsUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TagsUpdateMutation, TagsUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<TagsUpdateMutation, TagsUpdateMutationVariables>(TagsUpdateDocument, baseOptions);
      }
export type TagsUpdateMutationHookResult = ReturnType<typeof useTagsUpdateMutation>;
export type TagsUpdateMutationResult = ApolloReactCommon.MutationResult<TagsUpdateMutation>;
export type TagsUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<TagsUpdateMutation, TagsUpdateMutationVariables>;
export const AuthStepOneDocument = gql`
    query authStepOne($numero: String!) {
  AUTH_STEP_ONE(numero: $numero) {
    id
    status
  }
}
    `;

/**
 * __useAuthStepOneQuery__
 *
 * To run a query within a React component, call `useAuthStepOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthStepOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthStepOneQuery({
 *   variables: {
 *      numero: // value for 'numero'
 *   },
 * });
 */
export function useAuthStepOneQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthStepOneQuery, AuthStepOneQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthStepOneQuery, AuthStepOneQueryVariables>(AuthStepOneDocument, baseOptions);
      }
export function useAuthStepOneLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthStepOneQuery, AuthStepOneQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthStepOneQuery, AuthStepOneQueryVariables>(AuthStepOneDocument, baseOptions);
        }
export type AuthStepOneQueryHookResult = ReturnType<typeof useAuthStepOneQuery>;
export type AuthStepOneLazyQueryHookResult = ReturnType<typeof useAuthStepOneLazyQuery>;
export type AuthStepOneQueryResult = ApolloReactCommon.QueryResult<AuthStepOneQuery, AuthStepOneQueryVariables>;
export const AuthStepTwoDocument = gql`
    query authStepTwo($id: String!, $token: String!, $numero: String!) {
  AUTH_STEP_TWO(id: $id, token: $token, numero: $numero) {
    id
    nom
    token
    prenom
    success
  }
}
    `;

/**
 * __useAuthStepTwoQuery__
 *
 * To run a query within a React component, call `useAuthStepTwoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthStepTwoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthStepTwoQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *      numero: // value for 'numero'
 *   },
 * });
 */
export function useAuthStepTwoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthStepTwoQuery, AuthStepTwoQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthStepTwoQuery, AuthStepTwoQueryVariables>(AuthStepTwoDocument, baseOptions);
      }
export function useAuthStepTwoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthStepTwoQuery, AuthStepTwoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthStepTwoQuery, AuthStepTwoQueryVariables>(AuthStepTwoDocument, baseOptions);
        }
export type AuthStepTwoQueryHookResult = ReturnType<typeof useAuthStepTwoQuery>;
export type AuthStepTwoLazyQueryHookResult = ReturnType<typeof useAuthStepTwoLazyQuery>;
export type AuthStepTwoQueryResult = ApolloReactCommon.QueryResult<AuthStepTwoQuery, AuthStepTwoQueryVariables>;
export const GetAuthorizedCategoriesDocument = gql`
    query getAuthorizedCategories($id: String) {
  getAuthorizedCategories(id: $id) {
    listofauthorizedcategories
  }
}
    `;

/**
 * __useGetAuthorizedCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAuthorizedCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorizedCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorizedCategoriesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAuthorizedCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAuthorizedCategoriesQuery, GetAuthorizedCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAuthorizedCategoriesQuery, GetAuthorizedCategoriesQueryVariables>(GetAuthorizedCategoriesDocument, baseOptions);
      }
export function useGetAuthorizedCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAuthorizedCategoriesQuery, GetAuthorizedCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAuthorizedCategoriesQuery, GetAuthorizedCategoriesQueryVariables>(GetAuthorizedCategoriesDocument, baseOptions);
        }
export type GetAuthorizedCategoriesQueryHookResult = ReturnType<typeof useGetAuthorizedCategoriesQuery>;
export type GetAuthorizedCategoriesLazyQueryHookResult = ReturnType<typeof useGetAuthorizedCategoriesLazyQuery>;
export type GetAuthorizedCategoriesQueryResult = ApolloReactCommon.QueryResult<GetAuthorizedCategoriesQuery, GetAuthorizedCategoriesQueryVariables>;
export const GetAvisUserDocument = gql`
    query getAvisUser($userId: String!) {
  getAvisUser(userId: $userId) {
    id
    score
    comment
    createdAt
    scorer {
      ...scorer
    }
  }
}
    ${ScorerFragmentDoc}`;

/**
 * __useGetAvisUserQuery__
 *
 * To run a query within a React component, call `useGetAvisUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvisUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvisUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAvisUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAvisUserQuery, GetAvisUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAvisUserQuery, GetAvisUserQueryVariables>(GetAvisUserDocument, baseOptions);
      }
export function useGetAvisUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAvisUserQuery, GetAvisUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAvisUserQuery, GetAvisUserQueryVariables>(GetAvisUserDocument, baseOptions);
        }
export type GetAvisUserQueryHookResult = ReturnType<typeof useGetAvisUserQuery>;
export type GetAvisUserLazyQueryHookResult = ReturnType<typeof useGetAvisUserLazyQuery>;
export type GetAvisUserQueryResult = ApolloReactCommon.QueryResult<GetAvisUserQuery, GetAvisUserQueryVariables>;
export const DemandesrecuesDocument = gql`
    query demandesrecues {
  demandesrecues {
    ...demande
    sentBy {
      nom
      prenom
      avatar
      numero
      address
    }
  }
}
    ${DemandeFragmentDoc}`;

/**
 * __useDemandesrecuesQuery__
 *
 * To run a query within a React component, call `useDemandesrecuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDemandesrecuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDemandesrecuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDemandesrecuesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DemandesrecuesQuery, DemandesrecuesQueryVariables>) {
        return ApolloReactHooks.useQuery<DemandesrecuesQuery, DemandesrecuesQueryVariables>(DemandesrecuesDocument, baseOptions);
      }
export function useDemandesrecuesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DemandesrecuesQuery, DemandesrecuesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DemandesrecuesQuery, DemandesrecuesQueryVariables>(DemandesrecuesDocument, baseOptions);
        }
export type DemandesrecuesQueryHookResult = ReturnType<typeof useDemandesrecuesQuery>;
export type DemandesrecuesLazyQueryHookResult = ReturnType<typeof useDemandesrecuesLazyQuery>;
export type DemandesrecuesQueryResult = ApolloReactCommon.QueryResult<DemandesrecuesQuery, DemandesrecuesQueryVariables>;
export const GetSendVerificationPiecesReferenceIdsAndStatusDocument = gql`
    query getSendVerificationPiecesReferenceIdsAndStatus($id: String!) {
  getSendVerificationPiecesReferenceIdsAndStatus(id: $id)
}
    `;

/**
 * __useGetSendVerificationPiecesReferenceIdsAndStatusQuery__
 *
 * To run a query within a React component, call `useGetSendVerificationPiecesReferenceIdsAndStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSendVerificationPiecesReferenceIdsAndStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSendVerificationPiecesReferenceIdsAndStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSendVerificationPiecesReferenceIdsAndStatusQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSendVerificationPiecesReferenceIdsAndStatusQuery, GetSendVerificationPiecesReferenceIdsAndStatusQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSendVerificationPiecesReferenceIdsAndStatusQuery, GetSendVerificationPiecesReferenceIdsAndStatusQueryVariables>(GetSendVerificationPiecesReferenceIdsAndStatusDocument, baseOptions);
      }
export function useGetSendVerificationPiecesReferenceIdsAndStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSendVerificationPiecesReferenceIdsAndStatusQuery, GetSendVerificationPiecesReferenceIdsAndStatusQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSendVerificationPiecesReferenceIdsAndStatusQuery, GetSendVerificationPiecesReferenceIdsAndStatusQueryVariables>(GetSendVerificationPiecesReferenceIdsAndStatusDocument, baseOptions);
        }
export type GetSendVerificationPiecesReferenceIdsAndStatusQueryHookResult = ReturnType<typeof useGetSendVerificationPiecesReferenceIdsAndStatusQuery>;
export type GetSendVerificationPiecesReferenceIdsAndStatusLazyQueryHookResult = ReturnType<typeof useGetSendVerificationPiecesReferenceIdsAndStatusLazyQuery>;
export type GetSendVerificationPiecesReferenceIdsAndStatusQueryResult = ApolloReactCommon.QueryResult<GetSendVerificationPiecesReferenceIdsAndStatusQuery, GetSendVerificationPiecesReferenceIdsAndStatusQueryVariables>;
export const GetUserStatsDocument = gql`
    query getUserStats($id: String!) {
  getUserStats(id: $id) {
    done
    proposed
    average
  }
}
    `;

/**
 * __useGetUserStatsQuery__
 *
 * To run a query within a React component, call `useGetUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserStatsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserStatsQuery, GetUserStatsQueryVariables>(GetUserStatsDocument, baseOptions);
      }
export function useGetUserStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserStatsQuery, GetUserStatsQueryVariables>(GetUserStatsDocument, baseOptions);
        }
export type GetUserStatsQueryHookResult = ReturnType<typeof useGetUserStatsQuery>;
export type GetUserStatsLazyQueryHookResult = ReturnType<typeof useGetUserStatsLazyQuery>;
export type GetUserStatsQueryResult = ApolloReactCommon.QueryResult<GetUserStatsQuery, GetUserStatsQueryVariables>;
export const IncompleteOfferingsDocument = gql`
    query incompleteOfferings($take: Int!, $lastCursorId: String, $filters: [String!]!) {
  incompleteOfferings(take: $take, lastCursorId: $lastCursorId, filters: $filters) {
    hasNext
    endCursor
    offerings {
      ...offering
    }
  }
}
    ${OfferingFragmentDoc}`;

/**
 * __useIncompleteOfferingsQuery__
 *
 * To run a query within a React component, call `useIncompleteOfferingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIncompleteOfferingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncompleteOfferingsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      lastCursorId: // value for 'lastCursorId'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useIncompleteOfferingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IncompleteOfferingsQuery, IncompleteOfferingsQueryVariables>) {
        return ApolloReactHooks.useQuery<IncompleteOfferingsQuery, IncompleteOfferingsQueryVariables>(IncompleteOfferingsDocument, baseOptions);
      }
export function useIncompleteOfferingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IncompleteOfferingsQuery, IncompleteOfferingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IncompleteOfferingsQuery, IncompleteOfferingsQueryVariables>(IncompleteOfferingsDocument, baseOptions);
        }
export type IncompleteOfferingsQueryHookResult = ReturnType<typeof useIncompleteOfferingsQuery>;
export type IncompleteOfferingsLazyQueryHookResult = ReturnType<typeof useIncompleteOfferingsLazyQuery>;
export type IncompleteOfferingsQueryResult = ApolloReactCommon.QueryResult<IncompleteOfferingsQuery, IncompleteOfferingsQueryVariables>;
export const IsCandidateToDocument = gql`
    query isCandidateTo($take: Int!, $lastCursorId: String) {
  isCandidateTo(take: $take, lastCursorId: $lastCursorId) {
    hasNext
    endCursor
    offerings {
      ...offering
      status
      eventday
      completed
    }
  }
}
    ${OfferingFragmentDoc}`;

/**
 * __useIsCandidateToQuery__
 *
 * To run a query within a React component, call `useIsCandidateToQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsCandidateToQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsCandidateToQuery({
 *   variables: {
 *      take: // value for 'take'
 *      lastCursorId: // value for 'lastCursorId'
 *   },
 * });
 */
export function useIsCandidateToQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsCandidateToQuery, IsCandidateToQueryVariables>) {
        return ApolloReactHooks.useQuery<IsCandidateToQuery, IsCandidateToQueryVariables>(IsCandidateToDocument, baseOptions);
      }
export function useIsCandidateToLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsCandidateToQuery, IsCandidateToQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsCandidateToQuery, IsCandidateToQueryVariables>(IsCandidateToDocument, baseOptions);
        }
export type IsCandidateToQueryHookResult = ReturnType<typeof useIsCandidateToQuery>;
export type IsCandidateToLazyQueryHookResult = ReturnType<typeof useIsCandidateToLazyQuery>;
export type IsCandidateToQueryResult = ApolloReactCommon.QueryResult<IsCandidateToQuery, IsCandidateToQueryVariables>;
export const MyIncompleteOfferingDocument = gql`
    query myIncompleteOffering($take: Int!, $lastCursorId: String) {
  myIncompleteOffering(take: $take, lastCursorId: $lastCursorId) {
    hasNext
    endCursor
    offerings {
      ...offering
    }
  }
}
    ${OfferingFragmentDoc}`;

/**
 * __useMyIncompleteOfferingQuery__
 *
 * To run a query within a React component, call `useMyIncompleteOfferingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyIncompleteOfferingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyIncompleteOfferingQuery({
 *   variables: {
 *      take: // value for 'take'
 *      lastCursorId: // value for 'lastCursorId'
 *   },
 * });
 */
export function useMyIncompleteOfferingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyIncompleteOfferingQuery, MyIncompleteOfferingQueryVariables>) {
        return ApolloReactHooks.useQuery<MyIncompleteOfferingQuery, MyIncompleteOfferingQueryVariables>(MyIncompleteOfferingDocument, baseOptions);
      }
export function useMyIncompleteOfferingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyIncompleteOfferingQuery, MyIncompleteOfferingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyIncompleteOfferingQuery, MyIncompleteOfferingQueryVariables>(MyIncompleteOfferingDocument, baseOptions);
        }
export type MyIncompleteOfferingQueryHookResult = ReturnType<typeof useMyIncompleteOfferingQuery>;
export type MyIncompleteOfferingLazyQueryHookResult = ReturnType<typeof useMyIncompleteOfferingLazyQuery>;
export type MyIncompleteOfferingQueryResult = ApolloReactCommon.QueryResult<MyIncompleteOfferingQuery, MyIncompleteOfferingQueryVariables>;
export const MyIncompleteOfferingWithCandidatesDocument = gql`
    query myIncompleteOfferingWithCandidates($take: Int!, $lastCursorId: String) {
  myIncompleteOfferingWithCandidates(take: $take, lastCursorId: $lastCursorId) {
    hasNext
    endCursor
    offerings {
      ...offering
      status
      eventday
      selectedCandidate {
        id
      }
    }
  }
}
    ${OfferingFragmentDoc}`;

/**
 * __useMyIncompleteOfferingWithCandidatesQuery__
 *
 * To run a query within a React component, call `useMyIncompleteOfferingWithCandidatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyIncompleteOfferingWithCandidatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyIncompleteOfferingWithCandidatesQuery({
 *   variables: {
 *      take: // value for 'take'
 *      lastCursorId: // value for 'lastCursorId'
 *   },
 * });
 */
export function useMyIncompleteOfferingWithCandidatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyIncompleteOfferingWithCandidatesQuery, MyIncompleteOfferingWithCandidatesQueryVariables>) {
        return ApolloReactHooks.useQuery<MyIncompleteOfferingWithCandidatesQuery, MyIncompleteOfferingWithCandidatesQueryVariables>(MyIncompleteOfferingWithCandidatesDocument, baseOptions);
      }
export function useMyIncompleteOfferingWithCandidatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyIncompleteOfferingWithCandidatesQuery, MyIncompleteOfferingWithCandidatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyIncompleteOfferingWithCandidatesQuery, MyIncompleteOfferingWithCandidatesQueryVariables>(MyIncompleteOfferingWithCandidatesDocument, baseOptions);
        }
export type MyIncompleteOfferingWithCandidatesQueryHookResult = ReturnType<typeof useMyIncompleteOfferingWithCandidatesQuery>;
export type MyIncompleteOfferingWithCandidatesLazyQueryHookResult = ReturnType<typeof useMyIncompleteOfferingWithCandidatesLazyQuery>;
export type MyIncompleteOfferingWithCandidatesQueryResult = ApolloReactCommon.QueryResult<MyIncompleteOfferingWithCandidatesQuery, MyIncompleteOfferingWithCandidatesQueryVariables>;
export const OfferingByIdDocument = gql`
    query offeringById($id: String!) {
  offeringById(id: $id) {
    ...offering
    details
    eventday
    candidates {
      id
      avatar
      professional
      moyenne
    }
    selectedCandidate {
      id
      avatar
      professional
      moyenne
    }
  }
}
    ${OfferingFragmentDoc}`;

/**
 * __useOfferingByIdQuery__
 *
 * To run a query within a React component, call `useOfferingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfferingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfferingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOfferingByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OfferingByIdQuery, OfferingByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<OfferingByIdQuery, OfferingByIdQueryVariables>(OfferingByIdDocument, baseOptions);
      }
export function useOfferingByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OfferingByIdQuery, OfferingByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OfferingByIdQuery, OfferingByIdQueryVariables>(OfferingByIdDocument, baseOptions);
        }
export type OfferingByIdQueryHookResult = ReturnType<typeof useOfferingByIdQuery>;
export type OfferingByIdLazyQueryHookResult = ReturnType<typeof useOfferingByIdLazyQuery>;
export type OfferingByIdQueryResult = ApolloReactCommon.QueryResult<OfferingByIdQuery, OfferingByIdQueryVariables>;
export const OfferingByIdPostuleesDocument = gql`
    query offeringByIdPostulees($id: String!) {
  offeringById(id: $id) {
    ...offering
    details
    preferreddays
    eventday
    author {
      ...user
      numero
      address
    }
  }
}
    ${OfferingFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useOfferingByIdPostuleesQuery__
 *
 * To run a query within a React component, call `useOfferingByIdPostuleesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfferingByIdPostuleesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfferingByIdPostuleesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOfferingByIdPostuleesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OfferingByIdPostuleesQuery, OfferingByIdPostuleesQueryVariables>) {
        return ApolloReactHooks.useQuery<OfferingByIdPostuleesQuery, OfferingByIdPostuleesQueryVariables>(OfferingByIdPostuleesDocument, baseOptions);
      }
export function useOfferingByIdPostuleesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OfferingByIdPostuleesQuery, OfferingByIdPostuleesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OfferingByIdPostuleesQuery, OfferingByIdPostuleesQueryVariables>(OfferingByIdPostuleesDocument, baseOptions);
        }
export type OfferingByIdPostuleesQueryHookResult = ReturnType<typeof useOfferingByIdPostuleesQuery>;
export type OfferingByIdPostuleesLazyQueryHookResult = ReturnType<typeof useOfferingByIdPostuleesLazyQuery>;
export type OfferingByIdPostuleesQueryResult = ApolloReactCommon.QueryResult<OfferingByIdPostuleesQuery, OfferingByIdPostuleesQueryVariables>;
export const PropositionToOfferingDetailsDocument = gql`
    query propositionToOfferingDetails($userId: String!, $offeringId: String!) {
  propositionToOfferingDetails(userId: $userId, offeringId: $offeringId) {
    message
    priceRange
    candidateUsername
    descriptionPrestataire
  }
}
    `;

/**
 * __usePropositionToOfferingDetailsQuery__
 *
 * To run a query within a React component, call `usePropositionToOfferingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropositionToOfferingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropositionToOfferingDetailsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offeringId: // value for 'offeringId'
 *   },
 * });
 */
export function usePropositionToOfferingDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PropositionToOfferingDetailsQuery, PropositionToOfferingDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<PropositionToOfferingDetailsQuery, PropositionToOfferingDetailsQueryVariables>(PropositionToOfferingDetailsDocument, baseOptions);
      }
export function usePropositionToOfferingDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PropositionToOfferingDetailsQuery, PropositionToOfferingDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PropositionToOfferingDetailsQuery, PropositionToOfferingDetailsQueryVariables>(PropositionToOfferingDetailsDocument, baseOptions);
        }
export type PropositionToOfferingDetailsQueryHookResult = ReturnType<typeof usePropositionToOfferingDetailsQuery>;
export type PropositionToOfferingDetailsLazyQueryHookResult = ReturnType<typeof usePropositionToOfferingDetailsLazyQuery>;
export type PropositionToOfferingDetailsQueryResult = ApolloReactCommon.QueryResult<PropositionToOfferingDetailsQuery, PropositionToOfferingDetailsQueryVariables>;
export const UserByIdDocument = gql`
    query userById($id: String!) {
  userById(id: $id) {
    nom
    tags
    prenom
    avatar
    numero
    address
    verified
    description
    professional
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
      }
export function useUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = ApolloReactCommon.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const GetVerificationPiecesDocument = gql`
    query getVerificationPieces($id: String) {
  getVerificationPieces(id: $id) {
    listofpieces
  }
}
    `;

/**
 * __useGetVerificationPiecesQuery__
 *
 * To run a query within a React component, call `useGetVerificationPiecesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVerificationPiecesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVerificationPiecesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVerificationPiecesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVerificationPiecesQuery, GetVerificationPiecesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVerificationPiecesQuery, GetVerificationPiecesQueryVariables>(GetVerificationPiecesDocument, baseOptions);
      }
export function useGetVerificationPiecesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVerificationPiecesQuery, GetVerificationPiecesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVerificationPiecesQuery, GetVerificationPiecesQueryVariables>(GetVerificationPiecesDocument, baseOptions);
        }
export type GetVerificationPiecesQueryHookResult = ReturnType<typeof useGetVerificationPiecesQuery>;
export type GetVerificationPiecesLazyQueryHookResult = ReturnType<typeof useGetVerificationPiecesLazyQuery>;
export type GetVerificationPiecesQueryResult = ApolloReactCommon.QueryResult<GetVerificationPiecesQuery, GetVerificationPiecesQueryVariables>;
export const NewAvisDocument = gql`
    subscription NewAvis($userId: String!) {
  newAvis(userId: $userId) {
    ...avis
  }
}
    ${AvisFragmentDoc}`;

/**
 * __useNewAvisSubscription__
 *
 * To run a query within a React component, call `useNewAvisSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewAvisSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewAvisSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewAvisSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewAvisSubscription, NewAvisSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewAvisSubscription, NewAvisSubscriptionVariables>(NewAvisDocument, baseOptions);
      }
export type NewAvisSubscriptionHookResult = ReturnType<typeof useNewAvisSubscription>;
export type NewAvisSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewAvisSubscription>;
export const NewDemandeDocument = gql`
    subscription NewDemande($recipientId: String!) {
  newDemande(recipientId: $recipientId) {
    ...demande
    sentBy {
      nom
      prenom
      avatar
      numero
      address
    }
  }
}
    ${DemandeFragmentDoc}`;

/**
 * __useNewDemandeSubscription__
 *
 * To run a query within a React component, call `useNewDemandeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewDemandeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewDemandeSubscription({
 *   variables: {
 *      recipientId: // value for 'recipientId'
 *   },
 * });
 */
export function useNewDemandeSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewDemandeSubscription, NewDemandeSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewDemandeSubscription, NewDemandeSubscriptionVariables>(NewDemandeDocument, baseOptions);
      }
export type NewDemandeSubscriptionHookResult = ReturnType<typeof useNewDemandeSubscription>;
export type NewDemandeSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewDemandeSubscription>;
export const OnOfferingAddedDocument = gql`
    subscription onOfferingAdded($tags: [String!]!) {
  onOfferingAdded(tags: $tags) {
    ...offering
    author {
      id
    }
  }
}
    ${OfferingFragmentDoc}`;

/**
 * __useOnOfferingAddedSubscription__
 *
 * To run a query within a React component, call `useOnOfferingAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnOfferingAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnOfferingAddedSubscription({
 *   variables: {
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useOnOfferingAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnOfferingAddedSubscription, OnOfferingAddedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnOfferingAddedSubscription, OnOfferingAddedSubscriptionVariables>(OnOfferingAddedDocument, baseOptions);
      }
export type OnOfferingAddedSubscriptionHookResult = ReturnType<typeof useOnOfferingAddedSubscription>;
export type OnOfferingAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnOfferingAddedSubscription>;
export const UpdatedEventDayDocument = gql`
    subscription updatedEventDay($userId: String!) {
  updatedEventDay(userId: $userId) {
    eventday
    offeringId
  }
}
    `;

/**
 * __useUpdatedEventDaySubscription__
 *
 * To run a query within a React component, call `useUpdatedEventDaySubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdatedEventDaySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdatedEventDaySubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdatedEventDaySubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<UpdatedEventDaySubscription, UpdatedEventDaySubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<UpdatedEventDaySubscription, UpdatedEventDaySubscriptionVariables>(UpdatedEventDayDocument, baseOptions);
      }
export type UpdatedEventDaySubscriptionHookResult = ReturnType<typeof useUpdatedEventDaySubscription>;
export type UpdatedEventDaySubscriptionResult = ApolloReactCommon.SubscriptionResult<UpdatedEventDaySubscription>;
export const UpdateAppliedToDocument = gql`
    subscription updateAppliedTo($userId: String!) {
  updateAppliedTo(userId: $userId) {
    id
    status
  }
}
    `;

/**
 * __useUpdateAppliedToSubscription__
 *
 * To run a query within a React component, call `useUpdateAppliedToSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppliedToSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateAppliedToSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateAppliedToSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<UpdateAppliedToSubscription, UpdateAppliedToSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<UpdateAppliedToSubscription, UpdateAppliedToSubscriptionVariables>(UpdateAppliedToDocument, baseOptions);
      }
export type UpdateAppliedToSubscriptionHookResult = ReturnType<typeof useUpdateAppliedToSubscription>;
export type UpdateAppliedToSubscriptionResult = ApolloReactCommon.SubscriptionResult<UpdateAppliedToSubscription>;