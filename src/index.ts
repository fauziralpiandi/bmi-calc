import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/bmi', (req, res) => {
	const { weight, height } = req.body;

	if (!weight || !height) {
		return res.status(400).json({ message: 'Berat dan Tinggi dibutuhkan' });
	}

	const bmi = weight / (height * height);
	let category = '';

	if (bmi < 18.5) {
		category = 'Kurus';
	} else if (bmi >= 18.5 && bmi < 24.9) {
		category = 'Normal';
	} else if (bmi >= 25 && bmi < 29.9) {
		category = 'Berlebih';
	} else {
		category = 'Obesitas';
	}

	res.json({ bmi: bmi.toFixed(2), category });
});

app.listen(PORT, () => {
	console.log(`Server berjalan di http://localhost:${PORT}`);
});