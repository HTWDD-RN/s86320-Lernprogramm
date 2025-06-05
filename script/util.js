"use strict";

/**
* Randomly shuffles the elements of an array in place using the Fisher-Yates algorithm.
* @param {Array} array - Array to shuffle.
*/
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // Pick a random number from 0 to i
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
}

/**
* Applies the light or dark theme to the website.
* Stores the selected theme in localStorage and updates CSS variables.
* If the current section is "musik", calls `renderNote()` to re-render content to color stave.
* @param {boolean} [toggle] - If true, switches between light and dark themes. So it can load and toggle with one function.
*/
function setTheme(toggle) {
	let currentTheme = localStorage.getItem("theme") || "light"; // Default to light theme
	let changeThemeTo = toggle === true 
		? (currentTheme === "light" ? "dark" : "light") 
		: currentTheme;

	let root = document.querySelector(':root'); // Get root element for setting CSS variables
	localStorage.setItem("theme", changeThemeTo); // Store theme choice

	// Update theme icon based on new theme
	if (changeThemeTo === "dark") {
		document.getElementById("themeIcon").src = "media/sun.svg";
	} else {
		document.getElementById("themeIcon").src = "media/moon.svg";
	}

	// Apply theme colors using CSS custom properties
	root.style.setProperty('--color-text', `var(--color-text-${changeThemeTo})`);
	root.style.setProperty('--color-bg', `var(--color-bg-${changeThemeTo})`);
	root.style.setProperty('--color-element', `var(--color-element-${changeThemeTo})`);
	root.style.setProperty('--icon-filter', `var(--icon-filter-${changeThemeTo})`);

	// Re-render note display to color stave
	if (state === "musik") {
		renderNote();
	}
}

/**
* Disables input from the physical keyboard by blocking key events.
* Used for the virtual keyboards key inputs.
*/
function disablePhysicalKeyboardInput() {
	window.addEventListener('keydown', (e) => {
		e.stopImmediatePropagation();
		e.preventDefault();
	}, true);

	window.addEventListener('keyup', (e) => {
		e.stopImmediatePropagation();
		e.preventDefault();
	}, true);
}

/**
* Loads a reusable HTML template into the main content section of the page.
* Clears existing content before injecting the new template.
* @param {string} templateId - The ID of the <template> element to load.
*/
function loadTemplate(templateId) {
	// Get the template element
	let template = document.getElementById(templateId); 
	// Clone the content
	let clone = template.content.cloneNode(true);
	// Target area
	let mainSection = document.getElementById("mainContentSection");
	// Clear current content
	mainSection.innerHTML = "";
	// Append cloned content
	mainSection.appendChild(clone);

	if (templateId == "profileContent") {
		// Remove 'selected' class from all navigation items
		let elements = document.getElementsByClassName("navItem");
		for (let element of elements) {
			element.classList.remove("selected");
		}

		// Add 'selected' class to the clicked navigation item
		document.getElementById("navProfil").classList.add("selected");
	}
}
