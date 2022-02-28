import React, { useState } from 'react';
import styled from 'styled-components';
import wordBank from '../utils/wordBank';

const PickedWordsStyled = styled.div`
  display: grid;
  grid-column: span 4;
  gap: 10px;
  grid-template-columns: repeat(8, 1fr);
  >button {
    font-size: 1.5em;
    background-color: ${({ theme }) => theme.third};
    color: ${({ theme }) => theme.text};
    font-weight: 800;
  }
`;

export default function PickWords({ setPickedWords, pickedWords }) {
  const [availableWords, setAvailableWords] = useState(wordBank);
  const handleClick = currentWord => {
    let id = Math.floor(Math.random() * 65);
    let tempArr = [...pickedWords, { word: currentWord, id }];

    setPickedWords(tempArr);
    setAvailableWords(prevState => {
      console.log(currentWord);
      return prevState.filter(word => word !== currentWord);
    });
  };

  console.log(availableWords);

  return (
    <PickedWordsStyled>
      {availableWords.map((word, index) => (
        <button key={index} onClick={() => handleClick(word)}>
          {word}
        </button>
      ))}
    </PickedWordsStyled>
  );
}
