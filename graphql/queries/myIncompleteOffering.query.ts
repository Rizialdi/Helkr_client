import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query myIncompleteOffering {
    myIncompleteOffering {
      ...offering
    }
  }
  ${offering}
`;
