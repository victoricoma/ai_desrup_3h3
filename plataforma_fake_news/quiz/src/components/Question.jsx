import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Option from "./Option";
import "./Question.css";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Se o jogo terminou, exibir o placar final
  if (quizState.gameStage === "End") {
    return (
      <div id="end-screen">
        <h2>Fim do Quiz!</h2>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas!</p>
        <button onClick={() => window.location.reload()} className="next-question-btn">
          Jogar Novamente
        </button>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestion];
  const pessoas = ["Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa 4"];

  const selectOption = (selectedOption) => {
    const correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.answer);
    const isCorrect = selectedOption === `Pessoa ${correctAnswerIndex + 1}`;

    // Atualiza o estado do quiz
    dispatch({
      type: "CHECK_ANSWER",
      payload: { option: selectedOption, answer: currentQuestion.answer }
    });
  };

  const nextQuestion = async () => {
    if (quizState.currentQuestion < quizState.questions.length - 1) {
      dispatch({ type: "CHANGE_QUESTION" });

      if (!quizState || !quizState.questions || !quizState.questions.length) {
        console.error('O estado do quiz não está definido corretamente.');
        return;
      }

      // Verifica se currentQuestion é um índice válido
      if (quizState.currentQuestion < 0 || quizState.currentQuestion >= quizState.questions.length) {
        console.error('currentQuestion é um índice inválido.');
        return;
      }

      const currentQuestionIndex = quizState.currentQuestion + 1;
      const currentQuestion = quizState.questions[currentQuestionIndex]; // Aqui você acessa a pergunta

      console.log("currentQuestion", currentQuestionIndex)
      if (!currentQuestion.options || currentQuestion.options < 5) {
        console.error('A pergunta atual não possui opções suficientes.');
        return;
      }

      // Pegue as 4 primeiras alternativas
      const alternatives = currentQuestion.options;

      // Associa cada número a uma alternativa e uma pessoa (Pessoa 1, Pessoa 2, etc.)
      const messages = quizState.emails.map((email, index) => ({
        title: "Quiz Desinformação " + currentQuestion.question,
        message: `<h1>Pessoa: ${index + 1}</h1> <p>${alternatives[index]}</p>`,
        emailRecipients: [email]
      }));

      console.log("Mensagem: ", messages);
      console.log("Mensagem JSON: ", JSON.stringify(messages));

      try {
        const response = await fetch('https://server-send-email.vercel.app/send-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messages),
        });
        const data = await response.json();
        console.log('Mensagens enviadas:', data);
      } catch (error) {
        console.error('Erro ao enviar mensagens:', error);
      }


    } else {
      dispatch({ type: "END_GAME" });
    }
  };

  console.log("rederizou questões", quizState.currentQuestion)
  return (
    <div id="question">
      <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
      <h2>{currentQuestion.question}</h2>
      <div id="options-container">
        {pessoas.map((pessoa, index) => (
          <Option
            option={pessoa}
            key={index}
            answer={currentQuestion.answer}
            selectOption={() => selectOption(currentQuestion.options[index])}
          />
        ))}
      </div>

      {quizState.answerSelected && (
        <div className={`result ${quizState.isCorrect ? "correct" : "wrong"}`}>
          {quizState.isCorrect ? "Você acertou!" : "Você errou!"}
        </div>
      )}


      <button onClick={nextQuestion} className="next-question-btn">Próxima Pergunta</button>
    </div>
  );
};

export default Question;
