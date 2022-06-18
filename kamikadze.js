let LivingCreature = require('./creature')

module.exports = class Kamikadze extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.status = 'alive'
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell(character, character2) {
        this.getNewCoordinates()
        return super.chooseCell(character, character2);
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        this.move()
        var emptyCells = this.chooseCell(5);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.status == 'alive') {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in bombArr) {
                if (newX == bombArr[i].x && newY == bombArr[i].y) {
                    bombArr.splice(i, 1);
                    break;
                }
            }
            this.status = 'died'

        } else if (this.status == 'died'){
            this.die()
        }
    }
    
    die() {
        matrix[this.y][this.x] = 0
        for (var i in kamikadzeArr) {
            if (this.x == kamikadzeArr[i].x && this.y == kamikadzeArr[i].y) {
                kamikadzeArr.splice(i, 1);
                break;
            }
        }
    }
}