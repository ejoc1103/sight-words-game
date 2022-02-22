import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import wordBank from '../utils/wordBank';
import PickWords from './PickWords';
import YouWon from './YouWon';

const GameStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
`;

const BoardStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const StartGameStyled = styled.button`
  dispay: grid;
  justify-items: center;
  align-items: center;
  grid-column: span 4;
`;

const PickWordsStyled = styled.button`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-column: span 4;
`;

export default function Board() {
  const [start, setStart] = useState(false);
  const [gameCards, setGameCards] = useState([]);
  const [reset, setReset] = useState(false);
  const [collectionFlips, setCollectionFlips] = useState(Array.from(Array(20)));
  const [matched, setMatched] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [checks, setChecks] = useState(0);
  const [level, setLevel] = useState('12');
  const [pickWords, setPickWords] = useState(false);
  const [pickedWords, setPickedWords] = useState([]);
  const [collection, setCollection] = useState([]);

  const resetGame = () => {
    setMatched([]);
    setCheckers([]);
    setReset(!reset);
    setCollectionFlips(Array.from(Array(20)));
    setClickCount(0);
    setStart(false);
  };

  const resetFlips = () => {
    const mutableState = [...collectionFlips];

    mutableState[checkers[0]] = false;
    mutableState[checkers[1]] = false;

    setCollectionFlips(mutableState);
    setChecks(0);
  };

  const checkAnswer = () => {
    setClickCount(prevState => prevState + 1);

    if (gameCards[checkers[0]].id !== gameCards[checkers[1]].id) {
      setTimeout(() => {
        resetFlips();
      }, 1200);

      setCheckers([]);
    } else {
      setMatched([...matched, ...checkers]);
      setCheckers([]);
      setChecks(0);
      setCollection(prevState => [...prevState, gameCards[checkers[0]].word]);
      console.log(collection);
    }
  };

  useEffect(() => {
    if (checkers.length === 2) {
      checkAnswer();
    }
  });

  const handleClick = index => {
    //Checks that the same card wasn't clicked twice
    if (checkers.length === 1 && index === checkers[0]) {
      return;
    }

    setChecks(prevState => prevState + 1);

    //Adds the index to the checkers
    const tempArr = [...checkers, index];
    setCheckers(tempArr);

    //Sets mutableState to collection Flips
    const mutableState = [...collectionFlips];
    //Flips the card at the index
    mutableState[index] = !mutableState[index];
    //Sets the flip in state
    setCollectionFlips(mutableState);
  };

  const handleChange = e => {
    setLevel(e.target.value);
    resetGame();
  };

  useEffect(() => {
    let tempArr;
    let repeats;
    let wordChecker = [];
    if (pickedWords.length > 0) {
      tempArr = [...pickedWords, ...pickedWords];
      wordChecker = [...pickedWords];
    } else {
      tempArr = [];
    }
    if (start === true) {
      for (let i = tempArr.length / 2; i < level / 2; i++) {
        // set id for word to make matching work
        let id = Math.floor(Math.random() * 2000);
        // helps make sure ids don't repeat
        repeats = pickedWords.filter(word => word.id === id);

        let randomWord = Math.floor(Math.random() * 65);

        if (repeats.length > 0) {
          console.log('id filter getting hit');
          i--;
        } else if (wordChecker.includes(wordBank[randomWord])) {
          console.log('word filter getting hit');
          i--;
        } else {
          console.log('Is this getting hit?');
          tempArr.push({ word: wordBank[randomWord], id });
          tempArr.push({ word: wordBank[randomWord], id });
          wordChecker.push(wordBank[randomWord]);
        }
      }
    }

    let currentIndex = tempArr.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [tempArr[currentIndex], tempArr[randomIndex]] = [
        tempArr[randomIndex],
        tempArr[currentIndex],
      ];
    }

    if (tempArr.length === parseInt(level)) {
      setGameCards(tempArr);
    }
    if (tempArr.length > 0) {
      for (let i = 0; i < level; i++) {
        console.log(tempArr[i].word);
      }
    }
  }, [start, level, pickedWords]);

  const startGame = () => {
    setStart(true);
    setPickWords(false);
  };

  return (
    <GameStyled>
      {matched.length !== parseInt(level) ? (
        <>
          <h2>Attempts: {clickCount}</h2>
          <button onClick={() => resetGame()}>Reset Game</button>
          <select name='level' id='level' onChange={handleChange} value={level}>
            <option value='12'>Easy</option>
            <option value='16'>Normal</option>
            <option value='20'>Hard</option>
          </select>
        </>
      ) : null}
      <PickWordsStyled
        onClick={() => {
          setPickWords(prevState => !prevState);
        }}
      >
        Pick Practice Words
      </PickWordsStyled>
      {pickWords === true ? (
        <PickWords setPickedWords={setPickedWords} pickedWords={pickedWords} />
      ) : null}
      <StartGameStyled
        onClick={() => {
          startGame();
        }}
      >
        Start Game
      </StartGameStyled>

      {matched.length === parseInt(level) ? (
        <div>
          <YouWon
            resetGame={resetGame}
            collection={collection}
            clickCount={clickCount}
          />
          <h1>You won!</h1>
        </div>
      ) : (
        <BoardStyled>
          {gameCards.map(({ word, id }, index) => {
            return (
              <div key={index}>
                <Card
                  word={word}
                  id={id}
                  isFlipped={collectionFlips[index]}
                  handleClick={
                    checks < 2 ? () => handleClick(index, word) : null
                  }
                  matched={matched}
                  checkers={checkers}
                />
              </div>
            );
          })}
        </BoardStyled>
      )}
    </GameStyled>
  );
}
