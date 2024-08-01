import React from "react";
import styled from "styled-components";
import RegistrationForm from "../components/RegistrationForm";
import { Link } from "react-router-dom";

const Registration: React.FC = () => {
  return (
    <RegistrationContainer>
      <RegistrationContent>
        <Title>Registration Page</Title>
        <RegistrationForm />
        <LoginLink to="/login">I have an account</LoginLink>
      </RegistrationContent>
    </RegistrationContainer>
  );
};

export default Registration;

const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const RegistrationContent = styled.div`
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

const LoginLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  text-align: center;
  color: #4caf50;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }
`;
