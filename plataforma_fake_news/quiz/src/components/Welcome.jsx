import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import { useState } from "react";
import {useMessage, solicitarNoticacao} from "./useMessage"

import "./Welcome.css";

import Quiz from "../img/quiz.svg";

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  solicitarNoticacao()
  return (
    <div id="welcome">
      {message && <div>{message}</div>}
      <h2>Seja bem-vindo</h2>
      <p>Clique no botão abaixo para começar:</p>
      <button onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
        Iniciar
      </button>
      <img src={Quiz} alt="Início do Quiz" />
    </div>
  );
};

export default Welcome;
