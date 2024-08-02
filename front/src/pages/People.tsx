import React, { useContext, useEffect, useState } from "react";
import axios, {AxiosError} from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import { AppContext } from "../AppContext";
import Spinner from "../components/spinner/Spinner";
import { getUserAge } from "../common/helper";

const noImage = require("../assets/no-image.png");

interface User {
  _id: string;
  name: string;
  dateOfBirth: string;
  profilePicture: string;
}

const People: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { token,setToken, setErrorMessage, setErrorContext } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(!token);

  useEffect(() => {
    setIsLoading(!token);
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/users/people", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        const err = error as AxiosError<{message: string}>;
        const message = (err?.response?.data?.hasOwnProperty('message')) ? (err.response.data['message']) : (error['message'])
        setErrorMessage(message);
        setErrorContext("There was an error fetching the user data!");
        if(error.response.status === 401) {
          localStorage.removeItem('authToken')
          setToken(null)
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const usersProfilePicturePath = (user: User) =>
    user.profilePicture
      ? "http://localhost:5000/uploads/" + user.profilePicture
      : noImage;

  return (
    <PeopleContainer>
      <Spinner isLoading={isLoading} />

      <h1>People Page</h1>
      <UsersList>
        {users.map((user) => (
          <UserCard key={user._id}>
            <UserImage
              src={usersProfilePicturePath(user)}
              alt={`${user.name}'s profile`}
            />
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserAge>Age: {getUserAge(user.dateOfBirth)}</UserAge>
            </UserInfo>
          </UserCard>
        ))}
      </UsersList>
    </PeopleContainer>
  );
};

export default People;

const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const UsersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  width: 100%;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  margin-bottom: 0.5rem;
`;

const UserAge = styled.p`
  margin: 0;
`;
