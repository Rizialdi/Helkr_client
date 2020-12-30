import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query incompleteOfferings(
    $take: Int!
    $lastCursorId: String
    $filters: [String!]!
  ) {
    incompleteOfferings(
      take: $take
      lastCursorId: $lastCursorId
      filters: $filters
    ) {
      hasNext
      endCursor
      offerings {
        ...offering
      }
    }
  }
  ${offering}
`;
