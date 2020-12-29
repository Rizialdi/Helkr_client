import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query myIncompleteOffering($take: Int!, $lastCursorId: String) {
    myIncompleteOffering(take: $take, lastCursorId: $lastCursorId) {
      hasNext
      endCursor
      offerings {
        ...offering
      }
    }
  }
  ${offering}
`;
