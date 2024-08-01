import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home: React.FC = () => {
  const token = localStorage.getItem("authToken");

  return (
    <HomeContainer>
      <HomeContent>
        <Title>Home Page</Title>
        {token ? (
          <Welcome>Welcome</Welcome>
        ) : (
          <LoginLink to="/login">Login</LoginLink>
        )}
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
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Welcome = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0;
  color: #4caf50;
`;

const LoginLink = styled(Link)`
  display: inline-block;
  background-color: #4caf50;
  color: #fff;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;
