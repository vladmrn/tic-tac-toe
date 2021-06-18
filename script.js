var numberOfEntries = 0;

function refreshPage() {
    window.location.reload();
}

function whoseTurn() {
    var turn = "X";
    if (numberOfEntries % 2 === 0) {
        return turn;
    }
    turn = "0";
    return turn;
}

function markVictory(cell1, cell2, cell3, lastInput) {
    document.getElementById("winner").innerHTML = lastInput;
    document.getElementById("winnerIndicatorMessage").style.visibility = "visible";
    document.getElementById("playerIndicatorMessage").style.visibility = "hidden";
    document.getElementById(cell1).style.color = "green";
    document.getElementById(cell2).style.color = "green";
    document.getElementById(cell3).style.color = "green";
}

function parseCells(id1, id2, isWinner, cell1, cell2, cell3, lastInput, index) {
    if (document.getElementById(id1).textContent !== document.getElementById(id2).textContent) {
        isWinner = false; //this prevents the loop to run one more time;
        return isWinner;
    }
    if (index === 1) { //marks the completion of the loop;
        numberOfEntries = 10; //this stops choseBox;
        markVictory(cell1, cell2, cell3, lastInput);
        return isWinner; //avoided to return undefined;
    } else {
        return isWinner;
    }
}

function checkMainDiagonal(lastInput) {
    var isWinner = true, id1, id2, index, index2;
        for (index = 0; index < 2 && isWinner === true; ++index) {
            id1 = "cell_" + index + index;
            index2 = index + 1;
            id2 = "cell_" + index2 + index2;
            isWinner = parseCells(id1, id2, isWinner, "cell_00", "cell_11", "cell_22", lastInput, index);
        }
    
}

function checkSecDiagonal(lastInput) {
    var isWinner = true, id1, id2, index_i, index_i2, index_j, index_j2;
    for (index_i = 2, index_j = 0; index_i > 0 && index_j < 2 && isWinner === true; --index_i, ++index_j) {
        id1 = "cell_" + index_i + index_j;
        index_i2 = index_i - 1;
        index_j2 = index_j + 1;
        id2 = "cell_" + index_i2 + index_j2;
        isWinner = parseCells(id1, id2, isWinner, "cell_20", "cell_11", "cell_02", lastInput, index_j);
    }
}

function checkLine(i, lastInput) {
    var isWinner = true, id1, id2, index_j, index_j2;
    for (index_j = 0; index_j < 2 && isWinner === true; ++index_j) {
        id1 = "cell_" + i + index_j;
        index_j2 = index_j + 1;
        id2 = "cell_" + i + index_j2;
        isWinner = parseCells(id1, id2, isWinner, "cell_" + i + "0", "cell_" + i + "1", "cell_" + i + "2", lastInput, index_j);
    }
}

function checkColumn(j, lastInput) {
    var isWinner = true, id1, id2, index_i, index_i2;
    for (index_i = 0; index_i < 2 && isWinner === true; ++index_i) {
        id1 = "cell_" + index_i + j;
        index_i2 = index_i + 1;
        id2 = "cell_" + index_i2 + j;
        isWinner = parseCells(id1, id2, isWinner, "cell_2" + j, "cell_1" + j, "cell_0" + j, lastInput, index_i);
    }
}

function checkDraw() {
    if (numberOfEntries === 9) {
        document.getElementById("winnerIndicatorMessage").innerHTML = "It's a DRAW!";
        document.getElementById("winnerIndicatorMessage").style.visibility = "visible";
        document.getElementById("playerIndicatorMessage").style.visibility = "hidden";
    }
}

function chooseBox(i, j) {
    if (numberOfEntries <= 9) {
        var valueInput = whoseTurn();
        var valueBox = document.getElementById("cell_" + i + j);
        if (valueBox.textContent === "") {
            valueBox.textContent = valueInput;
            ++numberOfEntries;
            if (i === j) {
                checkMainDiagonal(valueInput);
            }
            if (i + j === 2) {
                checkSecDiagonal(valueInput);
            }
            checkLine(i, valueInput);    //check only line i;
            checkColumn(j, valueInput);    //check only column j;
            checkDraw();
            var turn = whoseTurn();
            document.getElementById("playerIndicatorMessage").innerHTML = "It's " + turn + "'s turn";
        }
    }
}