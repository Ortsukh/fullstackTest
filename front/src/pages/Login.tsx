import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeContent>
        <Title>Login Page</Title>
        <Tabs>
          <TabLink to="/register">Registration</TabLink>
        </Tabs>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </HomeContent>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const HomeContent = styled.div`
  background-color: #fff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TabLink = styled(Link)`
  display: block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  color: #333;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;

  &.active {
    border-color: #4caf50;
  }

  &:hover {
    border-color: #4caf50;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;
