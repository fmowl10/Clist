import { Suspense, useState, useEffect } from "react";
import { Await, defer } from "react-router-dom";
import ClothesList from "../components/ClothesList";
import PageContent from "../components/PageContent";
import fetchQuery from "../util/fetchQuery";

import { getAuthToken, getGraphqlEndpoint } from "../util/auth";
const token = getAuthToken();
const graphqlEndpoint = getGraphqlEndpoint();
const ClosetPage = () => {
  const [closets, setClosets] = useState([]);

  useEffect(() => {
    loadCloset().then((data) => {
      setClosets(data);
    });
  }, []);

  return (
    <PageContent width="max-content">
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={closets}>
          {(loadedClosets) => <ClothesList clothesData={loadedClosets} />}
        </Await>
      </Suspense>
    </PageContent>
  );
};

export default ClosetPage;

const loadCloset = async () => {
  const graphqlQuery = {
    query: `
      query MyQuery {
        closet {
          clothes_id
          color
          is_upper
          season
          state
        }
      }
    `,
  };

  const data = await fetchQuery(graphqlQuery);
  return data.data.closet;
};

export function loader() {
  return defer({
    closet: loadCloset(),
  });
}
