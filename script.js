const QUESTION_NUMBER = 10; // Numero di domande mostrate nel quiz
var score = 0;
var currentQuestionNumber = 0;
var currentQuestion;
var playerDatabase = [];
var currentQuestionDatabase = [];

var questionDatabase = [ // Array con tutte le domande, le risposte, il numero di quella giusta
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

const template = document.createElement("template");
template.innerHTML = `
<style>
    ::host {
        display: block;
        contain: content;
    }
    a {
        color: red;
        text-decoration: none;
    }
    slot {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>
<slot name='answers' class="answer-container">
</slot>
`;

function onAnswerClick(index) {
    return new CustomEvent("on-answer-click", {
        bubbles: true,
        composed: true,
        detail: {
            index
        }
    })
}

class answerContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

function updateContainer(answerNumber) { // Funzione per settare il numero corretto di caselle disponibili per le risposte
    var answerContainer = document.getElementsByClassName("answer-table").item(0);
    answerContainer.innerHTML = ""; // Inizializzo a vuota la tabella
    for (i = 0; i < answerNumber; i++) { // While per aggiungere dinamicamente il numero di div necessari per ogni domanda
        var cellBox = document.createElement("div"); // Variabile d'appoggio per creazione div cella
        cellBox.setAttribute("slot", "answers");
        cellBox.setAttribute("index", i + 1);
        cellBox.classList.add("answer");
        cellBox.innerHTML = currentQuestionDatabase[currentQuestion].answers[num - 1];
        answerContainer.appendChild(cellBox);
        cellBox.onclick = function () {
            cellBox.dispatchEvent(onAnswerClick(this.getAttribute("index")));
        };
    }
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
        }
        else // name non vuoto, termine login
        {
            error.classList.add("hide"); // Rinascondo il warning del nome, per i login successivi
            loginWrap.classList.add("hide"); // Nascondo div login
            quiz(); // Faccio partire il quiz
        }
    }
    return !nameIsEmpty; // Se mi sono loggato nameIsEmpty è false, ritorno il contrario di nameIsEmpty
}

function loadQuestion(currentQuestionNumber, question) {
    currentQuestion = parseInt((Math.random() * 100)) % (currentQuestionDatabase.length); // Sceglie una question casuale

    question.innerHTML = currentQuestionDatabase[currentQuestion].question; // Carico la question appena scelta
    var answerNumber = currentQuestionDatabase[currentQuestion].answers.length; // Variabile che tiene il numero di risposte disponibili per la question

    updateContainer(answerNumber);
}

function updateDatabase() {
    var found = false;
    var playerName = document.getElementsByClassName("name").item(0).value;
    playerDatabase.forEach(player => {
        if (playerName == player.name) { // Guardo tra i nomi se c'è quello del giocatore corrente
            if (score > player.bestScore) { // Se il giocatore è presente, vedo se il suo score è maggiore del best
                player.bestScore = score;
            }
            found = true;
        }
    });// Scorro la lista dei giocatori nel database per vedere se già c'è
    if (!found) { // Se invece il nome del giocatore non è presente nel database, lo aggiungo a quelli presenti
        playerDatabase.push({ name: playerName, bestScore: score });
    }
}

function restart() {
    document.getElementsByClassName("game-over-wrapper").item(0).classList.add("hide");
    score = 0;
    currentQuestionNumber = 0;
    login();
}

function end() {
    var gameOverWrapper = document.getElementsByClassName("game-over-wrapper").item(0);
    var name = document.getElementsByClassName("name").item(0).value; // Prendo il valore del nome inserito nella funzione login()

    var currentPlayer;
    playerDatabase.forEach(player => {
        if (player.name == name) {
            currentPlayer = player;
        }
    });

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

function checkFunction(event) {
    var question = document.getElementsByClassName("question-paragraph").item(0); // Paragrafo della question
    if (event.detail.index == currentQuestionDatabase[currentQuestion].indexOfTheCorrectAnswer) { // Controllo se l'indice della risposta corrente-
        // - è uguale a quello giusto per questa domanda
        score++;
    }
    currentQuestionDatabase.splice(currentQuestion, 1); // Rimuovo la domanda dall'array corrente
    if (currentQuestionNumber < QUESTION_NUMBER) { // Finché non finiscono le domande
        loadQuestion(currentQuestionNumber, question);
        n++;
    }
    else { // Quiz finito
        document.getElementsByClassName("quiz-wrapper").item(0).classList.add("hide"); // Nascondo la pagina del quiz
        updateDatabase(); // Aggiorno il database dei giocatori
        end(); // Mostro la schermata finale
    }
}

function insertAfter(newNode, referenceNode) { // Funzione di utility per inserire l'elemento nel primo argomento subito dopo quello specificato-
    // - nel secondo argomento
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function quiz() // Visualizzazione quiz
{
    var quizWrapper = document.getElementsByClassName("quiz-wrapper").item(0); // Div del quiz
    var question = document.getElementsByClassName("question-paragraph").item(0); // Paragrafo della question
    quizWrapper.classList.remove("hide"); // Mostro il campo del quiz

    currentQuestionDatabase = [...questionDatabase]; // Inizializzo l'array corrente delle domande
    window.customElements.define('answer-table', answerContainer);

    document.getElementsByClassName("answer-table").item(0).addEventListener("on-answer-click", checkFunction, true);

    loadQuestion(currentQuestionNumber, question); // Carico la prima question
    n++;
}

window.onload = function () {
    login(); // Funzione che mostra il div del login
}