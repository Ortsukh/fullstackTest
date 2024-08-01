import React, { FC } from "react";
import styled from "styled-components";

interface ErrorModalProps {
  error: string;
  onClose: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ error, onClose }) => {
  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </CloseButton>
        <h2>Error</h2>
        <p>{error}</p>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  position: relative;

  h2 {
    margin-top: 0;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    fill: #888;
  }
`;

export default ErrorModal;
