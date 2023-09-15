import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments {
    getComments {
      id
      text
      createdAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!) {
    createComment(text: $text) {
      id
      text
      createdAt
    }
  }
`;
