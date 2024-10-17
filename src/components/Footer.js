import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  border-top: 1px solid ${({ theme }) => theme.tintColor};
  width: 100%;
  font-size: 0.8em;
  margin: 0;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <FooterContainer>
      © Copyright 2024-{currentYear} Ruiyang Sun & GPT-4o & Cursor AI. Last updated: {lastUpdated}.
    </FooterContainer>
  );
};

export default Footer;
