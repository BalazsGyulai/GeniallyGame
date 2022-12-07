import "./App.css";
import React, { useState, useEffect } from "react";

const App = (props) => {
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
  const [found, setFound] = useState(false);


  const szo = "ALMÁS";
  useEffect(() => {
    setWord(szo);

    let array = [];
    let keyboardArray = [];

    for (let i = 0; i < 5; i++) {
      let wordLen = [];

      for (let j = 0; j < szo.length; j++) {
        wordLen.push({
          value: "",
          color: "grey",
        });
      }

      array.push(wordLen);
    }


    for (let i = 0; i < keyboardLayout.length; i++){
      let row = [];
      for(let j = 0; j < keyboardLayout[i].length; j++){

        row.push({
          value: keyboardLayout[i][j],
          color: "grey",
        });
      }

      keyboardArray.push(row);
    }

    setKeyboard(keyboardArray);
    setGuess(array);
  }, []);


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
  };

  const IsANewWord = (tip, progress, word) => {
    if (progress >= szo.length) {
      LettersPosition(word, tip, progress);

      setTip((oldState) => oldState + 1);
      setProgress(0);
      setTip((oldState) => {
        if (oldState + 1 > 5) {
          return 0;
        } else {
          return oldState;
        }
      });
    }
  };

  const LettersPosition = (word, tip, progress) => {
    
    let newState = guess;
    

    //quess
    for (let i = 0; i < szo.length; i++){
      let j = 0;
      while (j < szo.length && word[tip][i].value !== szo[j]) {
        j++;
      }
      
      
      if (j >= szo.length){
        newState[tip][i].color = "red";
      } else{
        newState[tip][i].color = "yellow";
      }
    }
    
    for (let i = 0; i < szo.length; i++) {

      if (word[tip][i].value === szo[i]) {
        newState[tip][i].color = "green";
      }
    }


    //keyboard
    let keyboardNewState = keyboard;
    for (let i = 0; i < newState[tip].length; i++){
      // szo[i] === keybord betujevel
      for (let k = 0; k < keyboardNewState.length; k++){
        for (let j = 0; j < keyboardNewState[k].length; j++){
          if (newState[tip][i].value === keyboardNewState[k][j].value){
            if(keyboardNewState[k][j].color === "grey" || keyboardNewState[k][j].color === "yellow"){
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
    let wordLen = szo.length;
    let correct = 0;

    for (let i = 0; i < wordLen; i++){
      if (newState[tip][i].value === szo[i]){
        correct++;
      }
    }

    if (correct === wordLen){
      setFound(true);
    } else {
      setFound(false);
    }
  }


  return (
    <>
      <div>{word}</div>
      <div>{tip}</div>
      <div>{progress}</div>
      <div className="guesses">
        {guess.map((word, index) => (
          <div key={index} className="words">
            {word.map((letter, indexLetter) => (
              <div className={`letter letter${letter.color}`} key={indexLetter}>
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
