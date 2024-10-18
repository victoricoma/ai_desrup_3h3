import { useContext } from "react";

import { QuizContext } from "../context/quiz";

import Category from "../img/category.svg";

import "./PickCategory.css";

const PickCategory = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  /* function chooseCategory(category) {
    dispatch({ type: "START_GAME", payload: category });
  } */
  dispatch({ type: "START_GAME", payload: "category" })
  return (
    <>
    <p>categoria retirada </p>
    {/* <div id="category">
      <p>As perguntas serão referentes a casos reais:</p>
      {quizState.questions.map((question) => (
        <button
        onClick={() => chooseCategory(question.category)}
        key={question.category}
        >
        {question.category}
        </button>
        ))}
        
        <img src={Category} alt="Quiz 3H3" />
        </div> */}
        </>
  );
};

export default PickCategory;