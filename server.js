const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 10000;

// Sert les fichiers statiques dans le dossier "public"
app.use(express.static('public'));

// Si on accède à "/", renvoyer "index.html"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});

require('dotenv').config();
const openaiApiKey = process.env.OPENAI_API_KEY;

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GPT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

app.post('/correction', async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `Corrige ce message en français de façon naturelle et explique les fautes si nécessaire : ${userMessage}`;

  try {
    const response = await fetch(GPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Tu es un assistant qui corrige les erreurs de français à l’oral et écrit des réponses naturelles.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    const correction = data.choices[0].message.content;
    res.json({ correction });
  } catch (error) {
    console.error('Erreur GPT:', error);
    res.status(500).json({ error: 'Erreur GPT' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
