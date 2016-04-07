//Superclass, subclasses inherit from
var Person = function(){};

// Draw the enemy on the screen, required method for game
Person.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    Person.call(this, x, y, speed);
    // we've provided one for you to get started
     
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x =x;
    this.y = y;
    this.speed = speed;
    //to determine the collision this values are used
    this.w = 101 / 3;
    this.h = 171 / 3;
};

Enemy.prototype = Object.create(Person.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Updates and multiplies the enemies given speed by time
    this.x = this.x + (this.speed * dt);
    if (this.x > 500){
        this.x = -this.x;
    }
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    Person.call(this);
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 320;
    //The w value represents its width and the h value represents its height. 
    // values are used to determinea collision if conditions are met.
    this.w = 101 / 3;
    this.h = 171 / 3;
    //player movements in each direction based on tile size.
    this.movX = 83;
    this.movY = 101;
};
Player.prototype = Object.create(Person.prototype);
Player.prototype.constructor = Player;

//Updating the players current position when moving across the screen.
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
};

//An event listener is set to detect keyup positions of the arrows keys
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= this.movX;
        if (this.x < 0)
            this.x = 0;
    }
    if (key === 'right') {
        this.x += this.movX;
        if (this.x > 400) {
            this.x = 400;
        }
    }
    if (key === 'up') {
        this.y -= this.movY;
        if (this.y < 0)
            this.y = 0;
    }
    if (key === 'down') {
        this.y += this.movY;
        if (this.y > 400) {
            this.y = 400;
        }
    }
};

//Checks for collisions between player
//Box algorithm found on Mozilla Developer Network.
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++)
        if (this.x < allEnemies[i].x + allEnemies[i].w &&
            this.x + this.w > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].h &&
            this.h + this.y > allEnemies[i].y) {
            this.x = 200;
            this.y = 320;
            console.log("You died!");
        }
};

// If the player reaches the water the console logs "You won,"
//and sets the player position to initial
Player.prototype.victory = function() {
    if (this.y === 0) {
        console.log("You won!");
        this.x = 200;
        this.y = 320;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

//Array with new enemies each given x and y position with speed value
var allEnemies = [
    new Enemy(-100, 60, 200),
    new Enemy(-50, 145, 225),
    new Enemy(-200, 225, 175)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
