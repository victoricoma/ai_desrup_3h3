const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const serverKey = '337348518110'; // Coloque sua Server Key do Firebase

app.post('/send-notifications', async (req, res) => {
  const { phoneNumbers, currentQuestion } = req.body;

  if (phoneNumbers.length !== 4 || !currentQuestion) {
    return res.status(400).json({ error: 'Número de telefones ou questão inválida.' });
  }

  const messages = phoneNumbers.map((phoneNumber, index) => ({
    to: phoneNumber, // Aqui você pode usar tokens de dispositivo ou outro identificador
    notification: {
      title: `Pergunta: ${currentQuestion.question}`,
      body: `Alternativa para Pessoa ${index + 1}: ${currentQuestion.options[index]}`,
    },
  }));

  try {
    for (const message of messages) {
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Authorization': `key=${serverKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
    res.json({ success: 'Notificações enviadas!' });
  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
    res.status(500).json({ error: 'Erro ao enviar notificações' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
