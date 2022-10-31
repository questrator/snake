const snakeField = document.querySelector(".snake-field");
const go = document.querySelector(".go");
go.addEventListener("click", start);

document.body.addEventListener("keydown", changeDirection);

const config = {
    cols: 51,
    rows: 51,
    length: 4,
    body: [[26, 27], [26, 28], [26, 29]],
    head: [26, 26],
    direction: "u",
    prevHead: [null, null],
    goFlag: false,
    timer: null,
    food: false,
};

function start() {
    if (!config.food) {
        getFoodCell();
    }
    config.goFlag = !config.goFlag;
    if (config.goFlag) config.timer = setInterval(render, 300);
    else clearInterval(config.timer);
}

function initField(cols, rows) {
    snakeField.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    snakeField.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.dataset.pos = `${Math.floor(i % cols)}-${Math.floor(i / rows)}`;
        cell.classList.add("cell");
        snakeField.appendChild(cell);
    }
}
initField(config.cols, config.rows);

function getSnake() {
    const headPos = `[data-pos="${config.head[0]}-${config.head[1]}"]`;
    const snakeHead = document.querySelector(headPos);
    snakeHead.classList.add("snake-head");
}
getSnake(config.head, config.body);

function getNewPosition() {    
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
}

function changeDirection(event) {
    if (config.goFlag) {
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

function clearPrevHead() {
    const prevHeadPos = `[data-pos="${config.prevHead[0]}-${config.prevHead[1]}"]`;
    const prevHead = document.querySelector(prevHeadPos);
    prevHead.classList.remove("snake-head");
}

function randomizer(from, to) {
    return Math.round(Math.random() * (to - from) + from);
}

function getFoodCell() {
    const [x, y] = [randomizer(0, config.cols), randomizer(0, config.rows)];
    const foodCellPos = `[data-pos="${x}-${y}"]`;
    const foodCell = document.querySelector(foodCellPos);
    foodCell.classList.add("food-cell");
    config.food = true;
}

function render() {
    config.prevHead = config.head.slice(0);
    getNewPosition();
    getSnake();
    console.log(config.head)
}
