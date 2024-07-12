import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/bmi', (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height) {
    return res.status(400).json({ message: 'Weight and height are required' });
  }

  const bmi = weight / (height * height);
  let category = '';

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }

  res.json({ bmi: bmi.toFixed(2), category });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});