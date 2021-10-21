import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --cardBackground: ${({ theme }) => theme.cardBackground};
  --linkColor: ${({ theme }) => theme.linkColor};
  --cardbBorderColor: ${({ theme }) => theme.cardbBorderColor};
  --cardBoxShadow: ${({ theme }) => theme.cardBoxShadow};
  --prLink: ${({ theme }) => theme.prLink};
  --text: ${({ theme }) => theme.text};
}
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.5s ease-in;
  }
  `;

export default GlobalStyles;
