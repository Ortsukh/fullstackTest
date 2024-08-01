import React from 'react';
import styled from 'styled-components';
import EditProfileForm from '../components/EditProfileForm';

const EditAccount: React.FC = () => {
    return (
        <EditAccountContainer>
            <EditAccountContent>
                <Title>Account Page</Title>
                <EditProfileForm />
            </EditAccountContent>
        </EditAccountContainer>
    );
};

export default EditAccount;

const EditAccountContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

const EditAccountContent = styled.div`
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