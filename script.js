let currentQuestionIndex = 0;
let questions = [];
let correctAnswer = '';

// Fetch questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    })
    .catch(error => {
        console.error("Error loading questions:", error);
    });

// Load a question and choices
function loadQuestion() {
    if (questions.length === 0) {
        document.getElementById('feedback').innerText = 'No more questions available!';
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[randomIndex];
    questions.splice(randomIndex, 1); // Remove the used question

    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('question-text').innerText = currentQuestion.question;

    // Clear previous choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        const choiceElement = document.createElement('div');
        choiceElement.innerHTML = `
            <label>
                <input type="radio" name="choice" value="${choice}" onclick="checkAnswer('${choice}')">
                ${choice}
            </label>
        `;
        choicesDiv.appendChild(choiceElement);
    });

    // Store the correct answer
    correctAnswer = currentQuestion.answer;
}

// Check if the selected answer is correct
function checkAnswer(selectedChoice) {
    const feedbackDiv = document.getElementById('feedback');
    if (selectedChoice === correctAnswer) {
        feedbackDiv.innerText = 'Correct!';
        feedbackDiv.style.color = 'green';
    } else {
        feedbackDiv.innerText = `Incorrect! The correct answer is: ${correctAnswer}`;
        feedbackDiv.style.color = 'red';
    }
}

// Load next question
function nextQuestion() {
    if (questions.length > 0) {
        loadQuestion();
        currentQuestionIndex++;
    } else {
        document.getElementById('feedback').innerText = 'You have completed all the questions!';
        document.getElementById('feedback').style.color = 'blue';
    }
}
