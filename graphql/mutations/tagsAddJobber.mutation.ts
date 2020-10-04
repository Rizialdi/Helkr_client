import gql from 'graphql-tag';

export default gql`
  mutation tagsAddJobber($tag: String!) {
    tagsAddJobber(tag: $tag) {
      max
      added
    }
  }
`;
