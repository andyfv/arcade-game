// Enemies our player must avoid
var Enemy = function(locationY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = 60 + (85 * (locationY - 1));
    this.speed;
    this.randomSpeed();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.checkBoundary()){
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function() {
    min = Math.ceil(100);
    max = Math.floor(400);
    this.speed = Math.floor(Math.random() * (max - min) + min);
    //this.speed = Math.floor((Math.random()*9));
}

Enemy.prototype.checkBoundary = function() {
    if(this.x > 505){
        this.resetPosition();
        this.randomSpeed();
        return false;
    } else {
        return true;
    }
}

Enemy.prototype.resetPosition = function() {
    this.randomPosition();
}

Enemy.prototype.randomPosition = function() {
    min = Math.ceil(-500);
    max = Math.floor(-100);
    this.x = Math.floor(Math.random() * (max - min) + min);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x;
        this.y;
        this.sprite = 'images/char-boy.png';
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode){
        switch(keyCode){
            case 37:
                break;
            case 38:
                break;
            case 39: 
                break;
            case 40: 
                break;
            default: 
                break;
        }
    }

    checkBoundary(){
        if (this.x > 101 && this.x < (505 - 101)) {

        }
    }


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.which]);
});

let allEnemies;
let enemy1 = new Enemy(1);
let enemy2 = new Enemy(2);
let enemy3 = new Enemy(3);
allEnemies = [enemy1, enemy2, enemy3];