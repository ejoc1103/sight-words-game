import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Card from './Card';
import wordBank from '../utils/wordBank';
import PickWords from './PickWords';
import YouWon from './YouWon';
import Toggle from './Utilities/Toggle';

const MainStyled = styled.div`
  display: grid;
  gap: 10px;
  padding-bottom: 2.5em;
`;

const GameStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
`;

const HeaderStyled = styled.header`
  display: grid;
  gap: 5px;
  grid-template-areas:
    'header header header header header'
    'start . pick . toggle';
  justify-content: center;
  background-color: ${({ theme }) => theme.third};
  padding: 20px;
  > h1 {
    grid-area: header;
    font-size: 5em;
    color: ${({ theme }) => theme.primary};
  }
`;

const BoardStyled = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
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
  const { id, setTheme } = useContext(ThemeContext);

  const resetGame = () => {
    setMatched([]);
    setCheckers([]);
    setReset(!reset);
    setCollectionFlips(Array.from(Array(20)));
    setClickCount(0);
    setStart(false);
    setGameCards([]);
    setCollection([]);
    setPickedWords([]);
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
  }, [start, level, pickedWords, reset]);

  const startGame = () => {
    setStart(true);
    setPickWords(false);
  };
  return (
    <MainStyled>
      <HeaderStyled>
        <h1>Sight Word Game</h1>
        <Toggle isActive={id === 'bingo'} onToggle={setTheme} />
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
      <GameStyled>
        {matched.length !== parseInt(level) ? (
          <GameSelectStyled>
            <h2>Attempts: {clickCount}</h2>
            <button onClick={() => resetGame()}>Reset Game</button>
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
          />
        ) : null}

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
    </MainStyled>
  );
}
