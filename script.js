var numberOfEntries = 0;

function refreshPage() {
    window.location.reload();
}

function chooseBox(i, j) {
    if (numberOfEntries <= 9) {
        var valueInput = whosTurn();
        var valueBox = document.getElementById("cell_" + i + j);
        if (valueBox.textContent === "") {
            valueBox.textContent = valueInput;
            ++numberOfEntries;
            checkWinner(i, j, valueInput);
            var turn = whosTurn();
            document.getElementById("playerIndicatorMessage").innerHTML = "It's " + turn + "'s turn";
        }
    }
}

function whosTurn() {
    if (numberOfEntries % 2 === 0) {
        return turn = "X";
    }
    return turn = "0";
}

function checkWinner(i, j, lastInput) {
    var isWinner = true;
    //looking for winning principal diagonal;
    if (i === j) {
        for (var index = 0; index < 2 && isWinner === true; ++index) {

            var id1 = "cell_" + index + index;
            var index2 = index + 1;
            var id2 = "cell_" + index2 + index2;
            if (document.getElementById(id1).textContent != document.getElementById(id2).textContent) {
                isWinner = false;
            }
        }
        isWinner = checkFlagIsWinner(isWinner, "cell_00", "cell_11", "cell_22", lastInput);
    }
    //looking for winning secondary diagonal;
    if (i + j === 2) {
        for (var index_i = 2, index_j = 0; index_i > 0 && index_j < 2 && isWinner === true; --index_i, ++index_j) {
            var id1 = "cell_" + index_i + index_j;
            var index_i2 = index_i - 1;
            var index_j2 = index_j + 1;
            var id2 = "cell_" + index_i2 + index_j2;
            if (document.getElementById(id1).textContent != document.getElementById(id2).textContent) {
                isWinner = false;
            }
        }
        isWinner = checkFlagIsWinner(isWinner, "cell_20", "cell_11", "cell_02", lastInput);
    }
    //looking for winning columns;
    for (var index_i = 0; index_i < 2 && isWinner === true; ++index_i) {
        var id1 = "cell_" + index_i + j;
        var index_i2 = index_i + 1;
        var id2 = "cell_" + index_i2 + j;
        if (document.getElementById(id1).textContent != document.getElementById(id2).textContent) {
            isWinner = false;
        }
    }
    isWinner = checkFlagIsWinner(isWinner, "cell_2" + j, "cell_1" + j, "cell_0" + j, lastInput);
    //looking for winning rows;
    for (var index_j = 0; index_j < 2 && isWinner === true; ++index_j) {
        var id1 = "cell_" + i + index_j;
        var index_j2 = index_j + 1;
        var id2 = "cell_" + i + index_j2;
        if (document.getElementById(id1).textContent != document.getElementById(id2).textContent) {
            isWinner = false;
        }
    }
    isWinner = checkFlagIsWinner(isWinner, "cell_" + i + "0", "cell_" + i + "1", "cell_" + i + "2", lastInput);
    //mark DRAW;
    if (numberOfEntries === 9) {
        document.getElementById("winnerIndicatorMessage").innerHTML = "It's a DRAW!";
        document.getElementById("winnerIndicatorMessage").style.visibility = "visible";
        document.getElementById("playerIndicatorMessage").style.visibility = "hidden";
    }
}

function checkFlagIsWinner(isWinner, cell1, cell2, cell3, lastInput) {
    if (isWinner === true) {
        numberOfEntries = 10;
        markVictory(cell1, cell2, cell3, lastInput);
    } else {
        return isWinner = true;
    }
}

function markVictory(cell1, cell2, cell3, lastInput) {
    document.getElementById("winner").innerHTML = lastInput;
    document.getElementById("winnerIndicatorMessage").style.visibility = "visible";
    document.getElementById("playerIndicatorMessage").style.visibility = "hidden";
    document.getElementById(cell1).style.color = "green";
    document.getElementById(cell2).style.color = "green";
    document.getElementById(cell3).style.color = "green";
}
