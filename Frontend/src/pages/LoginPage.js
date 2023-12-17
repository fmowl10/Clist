import { useState } from "react";

import PageContent from "../components/PageContent";
import Logo from "../components/Logo";
import Button from "../UI/Button";
import Input from "../UI/Input";
import fetchData from "../util/fetchData";
import { getAuthServerEndpoint } from "../util/auth";

const LoginPage = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleIdInputChange = (e) => {
    setInputId(e.target.value);
  };
  const handlePwInputChange = (e) => {
    setInputPw(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = getAuthServerEndpoint();
    const responseData = await fetchData(path + "signin", {
      user_id: inputId,
      password: inputPw,
    });
    console.log(responseData);
    console.log(inputId, inputPw);
  };

  // fetchData();

  return (
    <PageContent>
      <Logo />
      <p>로그인</p>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit">로그인하기</Button>
      </form>
    </PageContent>
  );
};

export default LoginPage;

export const action = () => {};
