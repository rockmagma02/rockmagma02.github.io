import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';
import { useStaticQuery, graphql } from 'gatsby';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.tintColor};
  transition: background-color 0.3s ease, color 0.3s ease;
  z-index: 1000;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5em;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    display: ${({ menuOpen }) => (menuOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 50px;
    right: 20px;
    background-color: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.tintColor};
    padding: 10px;
    z-index: 1001;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: ${({ menuOpen }) => (menuOpen ? 'scale(1)' : 'scale(0.95)')};
    opacity: ${({ menuOpen }) => (menuOpen ? '1' : '0')};
  }
`;

const Link = styled.a`
  margin-right: 15px;
  color: ${({ theme }) => theme.tintColor};
  text-decoration: none;
  font-size: 1em;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 5px 0;

  &:hover {
    color: ${({ theme }) => theme.textColor};
    transform: translateY(-2px);
  }
`;

const ThemeSwitchButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.tintColor};
  cursor: pointer;
  font-size: 1.5em;
  transition: color 0.3s ease;
  padding: 5px 10px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.tintColor};
  cursor: pointer;
  font-size: 1.5em;
  transition: color 0.3s ease;
  padding: 5px 10px;

  @media (min-width: 601px) {
    display: none;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: ${({ theme }) => theme.tintColor};
  width: ${({ progress }) => progress}%;
  transition: width 0.1s ease;
`;

const TopHeader = ({ isDarkMode, toggleTheme }) => {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const data = useStaticQuery(graphql`
        query {
            allYaml {
                nodes {
                    links {
                        label
                        url
                    }
                }
            }
        }
    `);

  const links = data.allYaml.nodes.reduce((acc, node) => {
    if (node.links) {
      acc.push(...node.links);
    }
    return acc;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.menu-container')) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <HeaderContainer>
      <Title>Ruiyang's Homepage</Title>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LinksContainer className="menu-container" menuOpen={menuOpen}>
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              {link.label}
            </Link>
          ))}
        </LinksContainer>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </MenuButton>
        <ThemeSwitchButton onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </ThemeSwitchButton>
      </div>
      <ProgressBar progress={progress} />
    </HeaderContainer>
  );
};

export default TopHeader;
