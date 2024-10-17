import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inconsolata', monospace;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.tintColor};
    text-decoration: none;
    transition: color 0.3s ease;

    &:visited {
      color: ${({ theme }) => theme.tintColor};
    }

    &:hover {
      color: ${({ theme }) => theme.tintColor};
    }

    &:active {
      color: ${({ theme }) => theme.tintColor};
    }
  }
`;

export default GlobalStyle;
