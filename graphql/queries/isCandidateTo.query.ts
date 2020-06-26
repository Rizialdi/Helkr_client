import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query isCandidateTo {
    isCandidateTo {
      ...offering
      status
    }
  }
  ${offering}
`;
