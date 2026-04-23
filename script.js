const startBtn = document.getElementById("startBtn");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const questionText = document.getElementById("questionText");
const optionButtons = document.querySelectorAll(".optionBtn");
const optionBox = document.querySelector(".options");

const questions = [
    {
        text: "第一题：你更喜欢一个人待着吗？",
        options: [
            { text: "是", type: "I" },
            { text: "不是", type: "E" }
        ]
    },
    {
        text: "第二题：你做决定时更容易受感觉影响吗？",
        options: [
            { text: "是", type: "F" },
            { text: "不是", type: "T" }
        ]
    }
];

let currentQuestion = 0;

const scores = {
    I: 0,
    E: 0,
    F: 0,
    T: 0
};

startBtn.addEventListener("click", function () {
    homeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestion = 0;
    scores.I = 0;
    scores.E = 0;
    scores.F = 0;
    scores.T = 0;

    optionBox.classList.remove("hidden");

    showQuestion();
});

function showQuestion() {
    questionText.textContent = questions[currentQuestion].text;
    optionButtons[0].textContent = questions[currentQuestion].options[0].text;
    optionButtons[1].textContent = questions[currentQuestion].options[1].text;
}

optionButtons[0].addEventListener("click", function () {
    chooseAnswer(0);
});

optionButtons[1].addEventListener("click", function () {
    chooseAnswer(1);
});

function chooseAnswer(index) {
    const selectedOption = questions[currentQuestion].options[index];
    scores[selectedOption.type]++;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    let result = "";

    result += scores.I >= scores.E ? "I" : "E";
    result += scores.F >= scores.T ? "F" : "T";

    optionBox.classList.add("hidden");

    if (result === "IF") {
        questionText.textContent = "你的结果是：安静感性型";
    } else if (result === "IT") {
        questionText.textContent = "你的结果是：安静理性型";
    } else if (result === "EF") {
        questionText.textContent = "你的结果是：外向感性型";
    } else if (result === "ET") {
        questionText.textContent = "你的结果是：外向理性型";
    }
}