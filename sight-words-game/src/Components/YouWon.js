import React from 'react';
import styled from 'styled-components';

const MainStyled = styled.div`
  display: grid;
  justify-self: center;
  justify-content: center;
`;

const PageStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 80%;
  justify-self: center;
  text-align: center;
  justify-content: center;
`;

const WinnerBannerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.third};
  color: ${({ theme }) => theme.text};
  justify-self: center;
  text-align: center;
  justify-content: center;
  width: 60%;
  grid-gap: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PlayAgainStyled = styled.button`
  width: 50%;
  background-color: ${({ theme }) => theme.secondary};
  font-size: 1.5em;
  color: ${({ theme }) => theme.text};
  border-radius: 30%;
  padding: 5px;
  text-align: center;
  justify-self: center;
`;

const KeepPickedWordsStyled = styled.button`
  display: ${({ keepSwitch }) => {
    return keepSwitch ? 'grid' : 'none';
  }};
  width: 80%;
  background-color: ${({ theme }) => theme.secondary};
  font-size: 1.5em;
  color: ${({ theme }) => theme.text};
  border-radius: 30%;
  padding: 5px;
  text-align: center;
  justify-self: center;
`;

const CardStyled = styled.button`
  width: 150px;
  height: 200px;
  border-radius: 20%;
  justify-self: center;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    grid-column: span 3;
  }
`;

const YouWon = ({
  resetGame,
  clickCount,
  collection,
  setPickedWords,
  setKeepSwitch,
  keepSwitch,
}) => {
  const handleClick = () => {
    resetGame();
  };
  const handleKeepWords = () => {
    setKeepSwitch(false);
    setPickedWords([]);
  };

  return (
    <MainStyled>
      <WinnerBannerStyled>
        <h1>You Won!</h1>
        <h2>{`You did it in ${clickCount} attempts`}</h2>
        <PlayAgainStyled onClick={() => handleClick()}>
          {keepSwitch ? 'Play Again' : 'Retrun To Home Page'}
        </PlayAgainStyled>
        <KeepPickedWordsStyled
          keepSwitch={keepSwitch}
          onClick={() => handleKeepWords()}
        >
          Erase Selected Practice Words
        </KeepPickedWordsStyled>
      </WinnerBannerStyled>

      <PageStyled>
        {collection.map((word, index) => (
          <CardStyled key={index}>
            <h1>{word}</h1>
          </CardStyled>
        ))}
      </PageStyled>
    </MainStyled>
  );
};

export default YouWon;
