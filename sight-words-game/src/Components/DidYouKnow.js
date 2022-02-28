import React from 'react';
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
export default function DidYouKnow({ collection, i, iCount }) {
  return (
    <DidYouKnowStyled>
      <QuestionStyled>Did you know this word?</QuestionStyled>
      <WordStyled>{collection[i]}</WordStyled>
      {/* <button>Hear The Word?</button> */}
      <div></div>
      <button onClick={() => iCount(i)}>Next Word</button>
    </DidYouKnowStyled>
  );
}
