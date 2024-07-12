document.getElementById('bmiForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  if (!weight || !height) {
    alert('Please enter both weight and height');
    return;
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

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>BMI: ${bmi.toFixed(2)}</p><p>Category: ${category}</p>`;
});