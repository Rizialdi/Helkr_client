import gql from 'graphql-tag';

export default gql`
  mutation chooseCandidate($id: String!, $candidateId: String!) {
    chooseCandidate(id: $id, candidateId: $candidateId)
  }
`;
