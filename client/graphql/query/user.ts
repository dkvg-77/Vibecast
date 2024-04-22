import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
     #graphql
     query VerifyUserGoogleTokenQuery($token: String!){
          verifyGoogleToken(token: $token)
     }
`)

export const getcurrentUserQuery = graphql(`
     query GetCurrentUser{
          getCurrentUser{
               id
               profileImageURL
               email
               firstName
               lastName
               recommendedUsers{
                    id
                    firstName
                    lastName
                    profileImageURL
               }

               followers{
                    id
                    firstName
                    lastName
                    profileImageURL
               }
               following{
                    id
                    firstName
                    lastName
                    profileImageURL
               }
               posts {
                    id
                    content
                    author {
                         firstName
                         lastName
                         profileImageURL
                    }
               }
          }
     }
`)

export const getUserByIdQuery = graphql(`
#graphql
     query GetUserById($id: ID!) {
          getUserById(id: $id) {
               id
               firstName
               lastName
               profileImageURL
               followers{
                    id
                    firstName
                    lastName
                    profileImageURL
               }
               following{
                    id
                    firstName
                    lastName
                    profileImageURL
               }

               posts {
                    id
                    author {
                    id
                    firstName
                    profileImageURL
                    lastName
                    }
                    content
          }
     }
}

`)