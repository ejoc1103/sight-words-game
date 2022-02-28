import React, { useState } from 'react';
import Board from './Components/Board';
import BlueyTheme from './themes/bluey';
import BingoTheme from './themes/bingo';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
}

body {
  background-color: ${({ theme }) => theme.background};
  font-family: 'Permanent Marker', cursive;
}
`;

const FullStyled = styled.div`
  position: relative;
  min-height: 100vh;
`;

const FooterStyled = styled.div`
  background-color: ${({ theme }) => theme.third};
  padding: 20px 0 20px 0;
  font-size: 2em;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5em;
  color: ${({ theme }) => theme.primary};
`;

function App() {
  const [theme, setTheme] = useState(BlueyTheme);
  const [start, setStart] = useState(false);
  const [pickWords, setPickWords] = useState(false);
  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme(prev => (prev.id === 'bluey' ? BingoTheme : BlueyTheme));
        },
      }}
    >
      <GlobalStyle />
      <FullStyled>
        <Board
          start={start}
          setStart={setStart}
          pickWords={pickWords}
          setPickWords={setPickWords}
        />

        <FooterStyled>Footer</FooterStyled>
      </FullStyled>
    </ThemeProvider>
  );
}

export default App;
