import gql from 'graphql-tag';

export default gql`
  query getAuthorizedCategories($id: String) {
    getAuthorizedCategories(id: $id) {
      listofauthorizedcategories
    }
  }
`;
