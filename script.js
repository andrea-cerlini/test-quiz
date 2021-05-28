const QUESTION_NUMBER = 7; // Numero di domande presenti nel quiz
var score = 0;
var n = 0;
var currentQuestion;
var playerDatabase = new Array();

var questionDatabase = [ // Array con tutte le domande, le risposte, il numero di quella giusta, la disponibilità
    {
        question: "Che anno viene dopo il 2020?", // Prima question
        answers: ["2200", "-3", "tabasco", "2021"], // Risposte disponibili
        indexOfCorrectAnswer: 4, // Indice della risposta giusta (indice fisico, quello logico è il successivo)
        isAvailable: true
    },
    {
        question: "Quanto potassio c'e' in una banana?",
        answers: ["Meno infinito", "In media circa il 9%", "Esattamente 4 chilometri", "Le banane sono in realta' radioattive"],
        indexOfTheCorrectAnswer: 2,
        isAvailable: true
    },
    {
        question: "Ludwig Van Beethoven e' ancora vivo?",
        answers: ["No, e' tipo morto due secoli fa", "Certo =)", "E' morto stamattina", "Si, ma non per molto"],
        indexOfCorrectAnswer: 1,
        isAvailable: true
    },
    {
        question: "Che forma ha il display di un televisore standard?",
        answers: ["Verde", "Icosaedro tronco", "Triangolo", "Rettangolo"],
        indexOfCorrectAnswer: 4,
        isAvailable: true
    },
    {
        question: "Vero o falso? Gli umani respirano aria",
        answers: ["Vero", "Falso"],
        indexOfCorrectAnswer: 1,
        isAvailable: true
    },
    {
        question: "Quale di queste opzioni e' il nome di un giorno della settimana?",
        answers: ["Ginevro", "42", "Sabato", "Domanica"],
        indexOfCorrectAnswer: 3,
        isAvailable: true
    },
    {
        question: "Vero o falso? Il sole non e' luminoso",
        answers: ["Vero", "Falso"],
        indexOfCorrectAnswer: 2,
        isAvailable: true
    },
    {
        question: "Quanto fa 1+1 (nella matematica classica)?",
        answers: ["Mille", "La matematica e' sopravvalutata", "2", "Radice cubica di e"],
        indexOfCorrectAnswer: 3,
        isAvailable: true
    },
    {
        question: "Domanda",
        answers: ["Risposta sbagliata", "Risposta giusta", "Risposta sbagliata", "Risposta non non sbagliata"],
        indexOfCorrectAnswer: 2,
        isAvailable: true
    },
    {
        question: "Di che colore sono le arance?",
        answers: ["Nero", "Grillotalpa", "Giallo", "Arancione"],
        indexOfCorrectAnswer: 4,
        isAvailable: true
    }
];

function getLen(questionDatabase) {
    var len = 0;
    for (var i = 0; i < questionDatabase.length; i++) {
        if (questionDatabase[i].isAvailable) {
            len++;
        }
    }
    return len;
}

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
            /*
            else
            {
                console.log("Gia' avvertito");
            }
            */
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
    console.log("\n\nCarico la " + (n + 1) + "a domanda! (n = " + n + ")\nDomande disponibili: " + getLen(questionDatabase)); // All'indice 5 c'è getLen
    currentQuestion = parseInt((Math.random() * 100)) % (QUESTION_NUMBER); // Sceglie una question casuale (1 volta)
    while (!(questionDatabase[currentQuestion].isAvailable)) // Finché non sceglie una question isAvailable (questionDatabase.disponibili.val è-
    // -  un array boolean per ogni question)
    {
        console.log("Domanda scelta: " + (currentQuestion + 1) + "\nQuesta question non va bene!");
        currentQuestion = parseInt((Math.random() * 100)) % (QUESTION_NUMBER); // Sceglie una question casuale (In caso non-
        // sia isAvailable subito)
    }

    if (questionDatabase[currentQuestion].isAvailable) {
        console.log("Domanda scelta: Domanda" + (currentQuestion + 1));
        questionDatabase[currentQuestion].isAvailable = false; // Flaggo la question appena scelta come non disponibile
        question.innerHTML = questionDatabase[currentQuestion].question; // Carico la question appena scelta
        var answerNumber = questionDatabase[currentQuestion].answers.length; // Variabile che tiene il numero di risposte disponibili per la question
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
            var currentAnswer = document.getElementsByClassName("answers").item(num - 1);
            currentAnswer.innerHTML = // Carico l'opzione nella cella con ID pari-
                // - a "posto"num (num è un numero, va da 1 a 4), es. posto3
                questionDatabase[currentQuestion].answers[num - 1]; // Carico le risposte a partire da 0, mentre num parte da 1
            num++;
        }
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
    for (var i = 0; i < questionDatabase.length; i++) { // Resetto la disponibilità delle domande
        questionDatabase[i].isAvailable = true;
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
    document.getElementsByClassName("fine-msg-correct").item(0).innerHTML = score;
    document.getElementsByClassName("fine-msg-tot").item(0).innerHTML = QUESTION_NUMBER;
    document.getElementsByClassName("fine-msg-percent").item(0).innerHTML = (score * 100 / QUESTION_NUMBER) + "%";
    document.getElementsByClassName("fine-msg-best").item(0).innerHTML = name + ": " + currentPlayer.bestScore + " su " + QUESTION_NUMBER;
    document.getElementsByClassName("restart-button").item(0).onclick = restart;
}

/*
function cellClick()
{
    var found = false;
    var cellArray = document.getElementsByClassName("answers");
    for (var i = 0; i < cellArray.length; i ++)
    {
        if (cellArray.item(i) === document.activeElement) // Trovato su internet, per vedere se l'elemento è cliccato
        {
            found = true;
            for (var j = 0; j < cellArray.length; j ++)
            {
                cellArray.item(j).onclick = null; // Rimuovo l'onclick su tutte le celle
            }
        }
    }
    return found;
}
*/

function checkFunction(currentAnswerNum) {
    var question = document.getElementsByClassName("question-paragraph").item(0); // Paragrafo della question
    var secondRowOfAnswerTable = document.getElementsByClassName("second-row-of-answer-table").item(0); // Seconda riga risposte
    console.log("Controllo risposta...");
    if (currentAnswerNum == questionDatabase[currentQuestion].indexOfCorrectAnswer) { // Controllo se l'indice della risposta corrente-
        // - è uguale a quella giusta per questa domanda
        console.log("Risposta giusta!");
        score++;
        console.log("Punteggio attuale: " + score);
    }
    else {
        console.log("Risposta sbagliata!");
        console.log("Punteggio attuale: " + score);
    }
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
        checkThis = function () {
            checkFunction((this.parentElement.rowIndex) * (this.parentElement.childElementCount) + this.cellIndex + 1) // Calcolo dell'indice:
            // Numero righe precedenti, per la loro lunghezza, + il numero di caselle prima di quella corrente (che è pari al suo indice nella riga)
        };
        if (cellArray.item(i).onclick != null) {
            cellArray.item(i).onclick = null; // Resetto l'onclick sulle risposte, in caso di riavvio del quiz
        }
        cellArray.item(i).onclick = checkThis;
    }
    loadQuestion(n, question, secondRowOfAnswerTable); // Carico la prima question
    n++;
}

window.onload = function () {
    login(); // Funzione che mostra il div del login
}
