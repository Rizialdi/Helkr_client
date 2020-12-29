import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query myIncompleteOfferingWithCandidates($take: Int!, $lastCursorId: String) {
    myIncompleteOfferingWithCandidates(
      take: $take
      lastCursorId: $lastCursorId
    ) {
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
  ${offering}
`;
