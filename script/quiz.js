"use strict";

/**
* Configuration object holding quiz state and data:
* - type: string indicating the quiz category or state (e.g., "web", "musik", "mathe", "extern")
* - questions: array of question objects for the current quiz
* - index: current question index in the quiz
* - right: count of correctly answered questions
* - wrong: count of incorrectly answered questions
*/
let questionConfig = {
	type: "",
	questions: [],
	index: 0,
	right: 0,
	wrong: 0
};

/**
* Tracks whether the current question has been answered correctly or not,
* only used for the "musik" quiz state.
*/
let noteQuestionAnswered = null;

/**
* Updates statistics stored in localStorage about answered questions.
* Increments total answered questions and increments either right or wrong count based on correctness.
* Also triggers UI update by calling populateInfo().
* 
* @param {boolean} correct - true if the answer was correct, false otherwise
*/
function updateLocalStats(correct) {
	let answeredKey = "questionsAnswered";
	let targetKey = correct ? "questionsRight" : "questionsWrong";

	localStorage.setItem(targetKey, (parseInt(localStorage.getItem(targetKey)) || 0) + 1);
	localStorage.setItem(answeredKey, (parseInt(localStorage.getItem(answeredKey)) || 0) + 1);
	populateInfo();  // updates UI info about stats
}

/**
* Handles the user's answer selection logic depending on quiz state.
* - For state "musik", checks if clicked element matches correct note and shows next button.
* - For other states except "extern", prevents re-selection and marks cards as right/wrong.
* - For state "extern", toggles selection of answers without immediate evaluation.
* 
* @param {HTMLElement} clickedElement - The clicked answer element
*/
function chooseAnswer(clickedElement) {
	// Prevent clicking again if answer already marked
	if (state !== "musik" && (clickedElement.classList.contains("wrong") || clickedElement.classList.contains("right"))) {
		return;
	}

	if (state === "musik") {
		// Clicked element represents a note here
		// Check if clicked note matches correct answer
		let isCorrect = clickedElement === questionConfig.questions[questionConfig.index].l;
		noteQuestionAnswered = isCorrect;

		let btn = document.getElementById("nextQuestion");
		if (btn) btn.style.opacity = 1.0;

		isCorrect ? questionConfig.right++ : questionConfig.wrong++;
		updateLocalStats(isCorrect);

	} else if (state !== "extern") {
		// Prevent selecting more than one answer
		if (clickedElement.classList.contains("selected")) return;

		clickedElement.classList.add("selected");
		document.getElementById("nextQuestion").style.opacity = 1.0;

		// Mark cards as right or wrong depending on correct answer
		let cards = document.getElementsByClassName("card");
		let correctValue = questionConfig.questions[questionConfig.index].l[0];

		for (let card of cards) {
			let val = state === "mathe" ? card.getAttribute("data") : card.innerHTML;
			card.classList.add(val == correctValue ? "right" : "wrong");
		}

		let isCorrect = clickedElement.classList.contains("right");
		isCorrect ? questionConfig.right++ : questionConfig.wrong++;
		updateLocalStats(isCorrect);

	} else {
		// For external quiz, allow multiple selections toggled on cards
		clickedElement.classList.toggle("selected");
	}
}

/**
* Handles submission of answers for external quiz questions by sending selections
* to the quiz server API and updating UI based on response.
* Uses Basic Auth with stored username and password from localStorage.
* 
* On success, increments right answers and highlights correct selected cards.
* On failure, increments wrong answers and marks all cards as wrong.
*/
function solveExternal() {
	let username = localStorage.getItem("username") || "test@gmail.com";
	let password = localStorage.getItem("password") || "secret";
	let answered = [];

	// Gather indices of selected answers in the current question's options
	for (let card of document.getElementsByClassName("card")) {
		if (card.classList.contains("selected")) {
			answered.push(questionConfig.questions[questionConfig.index].l.indexOf(card.innerHTML));
		}
	}

	fetch(`https://idefix.informatik.htw-dresden.de:8888/api/quizzes/${questionConfig.questions[questionConfig.index].id}/solve`, {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(`${username}:${password}`),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(answered)
	})
	.then(res => res.json())
	.then(data => {
		let cards = document.getElementsByClassName("card");
		if (data.success) {
			questionConfig.right++;
			updateLocalStats(true);
			for (let card of cards) {
				if (card.classList.contains("selected")) card.classList.add("right");
			}
		} else {
			questionConfig.wrong++;
			updateLocalStats(false);
			for (let card of cards) card.classList.add("wrong");
		}
		document.getElementById("nextQuestion").innerHTML = "<span>Weiter</span>";
	})
	.catch(console.error);
}

/**
* Moves to the next question or shows results when quiz is finished.
* For external quizzes, triggers solveExternal if answers where chosen.
* Prevents advancing if next button is not visible.
* Loads templates and populates questions or results accordingly.
*/
function nextQuestion() {
	if (state === "extern") {
		let btn = document.getElementById("nextQuestion");
		if (btn.innerHTML.includes("Beantworten")) {
			solveExternal();
			return;
		}
	}

	// Prevent next if button is hidden (opacity 0)
	if (document.getElementById("nextQuestion").style.opacity == 0.0 && state !== "extern") return;

	loadTemplate("quizContent");  // loads bare question template UI
	questionConfig.index++;

	if (questionConfig.index >= 10) {
		// Quiz finished after 10 questions
		loadTemplate("quizResultContent"); // load result UI
		populateResult();  // fill result UI
	} else {
		document.getElementById("nextQuestion").style.opacity = 0.0;
		populateQuestions();  // fill next question UI
	}
}

/**
* The original idea for this function was, that a user could select at the start of a quiz if he wants to have
* questions stored on the local device or have questions from the external server. This function then was rewritten 
* to fetch the question from local and external storage.
* 
* Initializes quiz data by selecting either local JSON data or fetching
* questions from an external API depending on storage type.
* For local, loads questions from quizdata.json and shuffles them.
* For external, fetches quizzes from remote API and shuffles data.
* Then populates the first question.
* 
* @param {string} type - "local" or external to determine data source
*/
function chooseStorageType(type) {
	if (type === "local") {
		resetQuestionConfig();
		fetch('./data/quizdata.json')
			.then(res => res.json())
			.then(json => {
				// Select questions based on state/category
				let questions = state === "webtechnik" ? json.web : state === "mathe" ? json.mathe : json.noten;
				shuffleArray(questions);
				questionConfig.questions = questions;
				populateQuestions();
			});
	} else {
		let username = localStorage.getItem("username") || "test@gmail.com";
		let password = localStorage.getItem("password") || "secret";

		fetch('https://idefix.informatik.htw-dresden.de:8888/api/quizzes', {
			headers: { 'Authorization': 'Basic ' + btoa(`${username}:${password}`) }
		})
		.then(res => res.json())
		.then(data => {
			loadTemplate("quizContent");
			// Map API response to internal question format
			let questions = data.content.map(q => ({ a: q.text, l: q.options, id: q.id }));
			shuffleArray(questions);
			resetQuestionConfig(questions);
			populateQuestions();
		}).catch(console.error);
	}
}

/**
* Resets the questionConfig object for a new quiz session.
*/
function resetQuestionConfig(questions) {
	questionConfig = {
		type: state,
		questions: questions || [],
		index: 0,
		right: 0,
		wrong: 0
	};
}

/**
* Restarts the current quiz section by selecting it again.
*/
function again() {
	selectSection(state.charAt(0).toUpperCase() + state.slice(1));
}
