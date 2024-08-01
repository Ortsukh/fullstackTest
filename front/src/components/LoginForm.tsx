import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('send');
        axios.post('http://localhost:5000/api/users/login', formData)
            .then(response => {
                console.log('UserModel logged in:', response.data);
                localStorage.setItem('authToken', response.data.token);
                navigate("/account");
            })
            .catch(error => {
                console.error('There was an error logging in the user!', error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <SubmitButton type="submit">Login</SubmitButton>
        </Form>
    );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default LoginForm;