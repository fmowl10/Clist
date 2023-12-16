import { getAuthToken, getGraphqlEndpoint } from "./auth";

const token = getAuthToken();
const graphqlEndpoint = getGraphqlEndpoint();

const fetchQuery = async (graphqlQuery) => {
  const response = await fetch(graphqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(graphqlQuery),
  });

  const data = await response.json();
  console.log(`response: ${data}`);
  return data;
};

export default fetchQuery;
