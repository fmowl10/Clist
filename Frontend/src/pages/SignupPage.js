import { useState } from "react";

import PageContent from "../components/PageContent";
import Button from "../UI/Button";
import Logo from "../components/Logo";
import Input from "../UI/Input";
import Dropdown from "../UI/Dropdown";
import locations from "../util/locations";
import fetchData from "../util/fetchData";
import { getAuthToken } from "../util/auth";

const SignupPage = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleIdInputChange = (e) => {
    setInputId(e.target.value);
  };
  const handlePwInputChange = (e) => {
    setInputPw(e.target.value);
  };

  const handleLocationChange = (item) => {
    setSelectedLocation(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    try {
      const response = await fetch(`http://127.0.0.1:8080/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: inputId,
          password: inputPw,
          location: selectedLocation,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      var responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("error:", error);
    }

    console.log(inputId, inputPw, selectedLocation);
  };

  return (
    <PageContent>
      <Logo />
      <form onSubmit={handleSubmit} id="signup">
        <p>회원가입</p>
        <Input
          type="text"
          placeholder="아이디"
          onChange={handleIdInputChange}
          id="id"
        />
        <Input
          type="text"
          placeholder="비밀번호"
          onChange={handlePwInputChange}
          id="pw"
        />
        <Dropdown items={locations} onChange={handleLocationChange}>
          지역 선택하기
        </Dropdown>
        <Button type="submit">가입하기</Button>
      </form>
    </PageContent>
  );
};

export default SignupPage;

export const action = () => {};
