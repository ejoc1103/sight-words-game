import React, { useEffect, useState } from 'react';
import Winner from '../audio/winner.wav';
import styled from 'styled-components';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  > i {
    color: ${({ theme }) => theme.text};
  }
`;
const SelectStyled = styled.select`
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: ${({ theme }) => theme.third};
  font-size: 2em;
  padding: 10px;
  color: ${({ theme }) => theme.text};
`;
export default function DidYouKnow({ collection, i, iCount }) {
  const [practiceVoice, setPracticeVoice] = useState(
    'Microsoft Zira - English (United States)'
  );
  let synth = window.speechSynthesis;
  let voices = synth.getVoices();
  console.log(voices);
  let msg = new SpeechSynthesisUtterance('');

  const winnerAudio = new Audio(Winner);
  useEffect(() => {
    winnerAudio.play();
    speechSynthesis.speak(msg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickSound = word => {
    msg.text = `${word}`;
    console.log('hit');
    msg.voice = speechSynthesis.getVoices().filter(voice => {
      return voice.name === `${practiceVoice}`;
    })[0];
    console.log(voices.length);
    for (let j = 0; j < voices.length; j++) {
      console.log(voices[j].name);
      if (voices[j].name === `${practiceVoice}`) {
        msg.voice = voices[j];
      }
    }
    console.log(msg.voice);
    speechSynthesis.speak(msg);
  };
  const handleChange = e => {
    setPracticeVoice(`${e.target.value}`);
  };
  return (
    <DidYouKnowStyled>
      <QuestionStyled>Did you know this word?</QuestionStyled>
      <WordStyled>{collection[i]}</WordStyled>
      <HearWordStyled onClick={() => clickSound(collection[i])}>
        <FontAwesomeIcon icon={faVolumeHigh} />
      </HearWordStyled>

      <div>
        <label>Choose a voice:</label>
        <SelectStyled
          name='voice'
          id='voice'
          onChange={handleChange}
          value={practiceVoice}
        >
          <option value='Microsoft David - English (United States)'>
            David
          </option>
          <option value='Microsoft Mark - English (United States)'>Mark</option>
          <option value='Microsoft Zira - English (United States)'>Zira</option>
        </SelectStyled>
      </div>
      {i === 0 ? (
        <div></div>
      ) : (
        <button onClick={() => iCount(i, 'back')}>Last Word</button>
      )}
      <button onClick={() => iCount(i, 'next')}>Next Word</button>
    </DidYouKnowStyled>
  );
}
