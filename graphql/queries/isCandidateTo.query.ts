import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
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
  ${offering}
`;
