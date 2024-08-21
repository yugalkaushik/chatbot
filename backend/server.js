const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { parse } = require('csv-parse');
const natural = require('natural');

const app = express();
app.use(cors());
app.use(express.json());

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const dataset = [];

// Load and process the dataset
fs.createReadStream('../data.csv') 
  .pipe(parse({ columns: true }))
  .on('data', (row) => {
    const question = row.question.trim();
    const answer = row.answer.trim();
    dataset.push({
      question: question,
      answer: answer,
      stemmedQuestion: tokenizer.tokenize(question.toLowerCase()).map(word => stemmer.stem(word))
    });
  })
  .on('end', () => {
    console.log('Dataset loaded successfully');
  });

function findBestResponse(input) {
  const inputStems = tokenizer.tokenize(input.toLowerCase()).map(word => stemmer.stem(word));
  let bestMatch = null;
  let highestScore = -1;

  dataset.forEach((item) => {
    const commonStems = inputStems.filter(stem => item.stemmedQuestion.includes(stem));
    const score = commonStems.length / Math.max(inputStems.length, item.stemmedQuestion.length);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });

  return bestMatch ? bestMatch.answer : "I'm sorry, I don't have an answer for that.";
}

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const response = findBestResponse(message);
  res.json({ response });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
