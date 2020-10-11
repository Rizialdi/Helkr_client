import gql from 'graphql-tag';

export default gql`
  query propositionToOfferingDetails($userId: String!, $offeringId: String!) {
    propositionToOfferingDetails(userId: $userId, offeringId: $offeringId) {
      message
      priceRange
      candidateUsername
      descriptionPrestataire
    }
  }
`;
