import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dayjs from "dayjs";

const noImage = require('../assets/no-image.png');

interface User {
    _id: string;
    name: string;
    dateOfBirth: number;
    profilePicture: string;
}

const People: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/people', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const usersProfilePicturePath = (user: User) => user.profilePicture ? "http://localhost:5000/uploads/" + user.profilePicture : noImage;
    const getUserAge = (user: User) => {
        const date1 = dayjs(user.dateOfBirth);
        const date2 = dayjs();
        return date2.diff(date1, 'year');
    }

    return (
        <PeopleContainer>
            <h1>People Page</h1>
            <UsersList>
                {users.map(user => (
                    <UserCard key={user._id}>
                        <UserImage src={usersProfilePicturePath(user)} alt={`${user.name}'s profile`}/>
                        <UserInfo>
                            <UserName>{user.name}</UserName>
                            <UserAge>Age: {getUserAge(user)}</UserAge>
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