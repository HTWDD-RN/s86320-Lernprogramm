"use strict";

// Register service worker if supported by the browser
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('service-worker.js') // Register the service worker script
			.catch(err => console.error('Service Worker registration failed:', err));
	});
}

// Keeps track of the currently selected website section
let state = "";

/**
* Handles navigation between different sections of the website.
* Updates the UI, loads appropriate templates.
* @param {string} section - The name of the section selected (e.g., Dashboard, Webtechnik)
*/
function selectSection(section) {
	// Remove 'selected' class from all navigation items
	let elements = document.getElementsByClassName("navItem");
	for (let element of elements) {
		element.classList.remove("selected");
	}

	// Add 'selected' class to the clicked navigation item
	document.getElementById("nav" + section).classList.add("selected");

	// Update UI and state depending on the selected section
	if (section == "Dashboard") {
		loadTemplate("dashboardContent");
		state = "dashboard";
		setGlobalProgressBar();
	} else if (section == "Webtechnik") {
		loadTemplate("quizContent");
		state = "webtechnik";
		chooseStorageType("local");
	} else if (section == "Mathe") {
		loadTemplate("quizContent");
		state = "mathe";
		chooseStorageType("local");
	} else if (section == "Musik") {
		loadTemplate("quizContent");
		state = "musik";
		chooseStorageType("local");
	} else if (section == "Extern") {
		state = "extern";
		chooseStorageType("external");
	}
}

/**
* Populates dashboard info with the number of total, answered,
* and correctly answered questions from localStorage.
*/
function populateInfo() {
	let overallQuestionsInfo = document.getElementById("overallQuestionsInfo");
	let questionsAnsweredInfo = document.getElementById("questionsAnsweredInfo");
	let questionsAnsweredRightInfo = document.getElementById("questionsAnsweredRightInfo");

	// Fetch stats from localStorage or default to 0
	let questionsRight = localStorage.getItem("questionsRight") || 0;
	let questionsAnswered = localStorage.getItem("questionsAnswered") || 0;

	// Display the stats
	overallQuestionsInfo.innerHTML = "40 Fragen";
	questionsAnsweredInfo.innerHTML = questionsAnswered + " Fragen";
	questionsAnsweredRightInfo.innerHTML = questionsRight + " Fragen";
}

/**
* Sets the global progress bar on the dashboard based on the number of correct answers.
*/
function setGlobalProgressBar() {
	let questionsRight = parseInt(localStorage.getItem("questionsRight")) || 0;
	setTimeout(() => {
		// Update progress bar width, maxing out at 100%
		document.getElementById("progress").style.width = Math.min((questionsRight / 80) * 100, 100) + "%";
	}, 10); // Small delay to allow DOM elements to render
}

/**
* Saves the entered username and password to localStorage.
* Displays a confirmation message.
*/
function login() {
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	if (username != "" && password != "") {
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);
		document.getElementById("errorMessage").innerHTML = "Anmeldedaten gespeichert";
	}
}

// Initialize app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
	selectSection("Dashboard"); // Default section
	setTheme(); // Sets the app theme
	populateInfo(); // Load dashboard stats
	setGlobalProgressBar(); // Loads progress in the dashboard progress bar
});