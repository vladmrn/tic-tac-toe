function refreshPage() {
    window.location.reload();
}

var inputPlayer = "X";
var numberOfEntries = 0;
var matrixBoxes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function whosTurn() {
    document.getElementById("whosTurn").innerHTML = inputPlayer;
}

function chooseBox(i, j) {
    if (numberOfEntries <= 9) {
        var valueBox = document.getElementById("cell_" + i + j);
        if (valueBox.textContent != "X" && valueBox.textContent != "0") {
            matrixBoxes[i][j] = inputPlayer;
            ++numberOfEntries;
            valueBox.textContent = inputPlayer;
            if (inputPlayer === "X") {
                inputPlayer = "0";
            } else if (inputPlayer === "0") {
                inputPlayer = "X";
            }
        }
        checkWinner(i, j);
        whosTurn();
    }
}

function checkWinner(i, j) {
    var isWinner = true;
    //looking for winning principal diagonal;
    if (i === j) {
        for (var index = 0; index < 2 && isWinner === true; ++index) {
            if (matrixBoxes[index][index] !== matrixBoxes[index + 1][index + 1]) {
                isWinner = false;
            }
        }
        if (isWinner === true) {
            numberOfEntries = 10;
            markVictory("cell_00", "cell_11", "cell_22");
        } else {
            isWinner = true;
        }
    }
    //looking for winning secondary diagonal;
    if (i + j === 2) {
        for (var index_i = 2, index_j = 0; index_i > 0 && index_j < 2 && isWinner === true; --index_i, ++index_j) {
            if (matrixBoxes[index_i][index_j] != matrixBoxes[index_i - 1][index_j + 1]) {
                isWinner = false;
            }
        }
        if (isWinner === true) {
            numberOfEntries = 10;
            markVictory("cell_20", "cell_11", "cell_02");
        } else {
            isWinner = true;
        }
    }
    //looking for winning columns;
    for (var index_i = 0; index_i < 2 && isWinner === true; ++index_i) {
        if (matrixBoxes[index_i][j] != matrixBoxes[index_i + 1][j]) {
            isWinner = false;
        }
    }
    if (isWinner === true) {
        numberOfEntries = 10;
        markVictory("cell_2" + j, "cell_1" + j, "cell_0" + j);
    } else {
        isWinner = true;
    }
    //looking for winning rows;
    for (var index_j = 0; index_j < 2 && isWinner === true; ++index_j) {
        if (matrixBoxes[i][index_j] != matrixBoxes[i][index_j + 1]) {
            isWinner = false;
        }
    }
    if (isWinner === true) {
        numberOfEntries = 10;
        markVictory("cell_" + i + "0", "cell_" + i + "1", "cell_" + i + "2");
    }
    if (numberOfEntries === 9) {
        document.getElementById("winnerIndicatorMessage").innerHTML = "It's a DRAW!";
        document.getElementById("winnerIndicatorMessage").style.visibility = "visible";
        document.getElementById("playerIndicatorMessage").style.visibility = "hidden";
    }
}

function markVictory(cell1, cell2, cell3) {
    if (inputPlayer === "X") {
        inputPlayer = "0";
    } else if (inputPlayer === "0") {
        inputPlayer = "X";
    }
    document.getElementById("winner").innerHTML = inputPlayer;
    document.getElementById("winnerIndicatorMessage").style.visibility = "visible";
    document.getElementById("playerIndicatorMessage").style.visibility = "hidden";
    document.getElementById(cell1).style.color = "green";
    document.getElementById(cell2).style.color = "green";
    document.getElementById(cell3).style.color = "green";
}