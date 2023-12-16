import { useState } from "react";

import PageContent from "../components/PageContent";
import Dropdown from "../UI/Dropdown";
import Button from "../UI/Button";
import { useNavigate, useParams } from "react-router-dom";
import korToEng from "../util/korToEng";
import fetchQuery from "../util/fetchQuery";

const EditClothesPage = () => {
  const { clothesId } = useParams();
  const navigate = useNavigate();

  const [selectedIsUpper, setSelectedIsUpper] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  const handleIsUpperChange = (item) => {
    setSelectedIsUpper(item);
  };
  const handleColorChange = (item) => {
    setSelectedColor(item);
  };
  const handleSeasonChange = (item) => {
    setSelectedSeason(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("edit", selectedColor, selectedSeason, selectedIsUpper);

    const graphqlQuery = {
      query: `mutation UpdateCloset {
        update_closet(where: {
          clothes_id: {_eq: ${clothesId}}}, 
          _set: {
            color: "${korToEng[selectedColor]}", 
            is_upper: ${korToEng[selectedIsUpper]}, 
            season: "${korToEng[selectedSeason]}"}) {
          returning {
            color
            is_upper
            season
          }
        }
      }
      
      `,
    };
    const data = fetchQuery(graphqlQuery);
    console.log(data);

    navigate("/closet");
  };

  const handleDelete = async () => {
    console.log("delete");

    const graphqlQuery = {
      query: `
      mutation MyMutation {
      delete_closet_by_pk(clothes_id: ${clothesId}) {
        state
      }
    }
    `,
    };
    console.log(clothesId);

    const data = fetchQuery(graphqlQuery);
    console.log(data);

    navigate("/closet");
  };

  return (
    <PageContent>
      <form onSubmit={handleSubmit}>
        <h1>옷 수정하기</h1>
        <Dropdown items={["상의", "하의"]} onChange={handleIsUpperChange}>
          종류 선택
        </Dropdown>
        <Dropdown
          items={
            selectedIsUpper
              ? ["네이비", "그린", "옐로우", "블루", "베이지", "레드"]
              : ["연청", "진청", "블랙진", "베이지", "크림진", "카키"]
          }
          onChange={handleColorChange}
        >
          색상 선택
        </Dropdown>
        <Dropdown
          items={["여름", "겨울", "봄/가을"]}
          onChange={handleSeasonChange}
        >
          계절 선택
        </Dropdown>
        <Button color="red" type="button" onClick={handleDelete}>
          옷 삭제하기
        </Button>
        <Button type="submit">확인</Button>
      </form>
    </PageContent>
  );
};

export default EditClothesPage;
