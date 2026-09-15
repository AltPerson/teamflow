import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
      displayName
      avatarUrl
      emailVerifiedAt
      createdAt
      updatedAt
    }
  }
`;
