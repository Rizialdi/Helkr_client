import gql from 'graphql-tag';

export const avatarUpload = gql`
  mutation avatarUpload($file: uploadImageType) {
    avatarUpload(file: $file)
  }
`;

export const descriptionUpdate = gql`
  mutation descriptionUpdate($text: String!) {
    descriptionUpdate(text: $text)
  }
`;

export const addressUpdate = gql`
  mutation addressUpdate($text: String!) {
    addressUpdate(text: $text)
  }
`;

export const tagsUpdate = gql`
  mutation tagsUpdate($tags: [String!]!) {
    tagsUpdate(tags: $tags)
  }
`;
