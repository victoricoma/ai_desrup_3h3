import { createContext, useReducer } from "react";
import questions from "../data/questions_complete";

const STAGES = ["Start", "Email", "Category", "Playing", "End"];

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  answerSelected: false,
  score: 0,
  help: false,
  optionToHide: null,
  emails: []
};

console.log("Estado inicial: ", initialState);

const quizReducer = (state, action) => {
  switch (action.type) {
    
    case "COLLECT_PHONE_NUMBERS":
      return {
        ...state,
        emails: action.payload,
        gameStage: STAGES[2], // Vai para a fase de "Playing"
      };

    case "END_GAME":
      return {
        ...state,
        gameStage: STAGES[4], // Vai para a fase de "Playing"
      };
      
    case "CHANGE_STAGE":
      const newShuffledQuestions = state.questions.sort(() => Math.random() - 0.5).slice(0, 3);

      return {
        ...state,

        questions: newShuffledQuestions,
        gameStage: STAGES[1],
      };

      case "START_GAME":
        //let quizQuestions = null;
      
        // Encontra as perguntas da categoria
        /* state.questions.forEach((question) => {
          if (question.category === action.payload) {
            quizQuestions = question.questions;
          }
        }); */
      
        // Embaralha as perguntas e limita a 3
        //const shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 3);
        
//        const shuffledQuestions = state.questions.sort(() => Math.random() - 0.5).slice(0, 3);
/*         const shuffledQuestions = state.questions;
        console.log("questões embaralhadas: ", shuffledQuestions) */

        return {
          ...state,
          //questions: shuffledQuestions,
          gameStage: STAGES[3],
        };

    case "REORDER_QUESTIONS":
      const reorderedQuestions = state.questions.sort(() => {
        return Math.random() - 0.5;
      });
      console.log("REORDER_QUESTIONS", reorderedQuestions)

      return {
        ...state,
        questions: reorderedQuestions,
      };

      case "CHECK_ANSWER": {
        const { option, answer } = action.payload;
  
        // Verifica se a resposta selecionada está correta
        console.log("Opção:", option )
        console.log("Resposta:", answer )
        const isCorrect = option === answer;
        const scoreIncrement = isCorrect ? 1 : 0;
  
        return {
          ...state,
          answerSelected: option,  // Marca a opção selecionada
          isCorrect,  // Armazena se a resposta está correta
          score: state.score + scoreIncrement,  // Incrementa o score se a resposta estiver correta
        };
      }
  
      case "CHANGE_QUESTION": {
        const nextQuestion = state.currentQuestion + 1;
        if(nextQuestion >= 3){
          return {gameStage: STAGES[4]}
        }
        return {
          ...state,
          currentQuestion: nextQuestion,  // Atualiza para a próxima pergunta
          answerSelected: false,  // Reseta a seleção de resposta
          isCorrect: null,  // Reseta o status de correção
          
        };
        
      }

    case "NEW_GAME": {
      console.log(questions);
      console.log(initialState);
      return initialState;
    }

    

    case "SHOW_TIP": {
      return {
        ...state,
        help: "tip",
      };
    }

    case "REMOVE_OPTION": {
      const questionWithoutOption = state.questions[state.currentQuestion];

      console.log(state.currentQuestion);

      console.log(questionWithoutOption);

      let repeat = true;
      let optionToHide;

      questionWithoutOption.options.forEach((option) => {
        if (option !== questionWithoutOption.answer && repeat) {
          optionToHide = option;
          repeat = false;
        }
      });

      return {
        ...state,
        optionToHide,
        help: true,
      };
    }

    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};