import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
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
  ${offering}
`;
