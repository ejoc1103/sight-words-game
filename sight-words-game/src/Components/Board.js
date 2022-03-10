import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { wordBank } from '../utils/wordBank';
import PickWords from './PickWords';
import YouWon from './YouWon';
import CardflipAudio from '../audio/Card-flip.mp3';
import DidYouKnow from './DidYouKnow';
import MatchSound from '../audio/match.wav';
import Nav from './Utilities/Nav';

const MainStyled = styled.div`
  display: grid;
  justify-items: center;
  padding-bottom: 7rem;
`;

const GameStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 20px;
`;

const HeaderStyled = styled.header`
  display: grid;
  gap: 5px;
  grid-template-areas:
    'header header header header header'
    'nav nav nav nav nav'
    '. start . pick .';
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.third};
  padding: 20px;
  > h1 {
    grid-area: header;
    font-size: 5em;
    color: ${({ theme }) => theme.primary};
    @media (max-width: 495px) {
      font-size: 3em;
    }
  }
`;

const BoardStyled = styled.div`
  display: grid;
  justify-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: ${({ level }) => {
    return level === '20' ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)';
  }};
`;

const StartGameStyled = styled.button`
  display: grid;
  justify-items: center;
  align-items: center;
  justify-self: center;
  grid-area: start;
  font-size: 1.5em;
  color: ${({ theme }) => theme.text};
  border-radius: 40%;
  padding: 10px;
  background-color: ${({ theme }) => theme.secondary};
`;

const PickWordsStyled = styled.button`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-area: pick;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  border-radius: 40%;

  font-size: 1.5em;
  justify-self: center;
  background-color: ${({ theme }) => theme.secondary};
`;

const GameSelectStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column: span 4;
  justify-self: center;
  gap: 10px;
  margin-bottom: 1rem;
  > h2 {
    color: ${({ theme }) => theme.primary};
  }
  > button {
    font-size: 1.5em;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
  > select {
    font-size: 1.5em;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
`;

export default function Board({ start, setStart, pickWords, setPickWords }) {
  const [gameCards, setGameCards] = useState([]);
  const [reset, setReset] = useState(false);
  const [collectionFlips, setCollectionFlips] = useState(Array.from(Array(20)));
  const [matched, setMatched] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [checks, setChecks] = useState(0);
  const [level, setLevel] = useState('12');
  const [pickedWords, setPickedWords] = useState([]);
  const [collection, setCollection] = useState([]);
  const [availableWords, setAvailableWords] = useState(wordBank);
  const [knewIt, setKnewIt] = useState(false);
  const [i, setI] = useState(0);
  const [keepSwitch, setKeepSwitch] = useState(false);
  const audio = new Audio(CardflipAudio);
  const matchAudio = new Audio(MatchSound);

  const resetGame = () => {
    console.log(keepSwitch);
    setMatched([]);
    setCheckers([]);
    setReset(!reset);
    setCollectionFlips(Array.from(Array(20)));
    setClickCount(0);
    setStart(false);
    setGameCards([]);
    setCollection([]);
    setKnewIt(false);
    setI(0);
    if (keepSwitch) {
      startGame();
    } else {
      setAvailableWords(wordBank);
      setKeepSwitch(false);
    }
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
      }, 1500);

      setCheckers([]);
    } else {
      matchAudio.play();
      setMatched([...matched, ...checkers]);
      setCheckers([]);
      setChecks(0);
      setCollection(prevState => [...prevState, gameCards[checkers[0]].word]);
    }
  };

  useEffect(() => {
    if (checkers.length === 2) {
      checkAnswer();
    }
  });

  const handleClick = index => {
    audio.play();
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

        let randomWord = Math.floor(Math.random() * availableWords.length);

        if (repeats.length > 0) {
          i--;
        } else if (wordChecker.includes(availableWords[randomWord])) {
          i--;
        } else {
          tempArr.push({ word: availableWords[randomWord], id });
          tempArr.push({ word: availableWords[randomWord], id });
          wordChecker.push(availableWords[randomWord]);
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
      setPickWords(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, level, pickedWords, reset]);

  useEffect(() => {
    if (collection.length > 0) {
      if (i >= collection.length) {
        setKnewIt(({ prevState }) => !prevState);
      }
    }
  }, [i, collection.length]);

  const iCount = (count, direction) => {
    let temp = count;
    if (direction === 'back') {
      setI(temp - 1);
    } else {
      setI(temp + 1);
    }
  };

  const startGame = () => {
    setStart(true);
    setPickWords(false);
  };

  const afterSwitch = () => {
    console.log(keepSwitch);
    resetGame();
  };

  const handleReset = () => {
    setKeepSwitch(false);
    afterSwitch();
    console.log(keepSwitch);
  };

  return (
    <MainStyled>
      <HeaderStyled>
        <h1>Sight Word Game</h1>
        {start ? null : (
          <PickWordsStyled
            onClick={() => {
              setPickWords(prevState => !prevState);
            }}
          >
            {pickWords ? 'Close Word Bank' : 'Pick Practice Words'}
          </PickWordsStyled>
        )}

        {start === true ? null : (
          <StartGameStyled
            onClick={() => {
              startGame();
            }}
          >
            Start Game
          </StartGameStyled>
        )}
      </HeaderStyled>
      <Nav />
      <GameStyled>
        {matched.length !== parseInt(level) ? (
          <GameSelectStyled>
            <h2>Attempts: {clickCount}</h2>
            {gameCards.length > 0 ? (
              <button
                onClick={() => {
                  setKeepSwitch(false);
                  handleReset();
                }}
              >
                Reset Game
              </button>
            ) : null}
            {start ? null : (
              <select
                name='level'
                id='level'
                onChange={handleChange}
                value={level}
              >
                <option value='12'>Easy</option>
                <option value='16'>Normal</option>
                <option value='20'>Hard</option>
              </select>
            )}
          </GameSelectStyled>
        ) : null}
        {pickWords === true ? (
          <PickWords
            setPickedWords={setPickedWords}
            pickedWords={pickedWords}
            availableWords={availableWords}
            setAvailableWords={setAvailableWords}
            setStart={setStart}
            setPickWords={setPickWords}
            setKeepSwitch={setKeepSwitch}
          />
        ) : null}

        {matched.length === parseInt(level) ? (
          <>
            {knewIt ? (
              <YouWon
                resetGame={resetGame}
                collection={collection}
                clickCount={clickCount}
                setPickedWords={setPickedWords}
                knewIt={knewIt}
                setKeepSwitch={setKeepSwitch}
                keepSwitch={keepSwitch}
                setAvailableWords={setAvailableWords}
              />
            ) : (
              <DidYouKnow
                setKnewIt={setKnewIt}
                knewIt={knewIt}
                collection={collection}
                iCount={iCount}
                i={i}
              />
            )}
          </>
        ) : (
          <BoardStyled level={level}>
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
                    level={level}
                  />
                </div>
              );
            })}
          </BoardStyled>
        )}
      </GameStyled>
    </MainStyled>
  );
}
