import React, { useState, useContext } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../notifications/firebase'; // Certifique-se de ter a inicialização do Firebase
import { QuizContext } from '../context/quiz';
import "./EmailInput.css";

const db = getFirestore(app);

const EmailInput = () => {
  const [emails, setEmails] = useState(['', '', '', '']);
  const [quizState, dispatch] = useContext(QuizContext);

  const handlePhoneChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };


  const handleSubmit = async () => {
    try {
      // Salvando cada número no Firestore
      for (let email of emails) {
        if (email !== '') {
          addDoc(collection(db, 'emails'), {
            email: email,
          });
        }
      }
      alert('Emails enviados com sucesso!');
      dispatch({ type: "COLLECT_PHONE_NUMBERS", payload: emails });

      // Chamar o backend (Firebase Functions ou outro) para enviar as alternativas
      await enviarMensagens(emails);
    } catch (error) {
      console.error("Erro ao salvar números: ", error);
      alert('Erro ao enviar emails.');
    }
  };

  const enviarMensagens = async (emails) => {
    if (!quizState || !quizState.questions || !quizState.questions.length) {
      console.error('O estado do quiz não está definido corretamente.');
      return;
    }

    // Verifica se currentQuestion é um índice válido
    if (quizState.currentQuestion < 0 || quizState.currentQuestion >= quizState.questions.length) {
      console.error('currentQuestion é um índice inválido.');
      return;
    }

    const currentQuestionIndex = quizState.currentQuestion;
    const currentQuestion = quizState.questions[currentQuestionIndex]; // Aqui você acessa a pergunta
    
    console.log("currentQuestion", currentQuestion)
    if (!currentQuestion.options || currentQuestion.options < 5) {
      console.error('A pergunta atual não possui opções suficientes.');
      return;
    }

    // Pegue as 4 primeiras alternativas
    const alternatives = currentQuestion.options;

    // Associa cada número a uma alternativa e uma pessoa (Pessoa 1, Pessoa 2, etc.)
    const messages = emails.map((email, index) => ({
      title: "Quiz Desinformação " + currentQuestion.question,
      message: `<h1>Pessoa: ${index + 1}</h1> <p>${alternatives[index]}</p>`,
      emailRecipients: [email]
    }));

    console.log("Mensagem: ", messages);
    console.log("Mensagem JSON: ",JSON.stringify(messages));

    try {
       const response = await fetch('https://server-send-email.vercel.app/send-emails', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify( messages ),
       });
      const data = await response.json();
      console.log('Mensagens enviadas:', data);
    } catch (error) {
      console.error('Erro ao enviar mensagens:', error);
    }
  };




  return (
    <div id="numero">
      <h1>Emails dos Participantes</h1>
      {emails.map((phone, index) => (
        <input
          key={index}
          type="text"
          className='numero_input'
          placeholder="Digite seu Email"
          value={phone}
          onChange={(e) => handlePhoneChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleSubmit}>Enviar Emails  </button>
    </div>
  );
};

export default EmailInput;
