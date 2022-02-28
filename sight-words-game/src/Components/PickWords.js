import React, { useState } from 'react';
import styled from 'styled-components';
import { wordBank, minecraft } from '../utils/wordBank';

const PickedWordsStyled = styled.div`
  display: grid;
  grid-column: span 4;
  gap: 10px;
  grid-template-columns: ${({ bankId }) => {
    return bankId === 'minecraft' ? `repeat(6, 1fr)` : `repeat(8, 1fr)`;
  }};
  @media (max-width: 875px) {
    grid-template-columns: ${({ bankId }) => {
      return bankId === 'minecraft' ? `repeat(3, 1fr)` : `repeat(8, 1fr)`;
    }};
  }
  @media (max-width: 700px) {
    grid-template-columns: ${({ bankId }) => {
      return bankId === 'minecraft' ? `repeat(3, 1fr)` : `repeat(4, 1fr)`;
    }};
  }
`;
const ChooseSightWordsStyled = styled.button`
  display: grid;
  margin: 10px 0 10px 0;
  grid-column: ${({ bankId }) => {
    return bankId === 'minecraft' ? `span 3` : `span 4`;
  }};
  padding: 10px;
  align-content: center;
  font-size: 1.5em;
  background-color: ${({ bankId, theme }) => {
    return bankId === 'minecraft' ? `${theme.third}` : `${theme.secondary}`;
  }};
  color: ${({ theme }) => theme.text};
  font-weight: 800;
`;
const ChooseMinecraftStyled = styled.button`
  display: grid;
  margin: 10px 0 10px 0;
  grid-column: ${({ bankId }) => {
    return bankId === 'minecraft' ? `span 3` : `span 4`;
  }};
  padding: 10px;
  align-content: center;
  font-size: 1.5em;
  background-color: ${({ bankId, theme }) => {
    return bankId === 'minecraft' ? `${theme.secondary}` : `${theme.third}`;
  }};
  color: ${({ theme }) => theme.text};
  font-weight: 800;
`;
const ChooseStyled = styled.h2`
  grid-column: span 8;
  text-align: center;
  margin: 10px 0 10px 0;
  background-color: ${({ theme }) => theme.third};
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border: 3px solid ${({ theme }) => theme.text};
`;

const StartGameStyled = styled.button`
  display: grid;
  grid-column: span 8;
  margin: 10px 0 10px 0;
  padding: 10px;
  align-content: center;
  font-size: 1.5em;
  background-color: ${({ theme }) => theme.third};
  color: ${({ theme }) => theme.text};
  font-weight: 800;
`;

const WordsStyled = styled.button`
  font-size: 1.5em;
  background-color: ${({ theme }) => theme.third};
  color: ${({ theme }) => theme.text};
  font-weight: 800;
  @media (max-width: 450px) {
    grid-column: ${({ bankId }) => {
      return bankId === 'minecraft' ? `span 3` : `span 1`;
    }};
  }
`;

export default function PickWords({
  setPickedWords,
  pickedWords,
  availableWords,
  setAvailableWords,
  setStart,
  setPickWords,
}) {
  const [bankId, setBankId] = useState('sight-words');
  const handleClick = currentWord => {
    let id = Math.floor(Math.random() * 65);
    let tempArr = [...pickedWords, { word: currentWord, id }];

    setPickedWords(tempArr);
    setAvailableWords(prevState => {
      console.log(currentWord);
      return prevState.filter(word => word !== currentWord);
    });
  };

  const handleClick2 = id => {
    console.log(id + '    ' + bankId);
    if (id === 'sight-words') {
      setAvailableWords(wordBank);
      setBankId('sight-words');
    } else {
      setAvailableWords(minecraft);
      setBankId('minecraft');
    }
  };

  const startGame = () => {
    setStart(true);
    setPickWords(false);
  };

  return (
    <>
      <ChooseStyled>Pick Your Wordbank</ChooseStyled>
      <StartGameStyled
        onClick={() => {
          startGame();
        }}
      >
        Start Game
      </StartGameStyled>
      <PickedWordsStyled bankId={bankId}>
        <ChooseSightWordsStyled
          onClick={() => handleClick2('sight-words')}
          bankId={bankId}
        >
          Sight Words
        </ChooseSightWordsStyled>
        <ChooseMinecraftStyled
          onClick={() => handleClick2('minecraft')}
          bankId={bankId}
        >
          Minecraft
        </ChooseMinecraftStyled>
        {availableWords.map((word, index) => (
          <WordsStyled
            bankId={bankId}
            key={index}
            onClick={() => handleClick(word)}
          >
            {word}
          </WordsStyled>
        ))}
      </PickedWordsStyled>
    </>
  );
}
