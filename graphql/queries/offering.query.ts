import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
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
  ${offering}
`;
