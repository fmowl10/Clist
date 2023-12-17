export function getId() {
  return process.env.REACT_APP_TMP_ID;
}

export function getAuthToken() {
  return process.env.REACT_APP_AUTHTOKEN;
}

export function getRecommendToken() {
  return process.env.REACT_APP_LOGICTOKEN;
}

export function getGraphqlEndpoint() {
  return process.env.REACT_APP_HASURA_ENDPOINT;
}

export function getAuthServerEndpoint() {
  return `http://127.0.0.1:${process.env.REACT_APP_AUTH_PORT}/auth/`;
}

export function getLogicServerEndpoint() {
  return `http://127.0.0.1:${process.env.REACT_APP_LOGIC_PORT}/logic/`;
}
