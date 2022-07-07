import styled from 'styled-components';
import Head from 'next/head';
import { WhatsApp } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import { auth, provider } from '../firebase';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo>
          <WhatsApp />
        </Logo>
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  padding: 100px;
  flex-direction: column;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.div`
  svg {
    color: #20c340;
    height: 200px;
    width: 200px;
  }
`;
