// number of players in a game
var numPlayers = 4;
// array of scoring categories in the game
let scoringCategories = ['Military','Coins','Stages','Civilian_Structures','Commercial_Structures','Guilds','Science','Total'];

// asking user for number of players, checks to make sure that the entered value is a number between 2 and 7 inclusive
/*
do {
    numPlayers = prompt('Enter the number of people playing:');
} while (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 7);
*/

var flexContain = document.createElement('div');
flexContain.setAttribute('id', 'flexBox');

createColumns(flexContain);

var body = document.getElementsByTagName('BODY')[0];
body.appendChild(flexContain);

function createColumns(flexContainer){
    // creating first column
    var labelColumn = document.createElement('div');
    labelColumn.setAttribute('class', 'column');
    labelColumn.setAttribute('id', 'scoreCategoryColumn');

    // creating "NAME" header in first column (first cell)
    var nameHeader = document.createElement('div');
    nameHeader.innerHTML = 'NAME';
    nameHeader.classList.add('cell');
    labelColumn.appendChild(nameHeader);

    createScoringCategoryCells(labelColumn);
    flexContainer.appendChild(labelColumn);

    for(var i = 0; i < numPlayers; i++){
        var col = document.createElement('div');
        col.setAttribute('class', 'column');

        // creating player name header for column
        var playerNameHeader = document.createElement('div');
        playerNameHeader.innerHTML = 'P' + (i+1);
        playerNameHeader.classList.add('cell');
        col.appendChild(playerNameHeader);

        createColumnCells(col, i+1);

        flexContainer.appendChild(col);
    }
}

function createCell(typeOfCell){
    var cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.classList.add(typeOfCell);
    return cell;
}

function createScoreCategoryCell(scoringCategory){
    var cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('id', scoringCategory);
    return cell;
}

function createScoringCategoryCells(scoreCategoryColumn){
    // the "TOTAL" label cell is not created in this loop since it's the only cell that requires editing of its inner HTML
    for(var i = 0; i < scoringCategories.length-1; i++){
        var cell = createScoreCategoryCell(scoringCategories[i]);
        scoreCategoryColumn.appendChild(cell);
    }
    var totalLabelCell = createScoreCategoryCell(scoringCategories[scoringCategories.length-1]);
    totalLabelCell.innerHTML = "TOTAL";
    scoreCategoryColumn.appendChild(totalLabelCell);
}

function createColumnCells(column, playerNumber){
    // creates all cells in column that allow for input
    for(var i = 0; i < scoringCategories.length-1; i++){
        var cell = createCell('player' + playerNumber);
        createNumberInputInCell(cell, playerNumber);
        column.appendChild(cell);
    }
    // creating the last cell in the column, the Total cell
    var totalCell = createCell('totalCell');
    totalCell.setAttribute('id', 'player' + playerNumber + 'Total');
    totalCell.innerHTML = 0;
    column.appendChild(totalCell);
}

function createNumberInputInCell(cell, playerNumber){
    var form = document.createElement('form');
    var input = document.createElement('input');
    input.setAttribute('class', 'player' + playerNumber + 'Input');
    input.setAttribute('type', 'number');
    input.setAttribute('min', 0);
    input.setAttribute('max', 999);
    input.setAttribute('value', '');

    // remains as a constant, otherwise the variable's value changes over iteration
    const inputPlayerClassName = input.getAttribute('class');

    // adds listener to calculate total number of points every time a different input value is selected
    input.addEventListener('change', function() {
         calculateTotal(playerNumber); 
    });

    form.appendChild(input);
    cell.appendChild(form);
}

function calculateTotal(playerNumber){
    var totalCell = document.getElementById('player' + playerNumber + 'Total');

    var totalScore = 0;

    var playersScoreInputs = document.getElementsByClassName('player' + playerNumber + 'Input');

    for(var i = 0; i < playersScoreInputs.length; i++) {
        if(playersScoreInputs[i].value != '') {
            totalScore = totalScore + parseInt(playersScoreInputs[i].value);
        }
    }

    totalCell.innerHTML = totalScore;
}

// var table = document.createElement('table');
// var tbody = document.createElement('tbody');

// // creating array of scoring category ids
// let scoringCategories = ['military','coins','stages','civStructs','comStructs','guilds','science'];

// // creating header row for table
// var namesTr = document.createElement("tr");
// // start with "NAME" cell
// var namesTh = document.createElement('th');
// namesTh.innerHTML = "NAME";

// namesTr.appendChild(namesTh);
// // fill the rest with blank spaces for every player in the game
// for(var i = 0; i < numPlayers; i++){
//     var td = document.createElement('td');
//     td.setAttribute('class', 'playerInputTd');

//     var form = document.createElement('form');
//     var input = document.createElement('input');
//     input.setAttribute('type', 'text')
//     input.setAttribute('value', 'P' + (i+1));

//     form.appendChild(input);
//     td.appendChild(form);

//     namesTr.appendChild(td);
// }
// tbody.appendChild(namesTr);


// // creating 7 rows for all scoring categories, not including Total row
// for(var i = 0; i < scoringCategories.length; i++){
//     var tr = document.createElement('tr');

//     // creating scoring category at the beginning of each row, associating with correct id
//     var scoringCatTh = document.createElement('th');
//     scoringCatTh.setAttribute('id', scoringCategories[i]);

//     if(scoringCategories[i] == 'coins'){
//         scoringCatTh.innerHTML = '<img id="coinImg" src="img/coin.png" alt="Coins" style="width: 20px; height: 20px;"/>';
//     }
//     else if(scoringCategories[i] == 'stages'){
//         scoringCatTh.innerHTML = '<img id="stagesImg" src="img/stages.png" alt="Stages" style="width: 20px; height: 20px;"/>';
//     }

//     tr.append(scoringCatTh);

//     for(var j = 0; j < numPlayers; j++){
//         var td = document.createElement('td');
//         td.setAttribute('class', 'playerInputTd');

//         var form = document.createElement('form');
//         var input = document.createElement('input');
//         input.setAttribute('class', 'player' + (j+1) + 'Score');
//         input.setAttribute('type', 'number')
//         input.setAttribute('value', '');
//         input.setAttribute('min', 0);
//         input.setAttribute('max', 999);

//         const classN = input.getAttribute('class');

//         input.addEventListener('change', function() {
//              changeTotal(classN); 
//         });

//         form.appendChild(input);
//         td.appendChild(form);
//         tr.appendChild(td);
//     }
//     tbody.appendChild(tr);
// }


// // creating total row
// var totalTr = document.createElement('tr')
// // start with "TOTAL" cell
// var totalTh = document.createElement('th');
// totalTh.innerHTML = "TOTAL";
// totalTr.appendChild(totalTh);
// // fill the rest with blank spaces for up to 7 players
// for(var i = 0; i < numPlayers; i++){
//     var td = document.createElement('td');
//     td.setAttribute('class', 'playerTotal');
//     td.setAttribute('id', 'player' + (i+1) + 'ScoreTotal');
//     td.innerHTML = 0;
//     totalTr.appendChild(td);
// }
// tbody.appendChild(totalTr);

// table.appendChild(tbody);

// var body = document.getElementsByTagName('BODY')[0];
// body.appendChild(table);

// setProportionalWidthAndHeight();

// function setProportionalWidthAndHeight(){
//     // calculating the width and height for each cell based off screen size
//     var cellSizeWidth = screen.width / numPlayers+1;
//     var cellSizeHeight = (screen.height / numPlayers+1) / 10;

//     var tdCells = document.getElementsByTagName('td');

//     for(var i = 0; i < tdCells.length; i++){
//         tdCells[i].setAttribute('width', cellSizeWidth);
//         tdCells[i].setAttribute('height', cellSizeHeight);
//     }
//     var thCells = document.getElementsByTagName('th');

//     for(var i = 0; i < thCells.length; i++){
//         thCells[i].setAttribute('width', cellSizeWidth);
//         thCells[i].setAttribute('height', cellSizeHeight);
//     }

// }

// function changeTotal(className){
//     var totalCell = document.getElementById(className + 'Total');

//     var totalScore = 0;

//     var playersScoreInputs = document.getElementsByClassName(className);

//     for(var i = 0; i < playersScoreInputs.length; i++) {
//         if(playersScoreInputs[i].value != '') {
//             totalScore = totalScore + parseInt(playersScoreInputs[i].value);
//         }
//     }

//     totalCell.innerHTML = totalScore;
// }