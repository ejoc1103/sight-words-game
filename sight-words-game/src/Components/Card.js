import React, { useContext } from 'react';
import ReactCardFlip from 'react-card-flip';
import bluey from '../images/bluey.jfif';
import bingo from '../images/bingo.png';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardStyled = styled.button`
  width: 150px;
  height: 200px;
  border-radius: 20%;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  > h1 {
    word-break: break-all;
  }
  @media (max-width: 760px) {
    width: ${({ level }) => {
      return level === '20' ? '120px' : '150px';
    }};
    height: ${({ level }) => {
      return level === '20' ? '170px' : '200px';
    }};
  }
  @media (max-width: 620px) {
    width: ${({ level }) => {
      return level === '20' ? '90px' : '120px';
    }};
    height: ${({ level }) => {
      return level === '20' ? '140px' : '170px';
    }};
  }
  @media (max-width: 495px) {
    width: ${({ level }) => {
      return level === '20' ? '60px' : '90px';
    }};
    height: ${({ level }) => {
      return level === '20' ? '110px' : '140px';
    }};
  }
`;

const MatchedCardStyled = styled.div`
  width: 150px;
  height: 200px;
  border-radius: 20%;
  @media (max-width: 625px) {
    width: 100px;
    height: 150px;
  }
  @media (max-width: 760px) {
    width: ${({ level }) => {
      return level === '20' ? '120px' : '150px';
    }};
    height: ${({ level }) => {
      return level === '20' ? '170px' : '200px';
    }};
  }
  @media (max-width: 620px) {
    width: ${({ level }) => {
      return level === '20' ? '90px' : '120px';
    }};
    height: ${({ level }) => {
      return level === '20' ? '140px' : '170px';
    }};
  }
  @media (max-width: 495px) {
    width: ${({ level }) => {
      return level === '20' ? '60px' : '90px';
    }};
    height: ${({ level }) => {
      return level === '20' ? '110px' : '140px';
    }};
  }
`;

const ImageStyled = styled.img`
  width: 95%;
  height: 95%;
  border-radius: 20%;
  align-self: center;
  justify-self: center;
`;

const Card = ({ word, matched, handleClick, index, isFlipped, level }) => {
  const theme = useContext(ThemeContext);

  let msg = new SpeechSynthesisUtterance('');
  let pic = bluey;
  if (theme.id !== 'bluey') {
    pic = bingo;
  }

  const clickSound = word => {
    msg.text = `${word}`;
    speechSynthesis.speak(msg);
  };
  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      {/* front of card */}
      <CardStyled onClick={handleClick} level={level}>
        {/* for testing */}
        {/* <h1>{word}</h1> */}
        <ImageStyled src={pic} alt='bluey or bingo' />
      </CardStyled>
      {/* back of card */}
      {matched.includes(index) ? (
        <MatchedCardStyled level={level} onClick={() => clickSound(word)}>
          <h1>{word}</h1>

          <FontAwesomeIcon icon={faVolumeHigh} />
        </MatchedCardStyled>
      ) : (
        <CardStyled level={level} onClick={() => clickSound(word)}>
          <h1>{word}</h1>

          <FontAwesomeIcon icon={faVolumeHigh} />
        </CardStyled>
      )}
    </ReactCardFlip>
  );
};

export default Card;
