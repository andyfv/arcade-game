// Enemies our player must avoid

const modal = document.getElementById('modal');
const restartButton = document.getElementById('restart');

var Enemy = function (locationY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = 60 + (this.stepY * (locationY - 1));
    this.speed;
    this.randomSpeed();
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.stepX = 101;
Enemy.prototype.stepY = 83;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.checkBoundary()) {
        if (this.isColliding()) {
            player.resetPlayer();
        } else {
            this.x += this.speed * dt;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function () {
    min = Math.ceil(100);
    max = Math.floor(400);
    this.speed = Math.floor(Math.random() * (max - min) + min);
    //this.speed = Math.floor((Math.random()*9));
}

Enemy.prototype.checkBoundary = function () {
    if (this.x > 505) {
        this.resetPosition();
        this.randomSpeed();
        return false;
    } else {
        return true;
    }
}

Enemy.prototype.resetPosition = function () {
    this.randomPosition();
}

Enemy.prototype.randomPosition = function () {
    min = Math.ceil(-500);
    max = Math.floor(-100);
    this.x = Math.floor(Math.random() * (max - min) + min);
}

Enemy.prototype.isColliding = function () {
    if (((player.x + 20 - (this.x + this.stepX) < 0) &&
            (this.x - (player.x - 20 + this.stepX) < 0)) &&
        (((player.y + 60) - (this.y + this.stepY) < 0) &&
            (this.y - (player.y - 30 + this.stepY) < 0))) {
        Stats.decreaseLives();
        return true;
    } else {
        return false;
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x;
        this.y;
        this.sprite = 'images/char-boy.png';
        this.resetPlayer();
    }

    update(xShift, yShift) {
        this.x += xShift;
        this.y += yShift;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {
        const stepX = 101;
        const stepY = 83;
        switch (keyCode) {
            case 'left':
                if (this.checkBoundaryX(-stepX)) {
                    this.update(-stepX, 0);
                }
                break;
            case 'up':
                if (this.checkBoundaryY(-stepY)) {
                    this.update(0, -stepY);
                    if (this.reachedWater()) {
                        this.resetPlayer();
                    }
                }
                break;
            case 'right':
                if (this.checkBoundaryX(stepX)) {
                    this.update(stepX, 0);
                }
                break;
            case 'down':
                if (this.checkBoundaryY(stepY)) {
                    this.update(0, stepY);
                }
                break;
            default:
                break;
        }
    }

    reachedWater() {
        if (this.y < 73) {
            Stats.increaseScore();
            return true;
        } else {
            return false;
        }

    }

    checkBoundaryX(step) {
        return ((this.x + step) >= 0 && (this.x + step) <= 404) ? true : false;
    }

    checkBoundaryY(step) {
        return ((this.y + step) >= -10 && (this.y + step <= 405)) ? true : false;
    }

    resetPlayer() {
        this.x = 202;
        this.y = 405;
    }

}


let Stats = {
    scoreElement: document.getElementById('score'),
    livesElemenet: document.getElementsByClassName('fa-heart'),
    lives: 3,
    score: 0,
    decreaseLives: function () {
        //((lives - 1) === 0) ? gameOver(): (lives - 1);
        if ((this.lives - 1) === 0) {
            gameOver();
        } else {
            this.lives--;
            this.livesElemenet[this.lives].style.color = 'grey';
        }
    },

    increaseScore: function () {
        this.score++;
        this.scoreElement.innerText = this.score;
    },

    resetStats: function () {
        this.resetLives();
        this.resetScore();
    },

    resetLives: function () {
        this.lives = 3;
        for (star of this.livesElemenet) {
            star.style.color = 'tomato';
        }
    },

    resetScore: function () {
        this.score = 0;
        this.scoreElement.innerText = this.score;
    }
};

function gameOver() {
    document.removeEventListener('keyup', arrowKeys);
    modal.style.display = 'flex';
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies;
let enemy1 = new Enemy(1);
let enemy2 = new Enemy(2);
let enemy3 = new Enemy(3);
allEnemies = [enemy1, enemy2, enemy3];

let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', arrowKeys);

function arrowKeys(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.which]);
}


//Listens if the restart button is clicked
restart.addEventListener('click', function () {
    document.addEventListener('keyup', arrowKeys);
    Stats.resetStats();
    player.resetPlayer();
    modal.style.display = 'none';
});