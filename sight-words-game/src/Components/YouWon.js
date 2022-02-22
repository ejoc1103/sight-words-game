import React from 'react';

import styled from 'styled-components';

const MainStyled = styled.div`
  display: grid;
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
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const WinnerBannerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: gold;
  justify-self: center;
  text-align: center;
  justify-content: center;
  width: 60%;
  grid-gap: 5px;
  padding: 20px;
  > button {
    width: 50%;
    text-align: center;
    justify-self: center;
  }
`;

const CardStyled = styled.button`
  width: 150px;
  height: 200px;
  border-radius: 20%;
  background-color: #d8d2cb;
`;
// adding for git purposes

const YouWon = ({ resetGame, clickCount, collection }) => {
  console.log(collection);
  return (
    <MainStyled>
      <WinnerBannerStyled>
        <h1>You Won!</h1>
        <h2>{`You did it in ${clickCount} attempts`}</h2>
        <button onClick={() => resetGame()}>Play Again</button>
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
