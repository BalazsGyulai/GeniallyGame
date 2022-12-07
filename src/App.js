import './App.css';
import React, {useState, useEffect} from 'react'


const App = props => {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState([]);
  const [tip, setTip] = useState(0);
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ő", "Ú", "Ó", "DEL"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "É", "Á", "Ű"],
    ["Í", "Y", "X", "C", "V", "B", "N", "M", "Ö", "Ü"]
  ];

  const szo = "almasp";
  useEffect(() => {
    
    setWord(szo);
    
    let array = [];
    let wordLen = [];

    for (let i = 0; i < szo.length; i++){
      wordLen.push("");
    }

    for (let i = 0; i < 5; i++) {
      array.push(wordLen);
    }

    setGuess(array);
  }, []);

  const KeyboardFunction = (e) => {
    console.log(e.target.innerHTML);

    // setGuess(guess[])
  }

  return (
    <>
    <div>{word}</div>
    <div className="guesses">
      {
        guess.map((word, index) => (
          <div key={index} className="words">
            {
              word.map((letter, indexLetter) => (
                <div className="letter" key={indexLetter}>{letter}</div>
              ))
            }
          </div>
        ))
      }
    </div>

    <div className="keyboard">
      {
        keyboard.map((row, index) => (
          <div className="keyRow" key={index}>
            {
              row.map((key, keyIndex) => (
                <button onClick={KeyboardFunction} className="keyboardKey" key={keyIndex}>
                  {key}
                </button>
              ))
            }
          </div>
        ))
      }
    </div>
    </>
  )
}

App.propTypes = {}

export default App;
