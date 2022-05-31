function generate(matLen,gr,grEat, pred, bust, bomb) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < bust; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        
        if (x > matLen/2) {
            x = x - 10;
        }
        else if (x < matLen/2) {
            x = x + 10;
        }
        if (y > matLen/2) {
            y = y - 10;
        }
        else if (y < matLen/2) {
            y = y + 10;
        }
        if(matrix[y][x] == 0) {
            matrix[y][x] = 4;
            directions = [
                [x - 1, y - 1],
                [x, y - 1],
                [x - 1, y],
            ];
            for (var j in directions) {
                var corX = directions[j][0];
                var corY = directions[j][1];
                matrix[corY][corX] = 4;
            }
        }
    }

    for (let i = 0; i < bomb; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }

    return matrix
}

let matrix = generate(40, 100, 70, 20, 5, 5)


var side = 15;
let grassArr = []
let grassEaterArr = []
let predArr = []
let bustArr = []
let bombArr = []


function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Bust(x, y)
                bustArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Bomb(x, y)
                bombArr.push(gr)
            }
        }
    }
}

function draw() {

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
            rect(x * side, y * side, side, side);
        }
    }

    for(var i in grassArr){
        grassArr[i].mul()
    }

    for(let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predArr) {
        predArr[i].eat()
    }

    for (let i in bombArr) {
        bombArr[i].destroy()
    }
}