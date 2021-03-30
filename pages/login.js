import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";

import { auth, provider } from "../firebase";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  max-height: 200px;
  max-width: 200px;
  margin-bottom: 20px;
`;

const Login = () => {
  const signInUser = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login Page</title>
      </Head>
      <LoginContainer>
        <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button onClick={signInUser} variant="outlined">
          Sign in with google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;
