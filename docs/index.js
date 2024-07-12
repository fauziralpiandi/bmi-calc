document.getElementById('bmiForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  const response = await fetch('/api/bmi', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify({ weight, height })
  });

  const data = await response.json();

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>BMI: ${data.bmi}</p><p>Category: ${data.category}</p>`;
});