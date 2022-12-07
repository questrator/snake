const snakeField = document.querySelector(".snake-field");
const go = document.querySelector(".go");
go.addEventListener("click", start);

document.body.addEventListener("keydown", changeDirection);

const config = {
    cols: 21,
    rows: 21,
    length: 3,
    direction: "u",
    head: [10, 10],
    tail: [],
    prevHead: [],
    prevEnd: [],
    play: false,
    timer: null,
    food: false,
    foodPos: [],
    speed: 200,
    yield: 0,
};

(function initField() {
    snakeField.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
    snakeField.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
    for (let i = 0; i < config.cols * config.rows; i++) {
        const cell = document.createElement("div");
        cell.dataset.pos = `${Math.floor(i % config.cols)}-${Math.floor(i / config.rows)}`;
        cell.classList.add("cell");
        snakeField.appendChild(cell);
    }    
})();

(function initSnake() {
    for (let i = 1; i <= config.length - 1; i++) {
        config.tail.push([config.head[0], config.head[1] + i]);
    }
    setSnake();
})();

function setSnake() {
    const headPos = `[data-pos="${config.head[0]}-${config.head[1]}"]`;
    const snakeHead = document.querySelector(headPos);
    snakeHead.classList.add("snake-head");
    const borders = {
        u: "head-up",
        d: "head-down",
        l: "head-left",
        r: "head-right",
        all: ["head-up", "head-down", "head-left", "head-right"]
    }
    
    borders.all.forEach(e => snakeHead.classList.remove(e));
    snakeHead.classList.add(borders[config.direction]);
    
    const tail = config.tail.slice(0).map(e => document.querySelector(`[data-pos="${e[0]}-${e[1]}"]`));
    tail.forEach(e => e.classList.add("snake-tail"));

    const tailEnd = `[data-pos="${config.tail[config.tail.length - 1][0]}-${config.tail[config.tail.length - 1][1]}"]`;
    const snakeEnd = document.querySelector(tailEnd);
    snakeEnd.classList.add("tail-end-up");
}

function start() {
    if (!config.food) setFoodCell();
    config.play = !config.play;
    if (config.play) config.timer = setInterval(render, config.speed);
    else clearInterval(config.timer);
}

function changeDirection(event) {
    if (config.play) {
        if (event.code === "KeyW" || event.key === "ArrowUp") {
            config.direction = "u";
        }
        else if (event.code === "KeyS" || event.key === "ArrowDown") {
            config.direction = "d";
        }
        else if (event.code === "KeyA" || event.key === "ArrowLeft") {
            config.direction = "l";
        }
        else if (event.code === "KeyD" || event.key === "ArrowRight") {
            config.direction = "r";
        }
        else return;
    }
}

function getNewPosition() {    
    if (config.food) config.prevEnd = config.tail.pop();
    config.tail = [[...config.head]].concat(config.tail);

    if (config.direction === "u") {
        if (config.head[1] === 0) config.head[1] = config.rows - 1;
        else config.head[1] -= 1;
    }
    if (config.direction === "d") {
        if (config.head[1] === config.rows - 1) config.head[1] = -1;
        config.head[1] += 1;
    }
    if (config.direction === "r") {        
        if (config.head[0] === config.cols - 1) config.head[0] = -1;
        config.head[0] += 1;
    }
    if (config.direction === "l") {
        if (config.head[0] === 0) config.head[0] = config.cols;
        config.head[0] -= 1;
    }
    clearPrevHead();
    clearPrevEnd();
}

function clearPrevEnd() {
    const prevEndPos = `[data-pos="${config.prevEnd[0]}-${config.prevEnd[1]}"]`;
    const prevEnd = document.querySelector(prevEndPos);
    prevEnd.classList.remove("snake-tail");
}

function clearPrevHead() {
    const prevHeadPos = `[data-pos="${config.prevHead[0]}-${config.prevHead[1]}"]`;
    const prevHead = document.querySelector(prevHeadPos);
    prevHead.classList.remove("snake-head");
}

function clearPrevFood() {
    const prevFoodPos = `[data-pos="${config.foodPos[0]}-${config.foodPos[1]}"]`;
    const prevFood = document.querySelector(prevFoodPos);
    prevFood.classList.remove("food-cell");
}

function randomizer(from, to) {
    return Math.round(Math.random() * (to - from) + from);
}

function setFoodCell() {
    const [x, y] = [randomizer(0, config.cols), randomizer(0, config.rows)];
    const foodCellPos = `[data-pos="${x}-${y}"]`;
    const foodCell = document.querySelector(foodCellPos);
    foodCell.classList.add("food-cell");
    config.food = true;
    config.foodPos = [x, y];
}

function isFoodEaten() {
    return config.head[0] === config.foodPos[0] && config.head[1] === config.foodPos[1];
}

function growSnake() {
    config.tail.push(config.prevEnd);
}

function render() {
    if (isFoodEaten()) {
        config.yield++;
        config.speed -= 10;
        growSnake();
        clearPrevFood();
        setFoodCell();
    }
    config.prevHead = config.head.slice(0);
    getNewPosition();
    setSnake();
}
