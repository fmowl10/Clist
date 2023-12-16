import { useState } from "react";

import PageContent from "../components/PageContent";
import Button from "../UI/Button";
import RecommendList from "../components/RecomendList";

const DUMMY_RECOMMEND = [
  {
    clothes_id: 1,
    color: "red",
    is_upper: true,
    season: "winter",
    state: undefined,
  },
  {
    clothes_id: 2,
    color: "yellow",
    is_upper: false,
    season: "summer",
    state: undefined,
  },
];

const RecommendPage = () => {
  const [recommend, setRecommend] = useState(DUMMY_RECOMMEND);

  const loadRecommend = () => {
    return DUMMY_RECOMMEND;
  };

  const handleRecommend = () => {
    setRecommend(loadRecommend());
  };

  return (
    <PageContent width="max-content">
      <RecommendList clothesData={recommend} />
      <Button onClick={handleRecommend}>다시 추천받기</Button>
    </PageContent>
  );
};

export default RecommendPage;

export const action = () => {};
