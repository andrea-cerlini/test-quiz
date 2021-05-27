var NUM_DOM = 5; // Numero di domande presenti nel quiz

var domande = {// Array con tutte le domande, le risposte e il numero di quella giusta
              // (quello logico, in realtà quello giusto è il precedente)
    val:
    [
        [
            "Domanda1", // Prima domanda
            ["risp1", "risp2", "risp3", "risp4"], // Risposte disponibili
            1 // Indice della risposta giusta (in realtà indice + 1)
        ],
        [
            "Domanda2",
            [
                "risp1", "risp2"],
            4
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
        val:
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
    console.log("logging");
    var pag = document.getElementById("login"); // Div del login
    var nome = document.getElementById("nome"); // Input del nome
    var logbtn = document.getElementById("logbtn"); // Bottone Inizia
    var error = document.getElementById("error"); // Paragrafo errore con testo rosso
    var nomeVuoto = true; // Variabile per dirmi se il nome è vuoto

    pag.style.display = "block"; // Rendo visibile il div del login

    logbtn.onclick = function () // Quando clicco su inizia controllo se il nome e' vuoto
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
            pag.style.display = "none"; // Nascondo div login
            quiz(); // Faccio partire il quiz
        }
    }
    return !nomeVuoto; // Se mi sono loggato nomeVuoto è false, ritorno il contrario di nomeVuoto
}

function quiz() // Visualizzazione quiz
{
    var pag = document.getElementById("quizwrap"); // Div del quiz
    var tab = document.getElementById("risposte"); // Tabella delle risposte
    var domanda = document.getElementById("domanda"); // Paragrafo della domanda
    var row2risp = document.getElementById("rispsecondrow"); // Seconda riga di risposte, dovrò visualizzarla-
                                                             // - solo per le domande con 4 risposte
    console.log("Inizio quiz!");
    pag.style.display = "block"; // Mostro il campo del quiz

    var n = 0;
    while (n < NUM_DOM) // Visualizzo un numero di domande pari a NUM_DOM
    {
        var loaded = false;
        if (!loaded) // Se nessuna domanda è caricata, carico una domanda
        {
            console.log("Carico " + (n + 1) + " domanda!");
            do {
                var currentq = parseInt((Math.random() * 100)) % (domande.disponibili.getLen()); // Sceglie una domanda casuale
            } while (!(domande.disponibili.val[currentq])); // Finché non sceglie una domanda disponibile (domande.disponibili.val è-
                                                            // -  un array boolean per ogni domanda)

            console.log(currentq);
            domanda.innerHTML = domande.val[currentq][0]; // Carico la domanda appena scelta
            var numrisp = domande.val[currentq][1].length; // Variabile che tiene il numero di risposte disponibili per la domanda
            if (numrisp == 4) // In caso le risposte disponibili siano 4, visualizzo anche la seconda riga
            {
                row2risp.style.display = "block";
            }
            else if (row2risp.style.display != "block") // In caso siano invece 2, nascondo la seconda riga in caso non sia già-
                                                        // - stata nascosta 
            {
                row2risp.style.display = "block";
            }

            var num = 1; // Variabile per scorrere le opzioni nella domanda corrente
            while (num <= numrisp) // Carico le opzioni della domanda appena scelta
            {
                var currisp = document.getElementById(("posto" + num));
                console.log("num: " + num);
                currisp.innerHTML = // Carico l'opzione nella cella con ID pari-
                                    // - a "posto"num (num è un numero, va da 1 a 4), es. posto3
                domande.val[currentq][1][num - 1]; // domande[currentq][1] è la lista delle risp disponibili
                var check = function()
                {
                    if (((currisp.parentElement.rowIndex) * (currisp.parentElement.childElementCount) + currisp.cellIndex + 1) == 
                    domande.val[currentq][2]) // Quella formula strana sopra è per trovare la posizione della cella seguendo-
                                              // - lo stesso ordine in cui le ho messe nella tabella; lo confronto-
                                              // - con domande.val[currentq][2] che è il numero della risposta giusta
                    {
                        // Aggiunta punteggio
                    }
                };
                currisp.addEventListener("click", check);
                num ++;
            }
            domande.disponibili.val[n] = false; // Tolgo la domanda appena scelta da quelle disponibili
            loaded = true;
            n ++;
        }
    }
}

function start()
{
    log();
}

window.onload = function ()
{
    start(); // Funzione che mostra il div del login
}