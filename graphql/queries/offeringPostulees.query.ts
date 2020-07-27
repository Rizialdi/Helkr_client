import gql from 'graphql-tag';
import { offering, user } from '../fragments';

export default gql`
  query offeringByIdPostulees($id: String!) {
    offeringById(id: $id) {
      ...offering
      details
      preferreddays
      eventday
      author {
        ...user
        numero
        address
      }
    }
  }
  ${offering}
  ${user}
`;
