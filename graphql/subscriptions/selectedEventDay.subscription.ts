import gql from 'graphql-tag';

export default gql`
  subscription updatedEventDay($userId: String!) {
    updatedEventDay(userId: $userId) {
      eventday
      offeringId
    }
  }
`;
