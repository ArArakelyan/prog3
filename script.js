var socket = io();

var side = 15;

function setup() {
    frameRate(5);
    createCanvas(40 * side, 40 * side);
    background('#acacac');
}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("cyan")
            }
            else if (matrix[y][x] == 5) {
                fill("black")
            }
            else if (matrix[y][x] == 6) {
                fill("blue")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(function () {
    socket.on('send matrix', drawMatrix)
}, 500)