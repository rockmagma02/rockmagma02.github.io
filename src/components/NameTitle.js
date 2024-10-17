import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  text-align: center;
  margin: 0;
  margin-top: 100px;
  padding: 20px 0 0 0;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1.2em;
  color: #666;
`;

const NameTitle = () => {
  return (
    <TitleContainer>
      <Title>Ruiyang (Ryan) Sun</Title>
      <Subtitle>Peking University; AI Researcher</Subtitle>
    </TitleContainer>
  );
};

export default NameTitle;
