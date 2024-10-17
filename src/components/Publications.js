import React, { useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PublicationContainer = styled.div`
  margin-top: 20px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const PublicationItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  position: relative;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PublicationImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const PublicationDetails = styled.div`
  flex: 1;
`;

const Title = styled.a`
  font-weight: bold;
  font-size: 1.2em;
  color: ${({ theme }) => theme.tintColor};
  text-decoration: none;
`;

const Authors = styled.p`
  margin: 5px 0;
`;

const Journal = styled.p`
  margin: 5px 0;
  font-style: italic;
`;

const Comment = styled.p`
  color: red;
  margin: 5px 0;
`;

const Button = styled.a`
  background-color: ${({ theme }) => theme.tintColor};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 0.9em;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e06b5a;
  }

  &:visited {
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const AbstractPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  background-color: ${({ theme }) => theme.popupBackgroundColor};
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 80%;
  overflow-y: auto;
  color: ${({ theme }) => theme.textColor};
  border-radius: 15px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const PopupTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5em;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #e06b5a;
  }
`;

const YearTag = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  background-color: ${({ theme }) => theme.tintColor};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;

  @media (max-width: 600px) {
    position: static;
    margin-bottom: 5px;
  }
`;

const Notification = styled.div.attrs(({ isVisible, ...rest }) => ({
  style: {
    opacity: isVisible ? 1 : 0,
  },
  ...rest, // Spread the rest of the props to ensure they are passed correctly
}))`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.tintColor};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease;
  z-index: 200;
`;

const Publications = () => {
  const data = useStaticQuery(graphql`
    {
      allYaml {
        nodes {
          publications {
            title
            authors
            year
            link
            image
            journal
            comment
            abstract
            optional {
              PDF
              Code
              Website
              Slides
              Dataset
              Model
              OpenReview
              HuggingFace
              Supplemental
            }
            bibtex
          }
        }
      }
    }
  `);

  const publications = data.allYaml.nodes.reduce((acc, node) => {
    if (node.publications) {
      acc.push(...node.publications);
    }
    return acc;
  }, []);

  const [showAbstract, setShowAbstract] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleAbstractClick = (index) => {
    setShowAbstract(showAbstract === index ? null : index);
  };

  const handleCiteClick = (bibtex) => {
    navigator.clipboard.writeText(bibtex).then(() => {
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 1000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <PublicationContainer>
      <h2>Selected Publications</h2>
      {publications.length > 0 ? (
        publications.map((pub, index) => (
          <PublicationItem key={index}>
            {pub.year && <YearTag>{pub.year}</YearTag>} {/* Add YearTag */}
            {pub.image && <PublicationImage src={pub.image} alt={pub.title} />}
            <PublicationDetails>
              <Title href={pub.link} target="_blank" rel="noopener noreferrer">
                {pub.title}
              </Title>
              {pub.comment && <Comment>{pub.comment}</Comment>}
              <Authors>{pub.authors}</Authors>
              {pub.journal && <Journal>{pub.journal}</Journal>}
              <ButtonContainer>
                <Button onClick={() => handleAbstractClick(index)}>
                  Abstract
                </Button>
                <Button onClick={() => handleCiteClick(pub.bibtex)}>
                  Cite
                </Button>
                {pub.optional && Object.entries(pub.optional).map(([key, value]) => (
                  value && (
                    <Button key={key} href={value} target="_blank" rel="noopener noreferrer">
                      {key}
                    </Button>
                  )
                ))}
              </ButtonContainer>
              {showAbstract === index && (
                <AbstractPopup>
                  <PopupHeader>
                    <PopupTitle>Abstract</PopupTitle>
                    <CloseButton onClick={() => setShowAbstract(null)}>
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </CloseButton>
                  </PopupHeader>
                  <h3>{pub.title}</h3>
                  <p>{pub.abstract}</p>
                </AbstractPopup>
              )}
            </PublicationDetails>
          </PublicationItem>
        ))
      ) : (
        <p>No publications available.</p>
      )}
      <Notification isVisible={notificationVisible}>
        BibTeX citation copied to clipboard!
      </Notification>
    </PublicationContainer>
  );
};

export default Publications;
