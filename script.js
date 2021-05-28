const QUESTION_NUMBER = 5; // Numero di questionDatabase presenti nel quiz
var score = 0;

var questionDatabase = [ // Array con tutte le domande, le risposte, il numero di quella giusta, la disponibilità
    {
        question: "Domanda1", // Prima question
        answers: ["risp1", "risp2", "risp3", "risp4"], // Risposte disponibili
        indexOfCorrectAnswer: 2, // Indice della risposta giusta
        available: true
    },
    {
        question: "Domanda2",
        answers: ["risp1", "risp2", "risp3", "risp4"],
        indexOfCorrectAnswer: 2,
        available: true
    },
    {
        question: "Domanda3",
        answers: ["risp1", "risp2", "risp3", "risp4"],
        indexOfCorrectAnswer: 2,
        available: true
    },
    {
        question: "Domanda4",
        answers: ["risp1", "risp2", "risp3", "risp4"],
        indexOfCorrectAnswer: 2,
        available: true
    },
    {
        question: "Domanda5",
        answers: ["risp1", "risp2", "risp3", "risp4"],
        indexOfCorrectAnswer: 2,
        available: true
    },
    function getLen()
    {
        var len = 0;
        for (var i = 0; i < this.length; i ++)
        {
            if (this[i].available)
            {
                len ++;
            }
        }
        return len;
    }
];

function login()
{
    var loginWrap = document.getElementsByClassName("loginWrapper").item(0); // Div del login
    var name = document.getElementsByClassName("name").item(0); // Input del name
    var loginButton = document.getElementsByClassName("loginButton").item(0); // Bottone Inizia
    var error = document.getElementsByClassName("error").item(0); // Paragrafo errore con testo rosso
    var nameIsEmpty = true; // Variabile per dirmi se il name è vuoto

    loginWrap.classList.remove("hide"); // Rendo visibile il div del login

    loginButton.onclick = function () // Quando clicco su inizia controllo se il name e' vuoto
    {
        nameIsEmpty = (name.value.length == 0); // nameIsEmpty diventa true se la lunghezza del name == 0
        if (nameIsEmpty)
        {
            if (error.style.display != "") // Prima volta che mostro l'errore
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

function loadQuestion(n, question, secondRowOfAnswerTable)
{
    console.log("\n\nCarico la " + (n + 1) + "a question! (n = " + n + ")\nDomande disponibili: " + questionDatabase[5]()); // All'indice 5 c'è getLen
    var currentQuestion = parseInt((Math.random() * 100)) % (QUESTION_NUMBER); // Sceglie una question casuale (1 volta)
    while (!(questionDatabase[currentQuestion].available)) // Finché non sceglie una question available (questionDatabase.disponibili.val è-
                                                    // -  un array boolean per ogni question)
    {
        console.log("Domanda scelta: " + (currentQuestion + 1) + "\nQuesta question non va bene!");
        currentQuestion = parseInt((Math.random() * 100)) % (QUESTION_NUMBER); // Sceglie una question casuale (In caso non-
                                                                       // sia available subito)
    }

    if (questionDatabase[currentQuestion].available)
    {
        console.log("Domanda scelta: Domanda" + (currentQuestion + 1));
        questionDatabase[currentQuestion].available = false; // Flaggo la question appena scelta come non disponibile
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
            var currentAnswer = document.getElementsByClassName("answers")[num - 1];
            currentAnswer.innerHTML = // Carico l'opzione nella cella con ID pari-
                                      // - a "posto"num (num è un numero, va da 1 a 4), es. posto3
            questionDatabase[currentQuestion].answers[num - 1]; // questionDatabase[currentQuestion][1] è la lista delle answers disponibili
            var checkFunction = function()
            {
                this.onclick = null; // Rimuovo eventuali onclick precedenti, se no si aggiungono-
                                     // - uno sopra all'altro
                console.log("Controllo risposta...");
                if (((this.parentElement.rowIndex) * (this.parentElement.childElementCount) + this.cellIndex + 1) == 
                questionDatabase[currentQuestion].indexOfCorrectAnswer) // Quella formula strana sopra è per trovare la posizione della cella seguendo-
                                                                        // - lo stesso ordine in cui le ho messe nella tabella; lo confronto-
                                                                        // - con questionDatabase.val[currentQuestion][2] che è il numero della risposta giusta
                {
                    console.log("Risposta giusta!");
                    score ++;
                    console.log("Punteggio attuale: " + score);
                }
                else
                {
                    console.log("Risposta sbagliata LOL");
                }
            };
            currentAnswer.onclick = null; // Rimuovo eventuali onclick precedenti, se no si aggiungono-
                                          // - uno sopra all'altro
            currentAnswer.onclick = checkFunction;
            num ++;
        }
    }
}

function end()
{
    var gameOverWrapper = document.getElementsByClassName("gameOverWrapper").item(0);
    gameOverWrapper.classList.remove("hide");
    document.getElementsByClassName("fineMsgCorrect").item(0).innerHTML = score;
    document.getElementsByClassName("fineMsgTot").item(0).innerHTML = QUESTION_NUMBER;
    document.getElementsByClassName("fineMsgPercent").item(0).innerHTML = (score*100/QUESTION_NUMBER) + "%";
}
/*
function cellClick()
{
    var found = false;
    var cellArray = document.getElementsByClassName("answer");
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
} */

function quiz() // Visualizzazione quiz
{
    var quizWrapper = document.getElementsByClassName("quizWrapper").item(0); // Div del quiz
    var answersTable = document.getElementsByClassName("answerTable").item(0); // Tabella delle risposte
    var question = document.getElementsByClassName("questionParagraph").item(0); // Paragrafo della question
    var secondRowOfAnswerTable = document.getElementsByClassName("secondRowOfAnswerTable").item(0); // Seconda riga di risposte, dovrò visualizzarla-
                                                                                                    // - solo per le questionDatabase con 4 risposte

    console.log("Inizio quiz!");
    quizWrapper.classList.remove("hide"); // Mostro il campo del quiz

    var n = 0;
    loadQuestion(n, question, secondRowOfAnswerTable); // Carico la prima question
    n ++;
    answersTable.onclick = function() // Ogni volta che si clicca sulla tabella
    {
        if (n < QUESTION_NUMBER)
        {
            if (true /*cellClick()*/) // Solo se schiaccia in una cella, va avanti
            {
                loadQuestion(n, question, secondRowOfAnswerTable);
                n ++;
            }
        }
        else
        {
            answersTable.onclick = null;
            quizWrapper.classList.add("hide");
            end();
        }
    }
}

window.onload = function ()
{
    login(); // Funzione che mostra il div del login
}