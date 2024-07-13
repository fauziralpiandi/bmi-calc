/* 
 * MIT License
 * Copyright (c) 2021 Fauzira Alpiandi
 * Releasing under MIT License
 */

document.addEventListener("DOMContentLoaded", () => {
	// Mengambil elemen-elemen yang diperlukan dari DOM
	const bmiForm = document.getElementById("bmiForm");
	const resetButton = document.getElementById("resetButton");
	const resultDiv = document.getElementById("result");
	const themeToggleBtn = document.getElementById("themeToggle");
	const themeIcon = document.getElementById("themeIcon");
	const nameInput = document.getElementById("name");
	const weightInput = document.getElementById("weight");
	const heightInput = document.getElementById("height");
	const unitsSelect = document.getElementById("unitSelect");

	// Memuat tema dari localStorage atau menggunakan tema default 'dark'
	const currentTheme = localStorage.getItem("theme") || "dark";
	setTheme(currentTheme);

	// Event listener untuk saat formulir BMI disubmit
	bmiForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Mendapatkan nilai dari input formulir
		const name = nameInput.value.trim();
		const weight = parseFloat(weightInput.value);
		const height = parseFloat(heightInput.value);
		const units = unitsSelect.value;

		// Validasi input
		if (!name || isNaN(weight) || isNaN(height)) {
			alert("Nama, berat, dan tinggi harus diisi dengan benar!");
			return;
		}

		// Menghitung BMI
		const bmi = calculateBMI(weight, height, units);

		// Menentukan kategori BMI berdasarkan nilai
		let category = "";
		if (bmi < 18.5) {
			category =
				"<b>KURUS</b><br/><br/>Pastikan untuk mendapatkan nutrisi yang cukup dan seimbang untuk kesehatan yang optimal.";
		} else if (bmi >= 18.5 && bmi < 24.9) {
			category =
				"<b>NORMAL</b><br/><br/>Pertahankan gaya hidup sehat dengan pola makan seimbang dan olahraga yang teratur.";
		} else if (bmi >= 25 && bmi < 29.9) {
			category =
				"<b>BERLEBIH</b><br/><br/>Pertimbangkan untuk menyesuaikan pola makan dan rutin berolahraga untuk mencapai berat badan yang sehat.";
		} else {
			category =
				"<b>OBESITAS</b><br/><br/>Konsultasikan segera dengan dokter atau ahli gizi untuk mendapatkan penanganan yang tepat guna mengelola berat badan dan meningkatkan kesehatan secara keseluruhan.";
		}

		// Menampilkan hasil BMI
		displayResult(name, bmi, category);

		// Mengosongkan input formulir
		clearForm();
	});

	// Event listener untuk tombol reset
	resetButton.addEventListener("click", () => {
		clearForm();
		resultDiv.innerHTML = "";
	});

	// Event listener untuk tombol toggle tema
	themeToggleBtn.addEventListener("click", () => {
		toggleTheme();
	});

	// Fungsi untuk menghitung BMI berdasarkan berat, tinggi, dan satuan
	function calculateBMI(weight, height, units) {
		if (units === "metric") {
			// Formula untuk BMI dalam satuan metrik (kg/m^2)
			return weight / (height / 100) ** 2;
		} else {
			// Mengonversi berat dari pound ke kg dan tinggi dari kaki/inchi ke meter
			const weightKg = weight * 0.453592; // 1 pound = 0.453592 kg
			const heightM = height * 0.0254; // Mengonversi inchi ke meter
			return weightKg / heightM ** 2; // Formula untuk BMI dalam satuan imperial (lbs/in^2)
		}
	}

	// Fungsi untuk menampilkan hasil BMI di dalam resultDiv
	function displayResult(name, bmi, category) {
		resultDiv.innerHTML = `<p><b>${name}</b> memiliki nilai <b>BMI</b> = <b>${bmi.toFixed(2)}</b></p><p>${category}</p>`;
	}

	// Fungsi untuk mengosongkan input formulir
	function clearForm() {
		nameInput.value = "";
		weightInput.value = "";
		heightInput.value = "";
	}

	// Fungsi untuk mengganti tema antara tema gelap dan terang
	function toggleTheme() {
		let theme = localStorage.getItem("theme") || "light";
		theme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", theme);
		setTheme(theme);
	}

	// Fungsi untuk mengatur tema pada elemen HTML berdasarkan tema yang dipilih
	function setTheme(theme) {
		document.body.classList.add("theme-transition");
		if (theme === "dark") {
			document.documentElement.setAttribute("data-theme", "dark");
			themeIcon.classList.remove("ti-sun");
			themeIcon.classList.add("ti-sun-off");
		} else {
			document.documentElement.setAttribute("data-theme", "light");
			themeIcon.classList.remove("ti-sun-off");
			themeIcon.classList.add("ti-sun");
		}
		setTimeout(() => {
			document.body.classList.remove("theme-transition");
		}, 500); // Transisi saat peralihan tema
	}
});
