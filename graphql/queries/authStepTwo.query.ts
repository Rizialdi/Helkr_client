import gql from 'graphql-tag';

export default gql`
  query authStepTwo($id: String!, $token: String!, $numero: String!) {
    AUTH_STEP_TWO(id: $id, token: $token, numero: $numero) {
      id
      nom
      token
      prenom
      success
    }
  }
`;
