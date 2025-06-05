"use strict";

/**
* Renders a music question:
* - Draws a note.
* - Sets up a virtual keyboard using QwertyHancock.
* - Plays audio tones on key presses using AudioContext.
*/
let keyboard = null;
let audioCtx = null;
let activeOscillators = {};

function renderMusicQuestion() {
    renderNote(); // Draw the skeleton for the note question
    document.getElementById("cards").innerHTML = `
        <div id='keyboardActions'>
            <div id='keyboard'></div>
            <div id='status'></div>
        </div>
    `;
	disablePhysicalKeyboardInput();
    // Create new audio context
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Calculate keyboard width from screen size
    let container = document.getElementById('keyboardActions');
    let containerWidth = screen.width < 800 ? container.clientWidth-20 : 500;

    // Create virtual keyboard
    keyboard = new QwertyHancock({
        id: 'keyboard',
        width: containerWidth,
        height: 150,
        octaves: 1,
        startNote: 'C4',
        whiteNotesColour: 'white',
        blackNotesColour: 'black',
        activeColour: '#027EFB',
        hoverColour: '#027EFB'
    });

    // Play a tone when a key is pressed
    keyboard.keyDown = function (note, frequency) {
        if (!frequency) return;

        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();

        osc.frequency.value = frequency;
        osc.type = 'triangle';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);

        osc.start();
        activeOscillators[note] = { osc, gain };
    };

    // Stop the tone when a key is released
    keyboard.keyUp = function (note) {
        if (activeOscillators[note]) {
            let { osc, gain } = activeOscillators[note];
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.stop(audioCtx.currentTime + 2);
            delete activeOscillators[note];
        }

        if (noteQuestionAnswered === null) {
            chooseAnswer(note); // Validate the answer
        }

        // Change key colors based on answer correctness
        let color = noteQuestionAnswered ? '#2bb01d' : '#d42d1e';
        colorKeyboardKeys(color, color);
    };
}

/**
* Colors the virtual keyboard keys.
* @param {string} color - Color for white keys.
*/
function colorKeyboardKeys(color) {
    let keys = document.querySelectorAll('#keyboard li');
    keys.forEach(key => {
        let isBlack = key.classList.contains('black');
        key.style.backgroundColor = isBlack ? 'black' : color;
    });
}

/**
* Renders a musical note using VexFlow.
*/
function renderNote() {
    let VF = Vex.Flow;
    let canvas = document.getElementById("questionSpan");
    canvas.innerHTML = ""; // Clear any previous SVG content

    let renderer = new VF.Renderer(canvas, VF.Renderer.Backends.SVG);
    renderer.resize(502, 110);
    let context = renderer.getContext();

    // Get theme color
    let color = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    context.setFillStyle(color);
    context.setStrokeStyle(color);

    // Create and draw stave
    let stave = new VF.Stave(0, 0, 500);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Get note key and draw note
    let key = questionConfig.questions[questionConfig.index].a;
    let note = new VF.StaveNote({
        clef: "treble",
        keys: [key],
        duration: "q"
    });

    // Add accidental if needed
    if (key.includes("#")) {
        note.addModifier(new VF.Accidental("#"), 0);
    }

    // Draw note on stave
    VF.Formatter.FormatAndDraw(context, stave, [note]);

    // Update path colors to match theme
    document.querySelectorAll("#questionSpan svg path").forEach(path => {
        path.setAttribute("stroke", color);
    });

	// Set class for centered Keyboard
	document.getElementById("cards").classList.add("music");
}

/**
* Populates the current question based on the selected quiz state.
*/
function populateQuestions() {
    noteQuestionAnswered = null;
    let question = questionConfig.questions[questionConfig.index];
    let questionField = document.getElementById("questionSpan");
    let nextBtn = document.getElementById("nextQuestion");

    // Update UI elements
    document.getElementById("questionModule").innerHTML = state.charAt(0).toUpperCase() + state.slice(1);
    document.getElementById("questionProgress").innerHTML = `Frage ${questionConfig.index + 1}/10`;

    // Animate progress bar
    let progress = document.getElementById("questionProgressBarProgress");
    progress.style.width = `${questionConfig.index * 10}%`;
    setTimeout(() => progress.style.width = `${(questionConfig.index + 1) * 10}%`, 10);

    // Render question content based on quiz type
    if (state === "musik") {
        renderMusicQuestion(questionField);
    } else {
        questionField.innerHTML = `Frage: ${question.a}`;
    }

    // Populate answer choices
    if (state !== "musik") {
        let cards = document.getElementsByClassName("card");
        let choices = [...question.l];
        shuffleArray(choices);
        choices.forEach((choice, i) => {
            cards[i].innerHTML = choice;
            if (state === "mathe") cards[i].setAttribute("data", choice);
        });
    }

    // Enable answer button for extern quizzes
    if (state === "extern") {
        nextBtn.classList.remove("hidden");
        nextBtn.style.opacity = 1.0;
        nextBtn.innerHTML = "<span>Beantworten</span>";
    }

    // Render math formatting for math quizzes
    else if (state === "mathe") {
        renderMathInElement(document.getElementById("quiz"), {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "\\[", right: "\\]", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false }
            ],
            throwOnError: false
        });
    }
}

/**
* Populates the result screen with statistics after the quiz ends.
*/
function populateResult() {
    document.getElementById("questionsAnswered").innerHTML = `Fragen beantwortet: ${questionConfig.index}/10`;
    document.getElementById("questionsAnsweredRight").innerHTML = `Richtig beantwortet: ${questionConfig.right}/10`;
    document.getElementById("questionsAnsweredWrong").innerHTML = `Falsch beantwortet: ${questionConfig.wrong}/10`;
}
