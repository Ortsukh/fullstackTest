import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from "dayjs";
const noImage = require('../assets/no-image.png');

interface UserData {
    name: string;
    gender: string;
    dateOfBirth: string;
    profilePicture: string;
}

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        gender: '',
        dateOfBirth: '',
        profilePicture: '',
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        // Fetch current user data
        axios.get('http://localhost:5000/api/users/profile',{
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                const { name, profilePicture, dateOfBirth, gender } = response.data;
                setUserData({ name, profilePicture, dateOfBirth, gender });
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);

    const handleEditProfile = () => {
        navigate('/edit');
    };

    const handleLogOut = () => {
        localStorage.removeItem('authToken')
        navigate('/');
    };
    const usersProfilePicturePath = userData.profilePicture ? "http://localhost:5000/uploads/" + userData.profilePicture : noImage;

    return (
        <ProfileContainer>
            <h1>Your Profile</h1>
            <ProfileContent>
                <ProfilePicture>
                    <img src={usersProfilePicturePath} alt="Profile Picture" />
                </ProfilePicture>
                <ProfileInfo>
                    <p>Name: {userData.name}</p>
                    <p>Gender: {userData.gender}</p>
                    <p>Date of Birth: {dayjs(userData.dateOfBirth).format("DD-MM-YYYY")}</p>
                    <ProfileActions>
                        <EditButton onClick={handleEditProfile}>Edit Profile</EditButton>
                        <LogoutButton onClick={handleLogOut}>Logout</LogoutButton>
                    </ProfileActions>
                </ProfileInfo>
            </ProfileContent>
        </ProfileContainer>
    );
};

export default Profile;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
`;

const ProfileContent = styled.div`
    display: flex;
    align-items: center;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
`;

const ProfilePicture = styled.div`
    margin-right: 2rem;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const ProfileInfo = styled.div`
    p {
        margin-bottom: 0.5rem;
    }
`;

const ProfileActions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const EditButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-left: 0.5rem;

    &:hover {
        background-color: #0056b3;
    }
`;

const LogoutButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-left: 0.5rem;

    &:hover {
        background-color: #0056b3;
    }
`;