var tema1 = [];
var tema2 = [];
var tema3 = [];
var tema4 = [];
var tema5 = [];
var tema6 = [];
var tema7 = [];

let currentQuestion;
var selectedTemas = [];

function nextQuestion() {
    unselect();
    temasSelect();
    if(selectedTemas.length === 0) {
        alert("Please select a topic!");
        return;
    }

    let k = Math.floor(Math.random() * selectedTemas.length);
    let tema = selectedTemas[k].charAt(selectedTemas[k].length - 1);

    console.log(tema);
    
    if(tema === "1") {
        let n = Math.floor(Math.random() * 40);
        currentQuestion = tema1[n];
    } else if(tema === "2") {
        let n = Math.floor(Math.random() * 80);
        currentQuestion = tema2[n];
    } else if(tema === "3") {
        let n = Math.floor(Math.random() * 25);
        currentQuestion = tema3[n];
    } else if(tema === "4") {
        let n = Math.floor(Math.random() * 25);
        currentQuestion = tema4[n];
    } else if(tema === "5") {
        let n = Math.floor(Math.random() * 25);
        currentQuestion = tema5[n];
    } else if(tema === "6") {
        let n = Math.floor(Math.random() * 20);
        currentQuestion = tema6[n];
    } else if(tema === "7") {
        let n = Math.floor(Math.random() * 25);
        currentQuestion = tema7[n];
    }

    let qTitle = document.getElementById("questionText");
    qTitle.innerHTML = currentQuestion.question;
    for(let i = 1; i < 5; i++) {
        let answer = currentQuestion.answers[i-1].answer; 
        let a = document.getElementById("label" + i);
        a.innerHTML = answer;
    }
}

$(document).ready(function(){
    fetch("questions.json")
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            tema1 = data.tema1 || []; 
            tema2 = data.tema2 || []; 
            tema3 = data.tema3 || []; 
            tema4 = data.tema4 || []; 
            tema5 = data.tema5 || []; 
            tema6 = data.tema6 || []; 
            tema7 = data.tema7 || []; 
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function answer() {
    let selectedAnswer = null;
    document.getElementById("correct").style.display = "none";
    document.getElementById("wrong").style.display = "none";
    for(let i = 1; i < 5; i++) {
        let answer = document.getElementById("answer" + i);
        if(answer.checked) {
            selectedAnswer = document.getElementById("label" + i).innerHTML;
            break;
        }
    }
    if(selectedAnswer === null) {
        alert("Please select an answer!");
    }

    for(let i = 0; i < 4; i++) {
        if(currentQuestion.answers[i].answer === selectedAnswer) {
            if(currentQuestion.answers[i].correct) {
                document.getElementById("correct").style.display = "block";
            } else {
                document.getElementById("wrong").style.display = "block";
            }
        }
    }
}

function unselect() {
    selectedTemas = [];
    document.getElementById("correct").style.display = "none";
    document.getElementById("wrong").style.display = "none";
    let answers = document.getElementsByName("answer");
    for(let i = 0; i < 4; i++) {
        answers[i].checked = false;
    }
}

function temasSelect() {
    temas = document.getElementsByName("tema");
    for(let i = 0; i < temas.length; i++) {
        if(temas[i].checked && !selectedTemas.includes(document.getElementById("labelTema" + (i+1)).innerHTML)) {
            selectedTemas.push(document.getElementById("labelTema" + (i+1)).innerHTML);
        }
    }
}
