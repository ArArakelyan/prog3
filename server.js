var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var fs = require('fs')

app.use(express.static('.'))

app.get('/', function (req, res) {
    res.redirect('index.html')
})
server.listen(3000)

function generate(matLen,gr,grEat, pred, bust, bomb, kam) {
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

    for (let i = 0; i < kam; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }

    return matrix
}

matrix = generate(40, 100, 70, 20, 5, 10, 10)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predArr = []
bustArr = []
bombArr = []
kamikadzeArr = []

Grass = require('./grass')
GrassEater = require('./grasseater')
Predator = require('./predator')
Bomb = require('./bomb')
Bust = require('./bust')
Kamikadze = require('./kamikadze')

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gret = new GrassEater(x, y)
                grassEaterArr.push(gret)
            } else if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                predArr.push(pr)
            } else if (matrix[y][x] == 4) {
                let bu = new Bust(x, y)
                bustArr.push(bu)
            } else if (matrix[y][x] == 5) {
                let bo = new Bomb(x, y)
                bombArr.push(bo)
            } else if (matrix[y][x] == 6) {
                let ka = new Kamikadze(x, y)
                kamikadzeArr.push(ka)
            }
        }
    }
    let objectCount = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        predator: predArr.length,
        bust: bustArr.length,
        bomb: bombArr.length,
        kamikadze: kamikadzeArr.length
    }

    let data = JSON.stringify(objectCount, null, 2)
    fs.writeFile('statistics.json', data, function(err){
        console.log('Process finished');
    })

    io.sockets.emit('send matrix', matrix)
}

function gamePlay() {
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

    for (let i in kamikadzeArr) {
        kamikadzeArr[i].eat()
    }

    io.sockets.emit('send matrix', matrix)
}

setInterval(gamePlay, 500)

io.on('connection', function () {
    createObject(matrix)
})