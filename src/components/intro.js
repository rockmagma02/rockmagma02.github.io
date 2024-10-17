import React from 'react';
import styled from 'styled-components';
import Contact from './Contact';
import { useStaticQuery, graphql } from 'gatsby';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px 20px 20px;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
`;

const RightColumn = styled.div`
  flex: 2;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 0;
`;

const Avatar = styled.img`
  max-width: 200px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const Intro = () => {
  const data = useStaticQuery(graphql`
    query {
      introduction: markdownRemark(fileAbsolutePath: { regex: "/introduction.md/" }) {
        html
      }
    }
  `);

  return (
    <HeaderContainer>
      <LeftColumn>
        <Avatar src="avatar.png" alt="Avatar" />
        <Contact />
      </LeftColumn>
      <RightColumn>
        <div dangerouslySetInnerHTML={{ __html: data.introduction.html }} />
      </RightColumn>
    </HeaderContainer>
  );
};

export default Intro;
