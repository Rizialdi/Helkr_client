import gql from 'graphql-tag';

export default gql`
  query authStepOne($numero: String!) {
    AUTH_STEP_ONE(numero: $numero) {
      id
      status
    }
  }
`;
