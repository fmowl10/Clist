import { useState, useEffect } from "react";

import PageContent from "../components/PageContent";
import Button from "../UI/Button";
import RecommendList from "../components/RecomendList";
import fetchQuery from "../util/fetchQuery";
import fetchData from "../util/fetchData";

const RecommendPage = () => {
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    loadRecommend().then((newRecommendData) => {
      setRecommend(newRecommendData);
    });
  }, []);

  const handleRecommend = async () => {
    const newRecommendData = await loadRecommend();
    setRecommend(newRecommendData);
  };

  return (
    <PageContent width="max-content">
      <RecommendList clothesData={recommend} />
      <Button onClick={handleRecommend}>다시 추천받기</Button>
    </PageContent>
  );
};

export default RecommendPage;

const loadRecommend = async () => {
  const responseData = await fetchData("recommend");
  const { upper_id, lower_id } = responseData;

  const upper_data = await fetchQuery({
    query: `query MyQuery {
      closet_by_pk(clothes_id: ${upper_id}) {
        season
        is_upper
        color
        clothes_id
      }
    }`,
  });

  const lower_data = await fetchQuery({
    query: `query MyQuery {
      closet_by_pk(clothes_id: ${lower_id}) {
        season
        is_upper
        color
        clothes_id
      }
    }`,
  });
  console.log([upper_data.data.closet_by_pk, lower_data.data.closet_by_pk]);
  return [upper_data.data.closet_by_pk, lower_data.data.closet_by_pk];
};

export const action = () => {};
