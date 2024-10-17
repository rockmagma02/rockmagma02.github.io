import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faGoogle, faLinkedin, faInstagram, faFacebook, faThreads } from '@fortawesome/free-brands-svg-icons';

const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.tintColor};
  color: white;
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e06b5a;
  }
`;

const Heading = styled.p`
  font-weight: bold;
  margin: 10px 0 5px;
`;

const Contact = () => {
  const data = useStaticQuery(graphql`
    {
      allYaml {
        nodes {
          email {
            link
            text
          }
          facetime {
            text
          }
          work {
            label
            link
          }
          personal {
            label
            link
          }
        }
      }
    }
  `);

  // const contact = data.allYaml.nodes[0];
  const email = data.allYaml.nodes.reduce((acc, node) => {
    if (node.email) {
      acc.push(...node.email);
    }
    return acc;
  }, []);
  const facetime = data.allYaml.nodes.reduce((acc, node) => {
    if (node.facetime) {
      acc.push(...node.facetime);
    }
    return acc;
  }, []);
  const work = data.allYaml.nodes.reduce((acc, node) => {
    if (node.work) {
      acc.push(...node.work);
    }
    return acc;
  }, []);
  const personal = data.allYaml.nodes.reduce((acc, node) => {
    if (node.personal) {
      acc.push(...node.personal);
    }
    return acc;
  }, []);

  return (
    <ContactContainer>
      <ContactItem>
        <Button href={email[0].link}>
          <FontAwesomeIcon icon={faEnvelope} />
        </Button>
        <p>
          <a
            href={email[0].link}
            style={{
              fontSize: '1.2em',
              color: 'inherit',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.target.style.color = '#e06b5a'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            : {email[0].text}
          </a>
        </p>
      </ContactItem>
      <ContactItem>
        <Button>
          <FontAwesomeIcon icon={faPhone} />
        </Button> <p style={{ fontSize: '1.2em' }}>: {facetime[0].text} </p>
      </ContactItem>
      <Heading>For Work or Collaboration:</Heading>
      <ContactItem>
        {work.map((item, index) => (
          <Button key={index} href={item.link}>
            <FontAwesomeIcon icon={
              item.label === "GitHub" ? faGithub :
                item.label === "X (formerly Twitter)" ? faTwitter :
                  item.label === "Google Scholar" ? faGoogle :
                    item.label === "LinkedIn" ? faLinkedin : null
            } />
          </Button>
        ))}
      </ContactItem>
      <Heading>Personal Life and 🐶 Adorable Puppy:</Heading>
      <ContactItem>
        {personal.map((item, index) => (
          <Button key={index} href={item.link}>
            <FontAwesomeIcon icon={
              item.label === "Instagram" ? faInstagram :
                item.label === "Facebook" ? faFacebook :
                  item.label === "Threads" ? faThreads : null
            } />
          </Button>
        ))}
      </ContactItem>
    </ContactContainer>
  );
};

export default Contact;
