import React, { useEffect, useState } from 'react';
import Winner from '../audio/winner.wav';
import styled from 'styled-components';
const DidYouKnowStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px;
  grid-column: span 8;
  justify-self: center;
  justify-content: center;
  align-content: center;
  gap: 20px;
  > button {
    display: grid;
    justify-content: center;
    align-content: center;
    background-color: ${({ theme }) => theme.third};
    font-size: 2em;
    padding: 10px;
    color: ${({ theme }) => theme.text};
  }
`;
const QuestionStyled = styled.h2`
  font-size: 2em;
  grid-column: span 2;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
const WordStyled = styled.h2`
  font-size: 2em;
  grid-column: span 2;
  text-align: center;
  background-color: ${({ theme }) => theme.primary};
  padding: 5px;
  color: ${({ theme }) => theme.text};
`;
const HearWordStyled = styled.button`
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: ${({ theme }) => theme.third};
  font-size: 2em;
  padding: 10px;
  color: ${({ theme }) => theme.text};
`;
const SelectStyled = styled.select`
  grid-column: span 2;
`;
export default function DidYouKnow({ collection, i, iCount }) {
  const [practiceVoice, setPracticeVoice] = useState(
    'Microsoft Zira - English (United States)'
  );
  let msg = new SpeechSynthesisUtterance('');

  const winnerAudio = new Audio(Winner);
  useEffect(() => {
    winnerAudio.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickSound = word => {
    msg = new SpeechSynthesisUtterance(`${word}`);
    msg.voice = speechSynthesis.getVoices().filter(voice => {
      return voice.name === `${practiceVoice}`;
    })[0];
    speechSynthesis.speak(msg);
  };
  const handleChange = e => {
    setPracticeVoice(`${e.target.value}`);
  };
  return (
    <DidYouKnowStyled>
      <QuestionStyled>Did you know this word?</QuestionStyled>
      <WordStyled>{collection[i]}</WordStyled>
      <label>Choose a voice:</label>
      <SelectStyled
        name='voice'
        id='voice'
        onChange={handleChange}
        value={practiceVoice}
      >
        <option value='Microsoft David - English (United States)'>David</option>
        <option value='Microsoft Mark - English (United States)'>Mark</option>
        <option value='Microsoft Zira - English (United States)'>Zira</option>
      </SelectStyled>
      <HearWordStyled onClick={() => clickSound(collection[i])}>
        Hear The Word?
      </HearWordStyled>
      <div></div>
      <button onClick={() => iCount(i)}>Next Word</button>
    </DidYouKnowStyled>
  );
}
