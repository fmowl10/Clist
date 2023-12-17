import { useState } from "react";

import PageContent from "../components/PageContent";
import Button from "../UI/Button";
import Logo from "../components/Logo";
import Input from "../UI/Input";
import Dropdown from "../UI/Dropdown";
import locations from "../util/locations";
import fetchData from "../util/fetchData";
import { getAuthServerEndpoint, getAuthToken } from "../util/auth";
import { useNavigate } from "react-router-dom";
import korToEng from "../util/korToEng";

const SignupPage = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

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
    const path = getAuthServerEndpoint();
    const responseData = await fetchData(path + "signup", {
      user_id: inputId,
      password: inputPw,
      location: korToEng[selectedLocation],
    });
    if (responseData.msg == "ok") {
      alert("가입에 성공하였습니다.");
      navigate("/login");
    }
    if (responseData.msg == "user exist") {
      alert("이미 존재하는 아이디입니다.");
    }
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
