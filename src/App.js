import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './Components/Board';
import BlueyTheme from './themes/bluey';
import BingoTheme from './themes/bingo';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Directions from './Components/Directions';
import Issues from './Components/Issues';
const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
}

body {
  background-color: ${({ theme }) => theme.background};
  font-family: 'Noto Sans', sans-serif;
}
`;

const FullStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  min-height: 100vh;
  justify-content: center;
  justify-items: center;
`;

const FooterStyled = styled.div`
  display: grid;
  background-color: ${({ theme }) => theme.third};
  padding: 20px 0 20px 0;
  font-size: 2em;
  justify-items: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 2.5rem;
  width: 100%;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 470px) {
    font-size: 1.5em;
  }
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
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <Board
                  start={start}
                  setStart={setStart}
                  pickWords={pickWords}
                  setPickWords={setPickWords}
                />
              }
            />

            <Route path='/directions' element={<Directions />} />
            <Route path='/issues' element={<Issues />} />
          </Routes>
        </Router>

        <FooterStyled>Created By Ed O'Connor</FooterStyled>
      </FullStyled>
    </ThemeProvider>
  );
}

export default App;
