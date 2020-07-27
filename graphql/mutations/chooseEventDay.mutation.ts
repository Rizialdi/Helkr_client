import gql from 'graphql-tag';

export default gql`
  mutation chooseEventDay($id: String!, $timestamp: String!) {
    chooseEventDay(id: $id, timestamp: $timestamp)
  }
`;
