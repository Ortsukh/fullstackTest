import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';



const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        profilePicture: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData((prevState) => ({
                ...prevState,
                profilePicture: files[0],
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'profilePicture') {
                data.append(key, formData[key as keyof typeof formData] as File);
            } else {
                data.append(key, formData[key as keyof typeof formData] as string);
            }
        });

        axios
            .post('http://localhost:5000/api/users/register', data)
            .then((response) => {
                console.log('UserModel registered:', response.data);
                localStorage.setItem('authToken', response.data.token);
                navigate('/account');
            })
            .catch((error) => {
                console.error('There was an error registering the user!', error);
            });
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <select name="gender" value={formData.gender} onChange={handleChange} required style={{width: "100%"}}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="file" name="profilePicture" onChange={handleFileChange} required />
            <button type="submit">Register</button>
        </StyledForm>
    );
};
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  input,
  select {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1.1rem;
    font-family: 'Helvetica Neue', sans-serif;
    color: #333;
  }
  select {
    width: 108%;
  }
  button {
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-family: 'Helvetica Neue', sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
export default RegistrationForm;