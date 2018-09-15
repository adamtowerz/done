import gql from "graphql-tag";

export const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $pass: String!) {
    registerUser(input: { email: $email, pass: $pass }) {
      clientMutationId
    }
  }
`;

const JWT_CACHE_LOC = 'JWT'

export function jwtFromCache(){
  return localStorage.getItem(JWT_CACHE_LOC)
}

export function jwtToCache(jwt) {
  return localStorage.setItem(JWT_CACHE_LOC, jwt)
}

export function jwtClearCache() {
  return localStorage.removeItem(JWT_CACHE_LOC)
}
