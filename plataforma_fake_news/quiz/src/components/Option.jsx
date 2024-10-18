import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import "./Option.css";

const Option = ({ option, selectOption, answer, hide }) => {
  const [quizState, dispatch] = useContext(QuizContext);
  console.log('quizState.answerSelected ',quizState.answerSelected)
  console.log("Option :", option)
  console.log("resp  :", answer)
  return (
    
    <div
      onClick={selectOption}  // Agora a função será chamada corretamente
      className={`
      option
        ${quizState.answerSelected === answer ? "correct" : ""} ${
        quizState.answerSelected !== answer ? "wrong" : ""
      }
        ${hide ? "hide" : ""}
        `}
    >
      <p>{option}</p>
    </div>
  );
};

export default Option;
