import { useState } from "react";

import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";
import PageContent from "../components/PageContent";
import { getAuthToken, getGraphqlEndpoint } from "../util/auth";
import { useNavigate } from "react-router-dom";
import korToEng from "../util/korToEng";

const token = getAuthToken();
const graphqlEndpoint = getGraphqlEndpoint();

const NewClothesPage = () => {
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
    console.log("add", selectedColor, selectedSeason, selectedIsUpper);

    const graphqlQuery = {
      query: `
      mutation MyMutation {
        insert_closet(
          objects: {
            color: "${korToEng[selectedColor]}",
            is_upper: ${korToEng[selectedIsUpper]},
            season: "${korToEng[selectedSeason]}",
            state: true
          }
        ) {
          affected_rows
        }
      }
      
    `,
    };
    console.log(graphqlQuery);
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(graphqlQuery),
    });

    const data = await response.json();
    console.log(data);
    navigate("/closet");
  };

  return (
    <PageContent>
      <form onSubmit={handleSubmit}>
        <h1>옷 추가하기</h1>
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
        <Button type="submit">확인</Button>
      </form>
    </PageContent>
  );
};

export default NewClothesPage;

export const action = () => {};
