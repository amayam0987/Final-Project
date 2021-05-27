//declaring variable that can't be changed
const blocksX = 40;
const blocksY = 16;
const pixelsPerBlock = snakeCanvas.height / blocksY;

//declaring variables that can change
let scores = 0;
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

const oppositeDirection = {
    right: 'left',
    left: 'right',
    up: 'down',
    down: 'up',
};

//objects represtenting the snake
// h is the head, b is  the body, F is the food