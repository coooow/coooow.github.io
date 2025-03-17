var tema1 = [];
var tema1copy = [];
var tema2 = [];
var tema2copy = [];
var tema3 = [];
var tema3copy = [];
var tema4 = [];
var tema4copy = [];
var tema5 = [];
var tema5copy = [];
var tema6 = [];
var tema6copy = [];
var tema7 = [];
var tema7copy = [];

let currentQuestion;
var selectedTemas = [];
var firstAnswer = true;
var res = true;

function nextQuestion() {
    unselect();
    temasSelect();
    firstAnswer = true;

    if(res){
        resetQuestions();
        res = false;
    }

    var count = document.getElementById("counterText");
    var c = count.innerHTML.split("/");
    var correct = parseInt(c[0]);
    var total = parseInt(c[1]);
    total++;
    count.innerHTML = correct + "/" + total;

    if(selectedTemas.length === 0) {
        alert("Please select a topic!");
        return;
    }

    let k = Math.floor(Math.random() * selectedTemas.length);
    let tema = selectedTemas[k].charAt(selectedTemas[k].length - 1);
    let qTitle = document.getElementById("questionText");

    if(tema === "1") {
        if(tema1copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema1copy.length);
        currentQuestion = tema1copy.splice(n, 1)[0];
    } else if(tema === "2") {
        if(tema2copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema2copy.length);
        currentQuestion = tema2copy.splice(n, 1)[0];
    } else if(tema === "3") {
        if(tema3copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema3copy.length);
        currentQuestion = tema3copy.splice(n, 1)[0];
    } else if(tema === "4") {
        if(tema4copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema4copy.length);
        currentQuestion = tema4copy.splice(n, 1)[0];
    } else if(tema === "5") {
        if(tema5copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema5copy.length);
        currentQuestion = tema5copy.splice(n, 1)[0];
    } else if(tema === "6") {
        if(tema6copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema6copy.length);
        currentQuestion = tema6copy.splice(n, 1)[0];
    } else if(tema === "7") {
        if(tema7copy.length === 0) {
            qTitle.innerHTML = "No questions available for Tema " + tema;
            return;
        }
        let n = Math.floor(Math.random() * tema7copy.length);
        currentQuestion = tema7copy.splice(n, 1)[0];
    }

    qTitle.innerHTML = currentQuestion.question;
    for(let i = 1; i < 5; i++) {
        let answer = currentQuestion.answers[i-1].answer; 
        let a = document.getElementById("label" + i);
        a.innerHTML = answer;
    }
}

$(document).ready(function(){
    resetCounter();
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
                if(firstAnswer){
                    var count = document.getElementById("counterText");
                    var c = count.innerHTML.split("/");
                    var correct = parseInt(c[0]);
                    var total = parseInt(c[1]);
                    correct++;
                    count.innerHTML = correct + "/" + total;
                }
            } else {
                document.getElementById("wrong").style.display = "block";
            }
        }
    }

    if(firstAnswer){
        firstAnswer = false;
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

function resetCounter(){
    var count = document.getElementById("counterText");
    count.innerHTML = "0/0";
}

function resetQuestions(){
    tema1copy = tema1.slice();
    tema2copy = tema2.slice();
    tema3copy = tema3.slice();
    tema4copy = tema4.slice();
    tema5copy = tema5.slice();
    tema6copy = tema6.slice();
    tema7copy = tema7.slice();
}