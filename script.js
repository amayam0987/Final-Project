//add snakes functionality 
'use strict'

//defines html elements within page
let snakeContainer = document.getElementById('snake-container');
let snakeCanvas = document.getElementById('snake-canvas');

let scoreDisplay = document.getElementById('score');
let lengthDisplay = document.getElementById('length');

snakeCanvas.width = snakeContainer.offsetWidth - 60;
snakeCanvas.height = snakeCanvas.width / 2.5;


//declaring variable that can't be changed
const blocksX = 40;
const blocksY = 16;
const pixelsPerBlock = snakeCanvas.height / blocksY;

//declaring variables that can change
let score = 0;
let length = 1;


//divide by two, round, and subtract 1 
//coordinates for center
let centerX = (Math.ceil(blocksX / 2) - 1) * pixelsPerBlock;
let centerY = (Math.ceil(blocksY / 2) - 1) * pixelsPerBlock;

//time game loop will take to repeat
const interval = 80;

//handels events
//associates a direction to the keyboard keys
const eventKeysToDirection = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
    ArrowUp: 'up',
    ArrowLeft: 'left',
    ArrowDown: 'down',
    ArrowRight: 'right', 
};

const oppositeDirections = {
    right: 'left',
    left: 'right',
    up: 'down',
    down: 'up',
};

//objects represtenting the snake
// h is the head, b is  the body, F is the food
let snakeCoords = {
    H: { x: centerX, y: centerY },
    B: [],
    F: {},
};

//for food generation
do {
    snakeCoords.F = {
        x: Math.floor(Math.random() * blocksX) * pixelsPerBlock,
        y: Math.floor(Math.random() * blocksY) * pixelsPerBlock,
    };
} while (snakeCoords.F.x === centerX && snakeCoords.F. y === centerY);

//game variables
let gameOver = false;
let oppositeDirection = null;
let moveDirection = null;

//start repeating main loop amd start event listeners
let repeat = window.setInterval(main, interval);
document.addEventListener('keydown', event => {
    event.preventDefault();
    let direction  = eventKeysToDirection[event.key] || moveDirection;
    moveDirection = direction === oppositeDirection ? moveDirection : direction;
})

//FUNCTIONS

//main function controls everything
function main () {
    //snake movement
    moveSnake();

    //add conditions
    checkBounds();
    gameOver = checkPassThrough(snakeCoords.H);
    checkFood();
    
    //render display
    render();

    //game over
    if(gameOver) {
        clearInterval(repeat);
    }
}

//snake movement
function moveSnake() {
    //don't do anythig if direction is null
    if (moveDirection === null) {
        return;
    }

    //add current head to beginning of body
    snakeeCoords.B.unshift({ x: snakeCoords.H.x, y: snakeCoords.H.y });
    //make new head
    if (moveDirection === 'up') {
        snakeCoords.H.y -= pixelsPerBlock;
    } else if (moveDirection === 'down') {
        snakeCoords.H.y += pixelsPerBlock;
    } else if (moveDirection === 'right') {
        snakeCoords.H.x += pixelsPerBlock;
    } else {
        snakeCoords.H.x -= pixelsPerBlock;
    }

    //remove last element of body
    snakeCoords.B.pop();

    //add opposite moveDirection
    if (snakeCoords.B>length > 0) {
        oppositeDirection = oppositeDirections[moveDirection]
    }
}

//make sure snake isn't out of bounds
function checkBounds() {
    if (
        snakeCoords.H.x < 0 ||
        snakeCoords.H.x > snakeCanvas.width - pixelsPerBlock ||
        snakeCoords.H.y < 0 ||
        snakeCoords.H.y > snakeCanvas.height - pixelsPerBlock
    ) {
        gameeOver = true;
    }
}

// this function checks if the snake has collided with itself. It also helps the function check food
function checkPassThrough(obj) {
    if (!gameOver) {
        // the findindex function executes a function that is passed in from the user for every element in the array. We add a function and return a true or false value. if a true value is returned, findindex will return the index of the current element and -1 if nothing found.
        return(
            snakeCoords.B.findIndex(item => {
                return obj.x === item.x && obj.y === item.y;
            }) !== -1
        );
    } else {
        return gameOver;
    }
}

//checks if food has been eaten and updates screen and snake 
function checkFood() {
    if (
        snakeCoords.H.x === snakeCoords.F.x &&
        snakeCoords.H.y === snakeCoords.F.y &&
        !gameOver
    ) {
        //checks to see if snake has won
        do {
            snakeCoords.F = {
                x: Math.floor(Math.random() * blocksX) * pixelsPerBlock,
                y: Math.floor(Math.random() * blocksY) * pixelsPerBlock,
            };
        } while (
            (snakeCoords.F.x === snakeCoords.H.x && 
                snakeCoords.F.y === snakeCoords.H.y) ||
            checkPassThrough(snakeCoords.F)
        );
        //dummy data, idk what this means
        for ( let i = 0; i <3; i++) {
            snakeCoords.B.push(0);
        }

        //update score and length
        score++;
        length += 3;

    }
}
//draws snake on canvas
function render() {
    if (!gameOver) {
        let canvas = snakeCanvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'red';
        ctx.fillRect (
            snakeCoords.H.x, 
            snakeCoords.H.y,
            pixelsPerBlock,
            pixelsPerBlock,
        );
        ctx.fillStyle = 'black';
        for (let obj of snakeCoords.B) {
            ctx.fillRect(obj.x, obj.y, pixelsPerBlock, pixelsPerBlock);
        }
        //draws food blocks
        ctx.fillStyle = 'green';
        ctx.fillRect(
            snakeCoords.F.x, 
            snakeCoords.F.y, 
            pixelsPerBlock,
            pixelsPerBlock,
        );
        //changes score and length
        scoreDisplay.innerHTML = `Score: ${score}`;
        lengthDisplay.innerHTML = `Length: ${length}`;

    }
}

