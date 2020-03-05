// number of players in a game
var numPlayers = 7;

// asking user for number of players, checks to make sure that the entered value is a number between 2 and 7 inclusive
/*
do {
    numPlayers = prompt('Enter the number of people playing:');
} while (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 7);
*/

var table = document.createElement('table');
var tbody = document.createElement('tbody');

// creating array of scoring category ids
let scoringCategories = ['military','coins','stages','civStructs','comStructs','guilds','science'];

// creating header row for table
var namesTr = document.createElement("tr");
// start with "NAME" cell
var namesTh = document.createElement('th');
namesTh.innerHTML = "NAME";
namesTr.appendChild(namesTh);
// fill the rest with blank spaces for every player in the game
for(var i = 0; i < numPlayers; i++){
    var td = document.createElement('td');

    var form = document.createElement('form');
    var input = document.createElement('input');
    input.setAttribute('type', 'text')
    input.setAttribute('value', 'Player ' + (i+1));

    form.appendChild(input);
    td.appendChild(form);

    namesTr.appendChild(td);
}
tbody.appendChild(namesTr);


// creating 7 rows for all scoring categories, not including Total row
for(var i = 0; i < scoringCategories.length; i++){
    var tr = document.createElement('tr');

    // creating scoring category at the beginning of each row, associating with correct id
    var scoringCatTh = document.createElement('th');
    scoringCatTh.setAttribute('id', scoringCategories[i]);

    if(scoringCategories[i] == 'coins'){
        scoringCatTh.innerHTML = '<img id="coinImg" src="img/coin.png" alt="Coins" />';
    }
    else if(scoringCategories[i] == 'stages'){
        scoringCatTh.innerHTML = '<img id="stagesImg" src="img/stages.png" alt="Stages" />'
    }

    tr.append(scoringCatTh);

    for(var j = 0; j < numPlayers; j++){
        var td = document.createElement('td');

        var form = document.createElement('form');
        var input = document.createElement('input');
        input.setAttribute('class', 'player' + (j+1) + 'Score');
        input.setAttribute('type', 'number')
        input.setAttribute('value', 0);
        input.setAttribute('min', 0);
        input.setAttribute('max', 999);

        const classN = input.getAttribute('class');

        input.addEventListener('change', function() {
             changeTotal(classN); 
        });

        form.appendChild(input);
        td.appendChild(form);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}


// creating total row
var totalTr = document.createElement('tr')
// start with "TOTAL" cell
var totalTh = document.createElement('th');
totalTh.innerHTML = "TOTAL";
totalTr.appendChild(totalTh);
// fill the rest with blank spaces for up to 7 players
for(var i = 0; i < numPlayers; i++){
    var td = document.createElement('td');
    td.setAttribute('class', 'playerTotal');
    td.setAttribute('id', 'player' + (i+1) + 'ScoreTotal');
    td.innerHTML = 0;
    totalTr.appendChild(td);
}
tbody.appendChild(totalTr);

table.appendChild(tbody);

var body = document.getElementsByTagName('BODY')[0];
body.appendChild(table);

function changeTotal(className){
    var totalCell = document.getElementById(className + 'Total');

    var totalScore = 0;

    var playersScoreInputs = document.getElementsByClassName(className);

    for(var i = 0; i < playersScoreInputs.length; i++) {
        totalScore = totalScore + parseInt(playersScoreInputs[i].value);
    }

    totalCell.innerHTML = totalScore;
}