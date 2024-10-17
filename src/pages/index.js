import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Intro from '../components/intro';
import GlobalStyle from '../styles/globalStyles';
import { lightTheme, darkTheme } from '../styles/theme';
import NameTitle from '../components/NameTitle';
import TopHeader from '../components/topHeader';
import Publications from '../components/Publications';
import Footer from '../components/Footer';

const IndexPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <TopHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div>
        <NameTitle />
        <Intro />
        <Publications />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default IndexPage;
