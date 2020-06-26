import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query incompleteOfferings($filters: [String!]) {
    incompleteOfferings(filters: $filters) {
      ...offering
    }
  }
  ${offering}
`;
