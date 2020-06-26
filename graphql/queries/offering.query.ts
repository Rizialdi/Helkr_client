import gql from 'graphql-tag';
import { offering } from '../fragments';

export default gql`
  query offeringById($id: String!) {
    offeringById(id: $id) {
      ...offering
      details
    }
  }
  ${offering}
`;
