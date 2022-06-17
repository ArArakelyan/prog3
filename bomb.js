module.exports = class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    destroy() {
        for (var i in this.directions) {
            var desX = this.directions[i][0]
            var desY = this.directions[i][1]
            if (desX >= 0 && desX < matrix[0].length && desY >= 0 && desY < matrix.length) {
                if (matrix[desY][desX] == 1) {
                    matrix[desY][desX] = 0
                    for (var i in grassArr) {
                        if (desX == grassArr[i].x && desY == grassArr[i].y) {
                            grassArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[desY][desX] == 2) {
                    matrix[desY][desX] = 0
                    for (var i in grassEaterArr) {
                        if (desX == grassEaterArr[i].x && desY == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[desY][desX] == 3) {
                    matrix[desY][desX] = 0
                    for (var i in predArr) {
                        if (desX == predArr[i].x && desY == predArr[i].y) {
                            predArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[desY][desX] == 4) {
                    matrix[desY][desX] = 0
                    for (var i in bustArr) {
                        if (desX == bustArr[i].x && desY == bustArr[i].y) {
                            bustArr.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
} 