import { SignUpForm } from "Components/signUpForm/signUpForm";
import React, { FC } from "react";
import styled from "styled-components";

const SignUp: FC = () => (
  <Wrap>
    <SignUpForm />
  </Wrap>
);

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  background: #102250;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SignUp;
