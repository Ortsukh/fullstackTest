import React, { useState, useEffect, useContext } from "react";
import axios, {AxiosError} from "axios";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import Spinner from "./spinner/Spinner";
import { useNavigate } from "react-router-dom";

const EditProfileForm: React.FC = () => {
  const { token, setErrorMessage, setErrorContext } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(!token);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profilePicture: null as File | null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
        const { name } = response.data;
        setFormData((prevState) => ({
          ...prevState,
          name,
        }));
      } catch (error) {
        setIsLoading(false);
        const err = error as AxiosError<{message: string}>;
        const message = (err?.response?.data?.hasOwnProperty('message')) ? (err.response.data['message']) : (err['message'])
        setErrorMessage(message);
        setErrorContext("An error occurred while submitting the form");
        console.error("There was an error fetching the user data!", error);
      }
    };
    fetchUserData();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "profilePicture") {
        data.append(key, formData[key as keyof typeof formData] as File);
      } else {
        data.append(key, formData[key as keyof typeof formData] as string);
      }
    });
    setIsLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/account");
      setIsLoading(false);
      console.log("UserModel profile updated:", response.data);
    } catch (error) {
      const err = error as AxiosError<{message: string}>;
      const message = (err?.response?.data?.hasOwnProperty('message')) ? (err.response.data['message']) : (err['message'])
      setErrorMessage(message);
      setErrorContext("An error occurred while submitting the form");
      setIsLoading(false);
      console.error("There was an error updating the user profile!", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Spinner isLoading={isLoading} />
      <InputField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New Password"
        required
      />
      <InputField
        type="file"
        name="profilePicture"
        onChange={handleFileChange}
      />
      <SubmitButton type="submit">Update Profile</SubmitButton>
    </FormContainer>
  );
};

export default EditProfileForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputField = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
