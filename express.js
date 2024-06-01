const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const TOGETHER_AI_KEY = '7beae622879151adbb61fa872fcd47d6c0f3c1f88e7237e214d0ef4647f1b186';

app.use(express.json());

app.post('/calculate', async (req, res) => {
  const { firstOperand, secondOperand, operation } = req.body;

  const prompt = `Calculate the result of ${firstOperand} ${operation} ${secondOperand}.`;
  
  try {
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', {
      prompt: prompt,
      max_tokens: 10,
      n: 1,
      stop: null,
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOGETHER_AI_KEY}`
      }
    });

    const result = response.data.choices[0].text.trim();
    res.send({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to calculate' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const fetch = require('node-fetch');

// const url = 'https://api.together.xyz/v1/chat/completions';
// const options = {
//   method: 'POST',
//   headers: {accept: 'application/json', 'content-type': 'application/json'},
//   body: JSON.stringify({
//     model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
//     temperature: 0.7,
//     frequency_penalty: 0,
//     presence_penalty: 0
//   })
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));


