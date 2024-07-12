document.getElementById('bmiForm').addEventListener('submit', (e) => {
	e.preventDefault();

	const weight = document.getElementById('weight').value;
	const heightInCm = document.getElementById('height').value;

	if (!weight || !heightInCm) {
		alert('');
		return;
	}

	const heightInM = heightInCm / 100;
	const bmi = weight / (heightInM * heightInM);
	let category = '';

	if (bmi < 18.5) {
		category = '<b>KURUS</b><br/><br/>Pastikan untuk mendapatkan nutrisi yang cukup dan seimbang untuk kesehatan yang optimal.';
	} else if (bmi >= 18.5 && bmi < 24.9) {
		category = '<b>NORMAL</b><br/><br/>Pertahankan gaya hidup sehat dengan pola makan seimbang dan olahraha yang teratur.';
	} else if (bmi >= 25 && bmi < 29.9) {
		category = '<b>BERLEBIH</b><br/><br/>Pertimbangkan untuk menyesuaikan pola makan dan rutin berolahraga untuk mencapai berat badan yang sehat.';
	} else {
		category = '<b>OBESITAS</b><br/><br/>Konsultasikan segera dengan dokter atau ahli gizi untuk mendapatkan penanganan yang tepat guna mengelola berat badan dan meningkatkan kesehatan secara keseluruhan.';
	}

	const resultDiv = document.getElementById('result');
	resultDiv.innerHTML = '';

	setTimeout(() => {
		resultDiv.innerHTML = `<p>Nilai <b>BMI</b> Kamu = <b>${bmi.toFixed(2)}</b></p><p>${category}</p>`;
	}, 0);
});

document.getElementById('resetButton').addEventListener('click', () => {
	document.getElementById('weight').value = '';
	document.getElementById('height').value = '';
	document.getElementById('result').innerHTML = '';
});

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

themeToggleBtn.addEventListener('click', () => {
	let theme = localStorage.getItem('theme') || 'light';

	if (theme === 'light') {
		theme = 'dark';
	} else {
		theme = 'light';
	}

	localStorage.setItem('theme', theme);
	setTheme(theme);
});

function setTheme(theme) {
	document.body.classList.add('theme-transition');
	if (theme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
		themeIcon.classList.remove('ti-sun');
		themeIcon.classList.add('ti-sun-off');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		themeIcon.classList.remove('ti-sun-off');
		themeIcon.classList.add('ti-sun');
	}
	setTimeout(() => {
		document.body.classList.remove('theme-transition');
	}, 500);
}