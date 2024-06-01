import Together from "together-ai";
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const TOGETHER_AI_KEY = '7beae622879151adbb61fa872fcd47d6c0f3c1f88e7237e214d0ef4647f1b186';

app.use(express.json());

const together = new Together({
  apiKey: process.env["TOGETHER_API_KEY"],
});

app.post('/calculate', async (req, res) => {
  const { firstOperand, secondOperand, operation } = req.body;

  const prompt = `Calculate the result of ${firstOperand} ${operation} ${secondOperand}.`;
  
  try {
    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt}],
      model: "meta-llama/Llama-3-8b-chat-hf",
    });

    const result = response.choices[0].message.content
    console.log('Result:', result);
    res.send({ result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to calculate' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});








