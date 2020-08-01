import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  subscription onOfferingAdded($tags: [String!]!) {
    onOfferingAdded(tags: $tags) {
      ...offering
    }
  }
  ${offering}
`;
