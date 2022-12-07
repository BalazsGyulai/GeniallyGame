import React, {useState, useEffect} from "react";
import "./CorrectAnswer.css";

const CorrectAnswer = ({ found, answer, tip, newgame, round }) => {
  const NextQuestion = () => {
    newgame(true);
  };

  const [classes, setClasses] = useState(["Popup", "reveal"]);
  const [myClass, setMyclass] = useState("");

  let array = classes;
  useEffect(() => {
    addClass();
    
    array.push("reveal");
    setClasses(array);
    addClass();
    
    setTimeout(() => {
        array.pop();
        setClasses(array);
        addClass();
    }, 2000);

  }, [classes]);

  const addClass = () => {
    let a = "";
    for(let i = 0; i < classes.length; i++){
        a = a + " " + classes[i];
    }

    setMyclass(a);
  }

  return (
    <>
      <div className="blackHole"></div>
      <div className={myClass}>
        {found === 1 ? (
          <>
            <h1 className="Popupgreen">Helyes válasz!</h1>
            <p>{tip}. tippelésre találtad ki.</p>
          </>
        ) : (
          ""
        )}

        {found === 2 ? (
          <>
            <h1 className="Popupred">Rossz válasz!</h1>
            <p>
              A helyes válasz <strong>{answer}</strong> volt. Hajrá legközelebb
              sikerülni fog!
            </p>
          </>
        ) : (
          ""
        )}

          <button onClick={NextQuestion}>
          {round >= 4 ? "Új játék" : "Következő kérdés"}
          </button>
      </div>
    </>
  );
};

export default CorrectAnswer;
