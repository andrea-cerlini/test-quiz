var NUM_DOM = 5; // Numero di domande presenti nel quiz
var punt = 0;

var domande = { // Array con tutte le domande, le risposte e il numero di quella giusta
                // (quello logico, in realtà quello giusto è il precedente)
    val:
    [
        [
            "Domanda1", // Prima domanda
            ["risp1", "risp2", "risp3", "risp4"], // Risposte disponibili
             // Indice della risposta giusta (in realtà indice + 1)
        ],
        [
            "Domanda2",[
                "risp1", "risp2"],
            1
        ],
        [
            "Domanda3",
            ["risp1", "risp2", "risp3", "risp4"],
            3
        ],
        [
            "Domanda4",
            ["risp1", "risp2", "risp3", "risp4"],
            2
        ],
        [
            "Domanda5",
            ["risp1", "risp2", "risp3", "risp4"],
            4
        ]
    ],
    disponibili:
    {
        val: // Array dove ogni posizione è l'indice della domanda corrispondente, true = disponibile
        [
            true, true, true, true, true
        ],
        getLen: function()
        {
            var len = 0;
            for (var i = 0; i < this.val.length; i ++)
            {
                if (this.val[i])
                {
                    len ++;
                }
            }
            return len;
        }
    }
}

function log()
{
    var loginWrap = document.getElementById("login"); // Div del login
    var nome = document.getElementById("nome"); // Input del nome
    var logBtn= document.getElementById("logbtn"); // Bottone Inizia
    var error = document.getElementById("error"); // Paragrafo errore con testo rosso
    var nomeVuoto = true; // Variabile per dirmi se il nome è vuoto

    loginWrap.style.display = "block"; // Rendo visibile il div del login

    logBtn.onclick = function () // Quando clicco su inizia controllo se il nome e' vuoto
    {
        nomeVuoto = (nome.value.length == 0); // nomeVuoto diventa true se la lunghezza del nome == 0
        if (nomeVuoto)
        {
            if (error.style.display != "block") // Prima volta che mostro l'errore
            {
                error.style.display = "block";
            }
            /*
            else
            {
                console.log("Gia' avvertito");
            }
            */
        }
        else // Nome non vuoto, termine login
        {
            loginWrap.style.display = "none"; // Nascondo div login
            quiz(); // Faccio partire il quiz
        }
    }
    return !nomeVuoto; // Se mi sono loggato nomeVuoto è false, ritorno il contrario di nomeVuoto
}

function loadQ(n, domanda, row2risp)
{
    console.log("\n\n");
    console.log("Carico la " + (n + 1) + "a domanda! (n = " + n + ")\nDomande disponibili: " + domande.disponibili.getLen());
    var currentq = parseInt((Math.random() * 100)) % (NUM_DOM); // Sceglie una domanda casuale (1 volta)
    while (!(domande.disponibili.val[currentq])) // Finché non sceglie una domanda disponibile (domande.disponibili.val è-
                                                 // -  un array boolean per ogni domanda)
    {
        console.log("Domanda scelta: " + (currentq + 1) + "\nQuesta domanda non va bene!");
        currentq = parseInt((Math.random() * 100)) % (NUM_DOM); // Sceglie una domanda casuale (In caso non-
                                                                // sia disponibile subito)
    }

    if (domande.disponibili.val[currentq])
    {
        console.log("Domanda scelta: Domanda" + (currentq + 1));
        domande.disponibili.val[currentq] = false; // Tolgo la domanda appena scelta da quelle disponibili
        domanda.innerHTML = domande.val[currentq][0]; // Carico la domanda appena scelta
        var numrisp = domande.val[currentq][1].length; // Variabile che tiene il numero di risposte disponibili per la domanda
        if (numrisp == 4) // In caso le risposte disponibili siano 4, visualizzo anche la seconda riga
        {
            row2risp.style.display = "block";
        }
        else if (row2risp.style.display != "none") // In caso siano invece 2, nascondo la seconda riga in caso non sia già-
                                                   // - stata nascosta 
        {
            row2risp.style.display = "none";
        }

        var num = 1; // Variabile per scorrere le opzioni nella domanda corrente
        while (num <= numrisp) // Carico le opzioni della domanda appena scelta
        {
            var curRisp = document.getElementById(("posto" + num));
            curRisp.innerHTML = // Carico l'opzione nella cella con ID pari-
                                // - a "posto"num (num è un numero, va da 1 a 4), es. posto3
            domande.val[currentq][1][num - 1]; // domande[currentq][1] è la lista delle risp disponibili
            var check = function()
            {
                this.onclick = null; // Rimuovo eventuali onclick precedenti, se no si aggiungono-
                                     // - uno sopra all'altro
                console.log("Controllo risposta...");
                if (((this.parentElement.rowIndex) * (this.parentElement.childElementCount) + this.cellIndex + 1) == 
                domande.val[currentq][2]) // Quella formula strana sopra è per trovare la posizione della cella seguendo-
                                          // - lo stesso ordine in cui le ho messe nella tabella; lo confronto-
                                          // - con domande.val[currentq][2] che è il numero della risposta giusta
                {
                    console.log("Risposta giusta!");
                    punt ++;
                    console.log("Punteggio attuale: " + punt);
                }
                else
                {
                    console.log("Risposta sbagliata LOL");
                }
            };
            curRisp.onclick = null; // Rimuovo eventuali onclick precedenti, se no si aggiungono-
                                    // - uno sopra all'altro
            curRisp.onclick = check;
            num ++;
        }
    }
}

function end()
{
    var gameOverWrap = document.getElementById("endwrap");
    gameOverWrap.style.display = "block";
    document.getElementById("fineMsgCorrect").innerHTML = punt;
    document.getElementById("fineMsgTot").innerHTML = NUM_DOM;
    document.getElementById("fineMsgPercent").innerHTML = (punt/NUM_DOM) + "%";
}

function quiz() // Visualizzazione quiz
{
    var quizWrap = document.getElementById("quizwrap"); // Div del quiz
    var tab = document.getElementById("risposte"); // Tabella delle risposte
    var domanda = document.getElementById("domanda"); // Paragrafo della domanda
    var row2risp = document.getElementById("rispsecondrow"); // Seconda riga di risposte, dovrò visualizzarla-
                                                             // - solo per le domande con 4 risposte

    console.log("Inizio quiz!");
    quizWrap.style.display = "block"; // Mostro il campo del quiz

    var n = 0;
    loadQ(n, domanda, row2risp, punt); // Carico la prima domanda
    n ++;
    tab.onclick = function() // Ogni volta che si clicca sulla tabella si clicca su una risposta
    {
        if (n < NUM_DOM)
        {
            loadQ(n, domanda, row2risp);
            n ++;
        }
        else
        {
            tab.onclick = null;
            quizWrap.style.display = "none";
            end();
        }
    }
}

window.onload = function ()
{
    log(); // Funzione che mostra il div del login
}