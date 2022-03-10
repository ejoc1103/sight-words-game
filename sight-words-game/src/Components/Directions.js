import React from 'react';
import Nav from './Utilities/Nav';
import styled from 'styled-components';

const PageStyled = styled.div`
  display: grid;
  justify-items: center;
  width: 80%;
  text-align: center;
  padding-bottom: 7rem;
  > h1 {
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-size: 5em;
    font-weight: 600;
  }
  > h2 {
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-size: 2.5em;
  }
  > p {
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-size: 2em;
  }
  > hr {
    width: 80%;
    border: 2px solid ${({ theme }) => theme.text};
    border-radius: 50%;
    margin: 20px;
  }
`;

const Directions = () => {
  return (
    <PageStyled>
      <h1>Directions</h1>
      <hr />
      <Nav />
      <hr />
      <h2>What this is</h2>
      <p>
        A match game to practice sight words with a theme from the show Bluey.
      </p>
      <hr />
      <h2>Quick Start</h2>
      <p>
        If you wish to start right away and use a random set of sight words to
        practice just select your difficulty and press start game! Easy is 6
        words, medium is 8, and hard is 10.
      </p>
      <hr />
      <h2>Selecting Words</h2>
      <p>
        If you'd like to pick specific words to practice, push the Pick Practice
        Words button and a word bank will appear. Select the words you wish to
        practice. If you select enough words to fill the difficulty level you
        are using the game will start. If you only need a few words click the
        start game button and it will fill the rest of the board with random
        words. There is also a Minecraft word bank that functions the same way
        after you select that bank in the Pick Practice Words Menu
      </p>
      <hr />
      <h2>After you win!</h2>
      <p>
        After completing the board you will see a screen with the words you
        practiced. It will ask you if you knew the word and will give you an
        option to hear the word read to you if you don't know it. If you knew
        the word you can just go to the next word.
      </p>
      <hr />
      <h2>Play Again</h2>
      <p>
        If you did all random words select return to the home page and select
        how you'd like to play again. If you selected practice words and would
        like to play again with those words click play again. If you selected
        practice words and would like to pick different words or random words
        hit Erase Practice words and then return to the home page.
      </p>
    </PageStyled>
  );
};

export default Directions;
