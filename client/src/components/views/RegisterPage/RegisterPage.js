import React, { useState } from "react";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 같지 않습니다");
    }

    let body = {
      name: Name,
      email: Email,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label>닉네임</label>
        <input
          type="text"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>이메일</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
