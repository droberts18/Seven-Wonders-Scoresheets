// number of players in a game
var numPlayers = 4;
// array of scoring categories in the game
let scoringCategories = ['Military','Coins','Stages','Civilian_Structures','Commercial_Structures','Guilds','Science','Total'];

// asking user for number of players, checks to make sure that the entered value is a number between 2 and 7 inclusive
do {
    numPlayers = prompt('Enter the number of people playing:');
} while (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 7);

var flexContain = document.createElement('div');
flexContain.setAttribute('id', 'flexBox');

createColumns(flexContain);

var body = document.getElementsByTagName('BODY')[0];
body.appendChild(flexContain);
// adding coins and stages images to their corresponding cells
// unable to do this before adding the flex container to the body
addCoinsAndStagesPics();

function createColumns(flexContainer){
    // creating first column
    var labelColumn = document.createElement('div');
    labelColumn.setAttribute('class', 'column');
    labelColumn.setAttribute('id', 'scoreCategoryColumn');

    // creating "NAME" header in first column (first cell)
    var nameHeader = document.createElement('div');
    nameHeader.innerHTML = 'NAME';
    nameHeader.classList.add('cell', 'nameOrTotalRow');
    labelColumn.appendChild(nameHeader);

    createScoringCategoryCells(labelColumn);
    flexContainer.appendChild(labelColumn);

    for(var i = 0; i < numPlayers; i++){
        var col = document.createElement('div');
        col.setAttribute('class', 'column');

        // creating player name header for column
        var playerNameHeader = document.createElement('div');
        playerNameHeader.innerHTML = 'P' + (i+1);
        playerNameHeader.classList.add('cell', 'nameOrTotalRow');
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
    totalLabelCell.classList.add('nameOrTotalRow');
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
    totalCell.classList.add('nameOrTotalRow');
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

function addCoinsAndStagesPics(){
    var coinsCell = document.getElementById('Coins');
    var stagesCell = document.getElementById('Stages');

    coinsCell.innerHTML = '<img src="img/coin.png" alt="Coins";/>';
    stagesCell.innerHTML = '<img src="img/stages.png" alt="Stages";/>'
}