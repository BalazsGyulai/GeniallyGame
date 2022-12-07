import "./App.css";
import React, { useState, useEffect } from "react";
import CorrectAnswer from "./components/CorrectAnswer";

const App = (props) => {
  let [questions, setQuestions] = useState([
    {
      quest: "Kinek az udvarában él együtt Kepler és Borbála?",
      answer: "Rudolf",
    },
    {
      quest: "Miből kell megélnie Keplernek?",
      answer: "Kutatásaiból",
    },
    {
      quest: "Mit kénytelen alkalmazni Kepler, hogy kutatásaiból megtudjon élni?",
      answer: "Áltudományt",
    },
    {
      quest: "Kivel tölti éjszakáit Éva?",
      answer: "Udvaronccal",
    },
    {
      quest: "Ki látogatja meg Keplert?",
      answer: "Tanítványa",
    },
  ]);

  const [round, setRound] = useState(0);
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState([]);
  const [tip, setTip] = useState(0);
  const [progress, setProgress] = useState(0);
  const [keyboard, setKeyboard] = useState([]);
  const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ő", "Ú", "Ó", "DEL"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "É", "Á", "Ű"],
    ["Í", "Y", "X", "C", "V", "B", "N", "M", "Ö", "Ü"],
  ];
  const [found, setFound] = useState(0);

  useEffect(() => {
    MakeAnswersBigger();

    initialiseGame();
  }, [round]);

  const initialiseGame = () => {

    setWord(questions[round].answer);

    let array = [];
    let keyboardArray = [];

    for (let i = 0; i < 5; i++) {
      let wordLen = [];

      for (let j = 0; j < questions[round].answer.length; j++) {
        wordLen.push({
          value: "",
          color: "grey",
        });
      }

      array.push(wordLen);
    }

    for (let i = 0; i < keyboardLayout.length; i++) {
      let row = [];
      for (let j = 0; j < keyboardLayout[i].length; j++) {
        row.push({
          value: keyboardLayout[i][j],
          color: "grey",
        });
      }

      keyboardArray.push(row);
    }

    setKeyboard(keyboardArray);
    setGuess(array);
  };

  const MakeAnswersBigger = () => {
    let questionAnswer = questions;
    for (let i = 0; i < questionAnswer.length; i++) {
      questionAnswer[i].answer = questionAnswer[i].answer.toUpperCase();
    }

    setQuestions(questionAnswer);
  };

  const KeyboardFunction = (e) => {

    let newState = guess;

    if (e.target.innerHTML === "DEL") {
      if (progress - 1 >= 0) {
        setProgress((oldState) => oldState - 1);
        newState[tip][progress - 1].value = "";
      }
    } else {
      setProgress((oldStage) => oldStage + 1);

      newState[tip][progress].value = e.target.innerHTML;
    }

    setGuess(newState);
    IsANewWord(tip, progress + 1, newState);

    e.target.classList.add("keyboardKeyeffect");
    setTimeout(() => {
      e.target.classList.remove("keyboardKeyeffect");
    }, 500);

  };

  const IsANewWord = (tip, progress, word) => {
    if (progress >= questions[round].answer.length) {
      LettersPosition(word, tip, progress);

      setTip((oldState) => oldState + 1);
      setProgress(0);
    }
  };

  const LettersPosition = (word, tip, progress) => {
    let newState = guess;

    //quess
    for (let i = 0; i < questions[round].answer.length; i++) {
      let j = 0;
      while (
        j < questions[round].answer.length &&
        word[tip][i].value !== questions[round].answer[j]
      ) {
        j++;
      }

      if (j >= questions[round].answer.length) {
        newState[tip][i].color = "red";
      } else {
        newState[tip][i].color = "yellow";
      }
    }

    for (let i = 0; i < questions[round].answer.length; i++) {
      if (word[tip][i].value === questions[round].answer[i]) {
        newState[tip][i].color = "green";
      }
    }

    //keyboard
    let keyboardNewState = keyboard;
    for (let i = 0; i < newState[tip].length; i++) {
      for (let k = 0; k < keyboardNewState.length; k++) {
        for (let j = 0; j < keyboardNewState[k].length; j++) {
          if (newState[tip][i].value === keyboardNewState[k][j].value) {
            if (
              keyboardNewState[k][j].color === "grey" ||
              keyboardNewState[k][j].color === "yellow"
            ) {
              keyboardNewState[k][j].color = newState[tip][i].color;
            }
          }
        }
      }
    }

    FoundTheWord(newState, tip);

    setKeyboard(keyboardNewState);
    setGuess(newState);
  };

  const FoundTheWord = (newState, tip) => {
    let wordLen = questions[round].answer.length;
    let correct = 0;

    for (let i = 0; i < wordLen; i++) {
      if (newState[tip][i].value === questions[round].answer[i]) {
        correct++;
      }
    }

    if (correct === wordLen) {
      setFound(1);
    } else {
      if (tip === 4) {
        setFound(2);
      } else {
        setFound(0);
      }
    }
  };

  const NewGameHandler = (newGame) => {
    setFound(0);
    setProgress(0);
    setTip(0);

    setRound((round) => {
      if (round >= 4){
        return 0;
      } else {
        return round + 1;
      }
    });
  };

  return (
    <>
      {found === 1 || found === 2 ? (
        <CorrectAnswer
          newgame={(newGame) => NewGameHandler(newGame)}
          answer={questions[round].answer}
          found={found}
          tip={tip}
          round={round}
        />
      ) : (
        ""
      )}
      <h1 className="question">{
        questions[round].quest
      }</h1>
      <div className="guesses">
        {guess.map((word, index) => (
          <div key={index} className="words">
            {word.map((letter, indexLetter) => (
              <div className={`letter letter${letter.color}`} key={indexLetter}
              >
                {letter.value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="keyboard">
        {keyboard.map((row, index) => (
          <div className="keyRow" key={index}>
            {row.map((key, keyIndex) => (
              <button
                onClick={KeyboardFunction}
                className={`keyboardKey keyboardKey${key.color}`}
                key={keyIndex}
              >
                {key.value}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

App.propTypes = {};

export default App;
