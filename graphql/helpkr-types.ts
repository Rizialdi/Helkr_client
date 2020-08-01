/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Json: any;
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
  user: Utilisateur;
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

export type Channel = {
  __typename?: 'channel';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  messages: Array<Message>;
  users: Array<Utilisateur>;
};


export type ChannelMessagesArgs = {
  after?: Maybe<MessageWhereUniqueInput>;
  before?: Maybe<MessageWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ChannelUsersArgs = {
  after?: Maybe<UtilisateurWhereUniqueInput>;
  before?: Maybe<UtilisateurWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ChannelWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type CreateChannel = {
  __typename?: 'createChannel';
  channel: Channel;
  success: Scalars['Boolean'];
};




export type Message = {
  __typename?: 'message';
  channel?: Maybe<Channel>;
  channelId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  sentById?: Maybe<Scalars['String']>;
  text: Scalars['String'];
};

export type MessageWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
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
  addOffering: Scalars['Boolean'];
  addressUpdate: Scalars['Boolean'];
  addVerificationpieces: Scalars['Boolean'];
  avatarUpload: Scalars['Boolean'];
  candidateToOffering: CandidateToOfferingSuccess;
  chooseCandidate: Scalars['Boolean'];
  chooseEventDay: Scalars['Boolean'];
  completeOffering: Scalars['Boolean'];
  createAvis: Scalars['Boolean'];
  createChannel: CreateChannel;
  createMessage: Scalars['Boolean'];
  deleteOffering: Scalars['Boolean'];
  descriptionUpdate: Scalars['Boolean'];
  notificationsTokenUpdate: Scalars['Boolean'];
  registerUser: AuthPayload;
  removeAuthorizedCategories: Scalars['Boolean'];
  tagsUpdate: Scalars['Boolean'];
  updateOffering: Scalars['Boolean'];
};


export type MutationAddAuthorizedCategoriesArgs = {
  authorizedcategory: Scalars['String'];
  id?: Maybe<Scalars['String']>;
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


export type MutationCreateChannelArgs = {
  recipient: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  channelId?: Maybe<Scalars['String']>;
  recipient?: Maybe<Scalars['String']>;
  text: Scalars['String'];
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
  nom: Scalars['String'];
  numero: Scalars['String'];
  prenom: Scalars['String'];
};


export type MutationRemoveAuthorizedCategoriesArgs = {
  id?: Maybe<Scalars['String']>;
  referenceId: Scalars['String'];
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

export type OfferingWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allChatsAndMessages: Array<Channel>;
  allOfferings: Array<Offering>;
  allUsersToken: Array<Notificationstoken>;
  channel: Channel;
  channels: Array<Channel>;
  getAuthorizedCategories: Authorizedcategories;
  getAvisUser: Array<Avis>;
  getSendVerificationPiecesReferenceIdsAndStatus: Scalars['String'];
  getUserInfo: AuthPayload;
  getUserStats: Stats;
  getVerificationPieces: Verificationpieces;
  incompleteOfferings: Array<Offering>;
  isCandidateTo: Array<Offering>;
  messages: Array<Message>;
  myIncompleteOffering: Array<Offering>;
  myIncompleteOfferingWithCandidates: Array<Offering>;
  offeringById: Offering;
  offeringsUser: Array<Offering>;
  userById: Utilisateur;
  users: Array<Utilisateur>;
};


export type QueryAllOfferingsArgs = {
  filters: Array<Scalars['String']>;
};


export type QueryChannelArgs = {
  id: Scalars['String'];
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
};


export type QueryOfferingByIdArgs = {
  id: Scalars['String'];
};


export type QueryOfferingsUserArgs = {
  numero: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
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

export type Subscription = {
  __typename?: 'Subscription';
  newAvis: Avis;
  newChannel: Channel;
  newMessage: Message;
  onOfferingAdded: Offering;
  updateAppliedTo: UpdateAppliedToType;
  updatedEventDay: UpdateSelectedEventDay;
};


export type SubscriptionNewAvisArgs = {
  userId: Scalars['String'];
};


export type SubscriptionNewChannelArgs = {
  userId: Scalars['String'];
};


export type SubscriptionNewMessageArgs = {
  channelIds: Array<Scalars['String']>;
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
  channels: Array<Channel>;
  completedofferings: Array<Offering>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  messages: Array<Message>;
  moyenne: Scalars['Int'];
  nom: Scalars['String'];
  numero: Scalars['String'];
  offerings: Array<Offering>;
  prenom: Scalars['String'];
  professional: Scalars['Boolean'];
  tags: Array<Scalars['String']>;
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


export type UtilisateurChannelsArgs = {
  after?: Maybe<ChannelWhereUniqueInput>;
  before?: Maybe<ChannelWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UtilisateurCompletedofferingsArgs = {
  after?: Maybe<OfferingWhereUniqueInput>;
  before?: Maybe<OfferingWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UtilisateurMessagesArgs = {
  after?: Maybe<MessageWhereUniqueInput>;
  before?: Maybe<MessageWhereUniqueInput>;
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
    
export type ChatFragment = (
  { __typename?: 'channel' }
  & Pick<Channel, 'id' | 'createdAt'>
  & { messages: Array<(
    { __typename?: 'message' }
    & MessageFragment
  )>, users: Array<(
    { __typename?: 'utilisateur' }
    & UserFragment
  )> }
);

export type MessageFragment = (
  { __typename?: 'message' }
  & Pick<Message, 'id' | 'text' | 'createdAt' | 'sentById'>
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

export type CreateMessageMutationVariables = Exact<{
  channelId?: Maybe<Scalars['String']>;
  recipient?: Maybe<Scalars['String']>;
  text: Scalars['String'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMessage'>
);

export type DeleteOfferingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteOfferingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteOffering'>
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

export type AllChatsAndMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllChatsAndMessagesQuery = (
  { __typename?: 'Query' }
  & { allChatsAndMessages: Array<(
    { __typename?: 'channel' }
    & ChatFragment
  )> }
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
  filters: Array<Scalars['String']>;
}>;


export type IncompleteOfferingsQuery = (
  { __typename?: 'Query' }
  & { incompleteOfferings: Array<(
    { __typename?: 'offering' }
    & OfferingFragment
  )> }
);

export type IsCandidateToQueryVariables = Exact<{ [key: string]: never; }>;


export type IsCandidateToQuery = (
  { __typename?: 'Query' }
  & { isCandidateTo: Array<(
    { __typename?: 'offering' }
    & Pick<Offering, 'status' | 'eventday' | 'completed'>
    & OfferingFragment
  )> }
);

export type MyIncompleteOfferingQueryVariables = Exact<{ [key: string]: never; }>;


export type MyIncompleteOfferingQuery = (
  { __typename?: 'Query' }
  & { myIncompleteOffering: Array<(
    { __typename?: 'offering' }
    & OfferingFragment
  )> }
);

export type MyIncompleteOfferingWithCandidatesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyIncompleteOfferingWithCandidatesQuery = (
  { __typename?: 'Query' }
  & { myIncompleteOfferingWithCandidates: Array<(
    { __typename?: 'offering' }
    & Pick<Offering, 'status' | 'eventday'>
    & { selectedCandidate?: Maybe<(
      { __typename?: 'utilisateur' }
      & Pick<Utilisateur, 'id'>
    )> }
    & OfferingFragment
  )> }
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

export type UserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'utilisateur' }
    & Pick<Utilisateur, 'nom' | 'tags' | 'prenom' | 'avatar' | 'address' | 'verified' | 'description' | 'professional'>
  ) }
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

export type NewChannelSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type NewChannelSubscription = (
  { __typename?: 'Subscription' }
  & { newChannel: (
    { __typename?: 'channel' }
    & ChatFragment
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{
  channelIds: Array<Scalars['String']>;
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'message' }
    & Pick<Message, 'channelId'>
    & MessageFragment
  ) }
);

export type OnOfferingAddedSubscriptionVariables = Exact<{
  tags: Array<Scalars['String']>;
}>;


export type OnOfferingAddedSubscription = (
  { __typename?: 'Subscription' }
  & { onOfferingAdded: (
    { __typename?: 'offering' }
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

export const MessageFragmentDoc = gql`
    fragment message on message {
  id
  text
  createdAt
  sentById
}
    `;
export const UserFragmentDoc = gql`
    fragment user on utilisateur {
  id
  nom
  prenom
  avatar
}
    `;
export const ChatFragmentDoc = gql`
    fragment chat on channel {
  id
  messages {
    ...message
  }
  createdAt
  users {
    ...user
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}`;
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
    mutation candidateToOffering($id: String!) {
  candidateToOffering(id: $id) {
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
export const CreateMessageDocument = gql`
    mutation createMessage($channelId: String, $recipient: String, $text: String!) {
  createMessage(channelId: $channelId, recipient: $recipient, text: $text)
}
    `;
export type CreateMessageMutationFn = ApolloReactCommon.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      recipient: // value for 'recipient'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
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
export const AllChatsAndMessagesDocument = gql`
    query allChatsAndMessages {
  allChatsAndMessages {
    ...chat
  }
}
    ${ChatFragmentDoc}`;

/**
 * __useAllChatsAndMessagesQuery__
 *
 * To run a query within a React component, call `useAllChatsAndMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllChatsAndMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllChatsAndMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllChatsAndMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllChatsAndMessagesQuery, AllChatsAndMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<AllChatsAndMessagesQuery, AllChatsAndMessagesQueryVariables>(AllChatsAndMessagesDocument, baseOptions);
      }
export function useAllChatsAndMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllChatsAndMessagesQuery, AllChatsAndMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllChatsAndMessagesQuery, AllChatsAndMessagesQueryVariables>(AllChatsAndMessagesDocument, baseOptions);
        }
export type AllChatsAndMessagesQueryHookResult = ReturnType<typeof useAllChatsAndMessagesQuery>;
export type AllChatsAndMessagesLazyQueryHookResult = ReturnType<typeof useAllChatsAndMessagesLazyQuery>;
export type AllChatsAndMessagesQueryResult = ApolloReactCommon.QueryResult<AllChatsAndMessagesQuery, AllChatsAndMessagesQueryVariables>;
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
    query incompleteOfferings($filters: [String!]!) {
  incompleteOfferings(filters: $filters) {
    ...offering
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
    query isCandidateTo {
  isCandidateTo {
    ...offering
    status
    eventday
    completed
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
    query myIncompleteOffering {
  myIncompleteOffering {
    ...offering
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
    query myIncompleteOfferingWithCandidates {
  myIncompleteOfferingWithCandidates {
    ...offering
    status
    eventday
    selectedCandidate {
      id
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
export const UserByIdDocument = gql`
    query userById($id: String!) {
  userById(id: $id) {
    nom
    tags
    prenom
    avatar
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
export const NewChannelDocument = gql`
    subscription newChannel($userId: String!) {
  newChannel(userId: $userId) {
    ...chat
  }
}
    ${ChatFragmentDoc}`;

/**
 * __useNewChannelSubscription__
 *
 * To run a query within a React component, call `useNewChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChannelSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewChannelSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewChannelSubscription, NewChannelSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewChannelSubscription, NewChannelSubscriptionVariables>(NewChannelDocument, baseOptions);
      }
export type NewChannelSubscriptionHookResult = ReturnType<typeof useNewChannelSubscription>;
export type NewChannelSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewChannelSubscription>;
export const NewMessageDocument = gql`
    subscription NewMessage($channelIds: [String!]!) {
  newMessage(channelIds: $channelIds) {
    ...message
    channelId
  }
}
    ${MessageFragmentDoc}`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelIds: // value for 'channelIds'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewMessageSubscription>;
export const OnOfferingAddedDocument = gql`
    subscription onOfferingAdded($tags: [String!]!) {
  onOfferingAdded(tags: $tags) {
    ...offering
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