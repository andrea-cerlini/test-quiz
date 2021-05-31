const QUESTION_NUMBER = 10; // Numero di domande presenti nel quiz
var score = 0;
var n = 0;
var currentQuestion;
var playerDatabase = new Array();
var currentQuestionDatabase = [];

var questionDatabase = [ // Array con tutte le domande, le risposte, il numero di quella giusta, la disponibilità
    {
        question: "Che anno viene dopo il 2020?", // Prima question
        answers: ["2200", "-3", "tabasco", "2021"], // Risposte disponibili
        indexOfTheCorrectAnswer: 4 // Indice della risposta giusta

    },
    {
        question: "Quanto potassio c'e' in una banana?",
        answers: ["Meno infinito", "In media circa il 9%", "Esattamente 4 chilometri", "Le banane sono in realta' radioattive"],
        indexOfTheCorrectAnswer: 2

    },
    {
        question: "Ludwig Van Beethoven e' ancora vivo?",
        answers: ["No, e' tipo morto due secoli fa", "Certo =)", "E' morto stamattina", "Si, ma non per molto"],
        indexOfTheCorrectAnswer: 1

    },
    {
        question: "Che forma ha il display di un televisore standard?",
        answers: ["Verde", "Icosaedro tronco", "Triangolo", "Rettangolo"],
        indexOfTheCorrectAnswer: 4

    },
    {
        question: "Vero o falso? Gli umani respirano aria",
        answers: ["Vero", "Falso"],
        indexOfTheCorrectAnswer: 1

    },
    {
        question: "Quale di queste opzioni e' il nome di un giorno della settimana?",
        answers: ["Ginevro", "42", "Sabato", "Domanica"],
        indexOfTheCorrectAnswer: 3

    },
    {
        question: "Vero o falso? Il sole non e' luminoso",
        answers: ["Vero", "Falso"],
        indexOfTheCorrectAnswer: 2

    },
    {
        question: "Quanto fa 1+1 (nella matematica classica)?",
        answers: ["Mille", "La matematica e' sopravvalutata", "2", "Radice cubica di e"],
        indexOfTheCorrectAnswer: 3

    },
    {
        question: "Domanda",
        answers: ["Risposta sbagliata", "Risposta giusta", "Risposta sbagliata", "Risposta non non sbagliata"],
        indexOfTheCorrectAnswer: 2

    },
    {
        question: "Di che colore sono le arance?",
        answers: ["Nero", "Grillotalpa", "Giallo", "Arancione"],
        indexOfTheCorrectAnswer: 4

    },
    {
        question: "Quante 'C' ci sono nella parola CIAO?",
        answers: ["Una sola", "Cento", "Fotosintesi clorofilliana", "Zero"],
        indexOfTheCorrectAnswer: 1

    },
    {
        question: "In che Stato si trova Roma?",
        answers: ["Quattro", "Repubblica di Venezia", "Italia", "Roma non esiste"],
        indexOfTheCorrectAnswer: 3

    },
    {
        question: "Vero o falso? Un chilo di cipolle pesa un chilo",
        answers: ["Falso", "Vero"],
        indexOfTheCorrectAnswer: 2

    },
    {
        question: "Che forma hanno gli occhi umani?",
        answers: ["Piramidale", "Scarsa, non hanno muscoli", "Cubica", "Sferica, approssimativamente"],
        indexOfTheCorrectAnswer: 4
    },
    {
        question: "Vero o falso? Il monte Everest e' piu' alto di un uomo",
        answers: ["Vero", "Falso", "No", "Aceto"],
        indexOfTheCorrectAnswer: 1
    }
];

function login() {
    var loginWrap = document.getElementsByClassName("login-wrapper").item(0); // Div del login
    var name = document.getElementsByClassName("name").item(0); // Input del name
    var loginButton = document.getElementsByClassName("login-button").item(0); // Bottone Inizia
    var error = document.getElementsByClassName("error").item(0); // Paragrafo errore con testo rosso
    var nameIsEmpty = true; // Variabile per dirmi se il name è vuoto

    loginWrap.classList.remove("hide"); // Rendo visibile il div del login

    loginButton.onclick = function () // Quando clicco su inizia controllo se il name e' vuoto
    {
        nameIsEmpty = (name.value.length == 0); // nameIsEmpty diventa true se la lunghezza del name == 0
        if (nameIsEmpty) {
            if (error.classList.contains("hide")) // Prima volta che mostro l'errore
            {
                error.classList.remove("hide");
            }
        }
        else // name non vuoto, termine login
        {
            loginWrap.classList.add("hide"); // Nascondo div login
            quiz(); // Faccio partire il quiz
        }
    }
    return !nameIsEmpty; // Se mi sono loggato nameIsEmpty è false, ritorno il contrario di nameIsEmpty
}

function loadQuestion(n, question, secondRowOfAnswerTable) {
    console.log("\n\nCarico la " + (n + 1) + " domanda! (n = " + n + ")\nDomande disponibili: " + currentQuestionDatabase.length);
    currentQuestion = parseInt((Math.random() * 100)) % (currentQuestionDatabase.length); // Sceglie una question casuale

    console.log("Domanda scelta: " + (currentQuestion + 1)); // Adesso che utilizzo un secondo array, gli indici delle domande possono ripetersi
    question.innerHTML = currentQuestionDatabase[currentQuestion].question; // Carico la question appena scelta
    var answerNumber = currentQuestionDatabase[currentQuestion].answers.length; // Variabile che tiene il numero di risposte disponibili per la question
    if (answerNumber == 4) // In caso le risposte disponibili siano 4, visualizzo anche la seconda riga
    {
        secondRowOfAnswerTable.classList.remove("hide");
    }
    else if (!secondRowOfAnswerTable.classList.contains("hide")) // In caso siano invece 2, nascondo la seconda riga in caso non sia già-
    // - stata nascosta 
    {
        secondRowOfAnswerTable.classList.add("hide");
    }

    var num = 1; // Variabile per scorrere le opzioni nella question corrente
    while (num <= answerNumber) // Carico le opzioni della question appena scelta
    {
        var currentAnswer = document.getElementsByClassName("answers").item(num - 1); // Carico l'opzione nella cella numero [num - 1]-
        // - dell'HTMLContainer delle domande (classe CSS)
        currentAnswer.innerHTML = currentQuestionDatabase[currentQuestion].answers[num - 1]; // Carico le risposte a partire da 0, mentre num parte da 1
        num++;
    }
}

function updateDatabase() {
    console.log("Aggiornamento database");
    var found = false;
    var playerName = document.getElementsByClassName("name").item(0).value;
    for (var i = 0; i < playerDatabase.length; i++) { // Scorro la lista dei giocatori nel database per vedere se già c'è
        if (playerName == playerDatabase[i].name) { // Guardo tra i nomi se c'è quello del giocatore corrente
            console.log("Giocatore esistente!");
            if (score > playerDatabase[i].bestScore) { // Se il giocatore è presente, vedo se il suo score è maggiore del best
                playerDatabase[i].bestScore = score;
            }
            found = true;
        }
    }
    if (!found) { // Se invece il nome del giocatore non è presente nel database, lo aggiungo a quelli presenti
        playerDatabase.push({ name: playerName, bestScore: score });
    }
}

function restart() {
    document.getElementsByClassName("game-over-wrapper").item(0).classList.add("hide");
    score = 0;
    n = 0;
    for (var i = 0; i < currentQuestionDatabase.length; i++) { // Resetto la disponibilità delle domande
        currentQuestionDatabase[i].isAvailable = true;
    }
    login();
}

function end() {
    var gameOverWrapper = document.getElementsByClassName("game-over-wrapper").item(0);
    var name = document.getElementsByClassName("name").item(0).value; // Input del name
    var currentPlayer;
    for (var i = 0; i < playerDatabase.length; i++) {
        if (playerDatabase[i].name == name) {
            currentPlayer = playerDatabase[i];
        }
    }
    gameOverWrapper.classList.remove("hide");
    document.getElementsByClassName("fine-msg-correct").item(0).innerHTML = score + " su " + QUESTION_NUMBER;
    var percent = (score * 100 / QUESTION_NUMBER);
    var decimalDigits = 2;
    document.getElementsByClassName("fine-msg-percent").item(0).innerHTML = (Math.round(percent * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits)) + "%";
    // Arrotondo la percentuale a 2 cifre dopo la virgola
    document.getElementsByClassName("fine-msg-best-name").item(0).innerHTML = name;
    document.getElementsByClassName("fine-msg-best").item(0).innerHTML = currentPlayer.bestScore + " su " + QUESTION_NUMBER;
    if (score == currentPlayer.bestScore) {
        document.getElementsByClassName("fine-msg-correct").item(0).innerHTML += " - miglior punteggio! :D";
        document.getElementsByClassName("fine-msg-correct").item(0).classList.add("new-best");
        document.getElementsByClassName("fine-msg-best").item(0).classList.add("new-best");
    }
    else {
        document.getElementsByClassName("fine-msg-correct").item(0).classList.remove("new-best");
        document.getElementsByClassName("fine-msg-best").item(0).classList.remove("new-best");
    }
    document.getElementsByClassName("restart-button").item(0).onclick = restart;
}

function checkFunction(currentAnswerNum) {
    var question = document.getElementsByClassName("question-paragraph").item(0); // Paragrafo della question
    var secondRowOfAnswerTable = document.getElementsByClassName("second-row-of-answer-table").item(0); // Seconda riga risposte
    console.log("Controllo risposta...");
    if (currentAnswerNum == currentQuestionDatabase[currentQuestion].indexOfTheCorrectAnswer) { // Controllo se l'indice della risposta corrente-
        // - è uguale a quella giusta per questa domanda
        console.log("Risposta giusta!");
        score++;
        console.log("Punteggio attuale: " + score);
    }
    else {
        console.log("Risposta sbagliata!, la risposta giusta era " + currentQuestionDatabase[currentQuestion].answers[currentQuestionDatabase[currentQuestion].indexOfTheCorrectAnswer - 1]);
        console.log("Punteggio attuale: " + score);
    }
    currentQuestionDatabase.splice(currentQuestion, 1); // Rimuovo la domanda dall'array corrente
    if (n < QUESTION_NUMBER) { // Finché non finiscono le domande
        loadQuestion(n, question, secondRowOfAnswerTable);
        n++;
    }
    else { // Quiz finito
        document.getElementsByClassName("quiz-wrapper").item(0).classList.add("hide");
        updateDatabase();
        end();
    }
}

function quiz() // Visualizzazione quiz
{
    var cellArray = document.getElementsByClassName("answers");
    var answerTable = document.getElementsByClassName("answer-table").item(0);
    var quizWrapper = document.getElementsByClassName("quiz-wrapper").item(0); // Div del quiz
    var question = document.getElementsByClassName("question-paragraph").item(0); // Paragrafo della question
    var secondRowOfAnswerTable = document.getElementsByClassName("second-row-of-answer-table").item(0); // Seconda riga di risposte, dovrò visualizzarla-
    // - solo per le domande con 4 risposte
    console.log("Inizio quiz!");
    quizWrapper.classList.remove("hide"); // Mostro il campo del quiz

    for (var i = 0; i < answerTable.rows.length * answerTable.rows[0].cells.length; i++) // Scorro tutte le caselle della tabella
    {
        var checkThis = function () {
            checkFunction((this.parentElement.rowIndex) * (this.parentElement.childElementCount) + this.cellIndex + 1) // Calcolo dell'indice:
            // Numero righe precedenti, per la loro lunghezza, + il numero di caselle prima di quella corrente (che è pari al suo indice nella riga)
        };
        cellArray.item(i).onclick = checkThis; // Aggiungo il controllo alla cella, singolarmente su ognuna
    }

    for (var i = 0; i < questionDatabase.length; i++) { // Inizializzo l'array corrente delle domande
        currentQuestionDatabase[i] = questionDatabase[i];
    }

    loadQuestion(n, question, secondRowOfAnswerTable); // Carico la prima question
    n++;
}

window.onload = function () {
    login(); // Funzione che mostra il div del login
}
