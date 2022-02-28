import React, { useContext } from 'react';
import ReactCardFlip from 'react-card-flip';
import bluey from '../images/bluey.jfif';
import bingo from '../images/bingo.png';
import { ThemeContext } from 'styled-components';
//TODO: Pic of bluey or Pic of Bingo
//TODO: Can you say this word? yes or no

import styled from 'styled-components';

const CardStyled = styled.button`
  width: 150px;
  height: 200px;
  border-radius: 20%;
  background-color: #d8d2cb;
`;

const MatchedCardStyled = styled.div`
  width: 150px;
  height: 200px;
  border-radius: 20%;
  background-color: #d8d2cb;
`;

const ImageStyled = styled.img`
  width: 95%;
  height: 95%;
  border-radius: 20%;
  align-self: center;
  justify-self: center;
`;

const Card = ({ word, id, matched, handleClick, index, isFlipped }) => {
  const theme = useContext(ThemeContext);
  let pic = bluey;
  if (theme.id !== 'bluey') {
    pic = bingo;
  }
  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      {/* front of card */}
      <CardStyled onClick={handleClick}>
        {/* for testing */}
        {/* <h1>{word}</h1> */}
        <ImageStyled src={pic} alt='bluey or bingo' />
      </CardStyled>
      {/* back of card */}
      {matched.includes(index) ? (
        <MatchedCardStyled>
          <h1>{word}</h1>
        </MatchedCardStyled>
      ) : (
        <CardStyled>
          <h1>{word}</h1>
        </CardStyled>
      )}
    </ReactCardFlip>
  );
};

export default Card;
