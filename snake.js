const snakeField = document.querySelector(".snake-field");
document.body.addEventListener("keydown", changeDirection);
const config = {
    cols: 40,
    rows: 40,
    length: 4,
    body: [[20, 21], [20, 22], [20, 23]],
    head: [20, 20],
    direction: "u",
};

function initField(cols, rows) {
    snakeField.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    snakeField.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.dataset.pos = `${Math.floor(i / rows)}-${Math.floor(i % cols)}`;
        cell.classList.add("cell");
        snakeField.appendChild(cell);
    }
}
initField(config.cols, config.rows);

function getSnake(head, body) {
    const headPos = `[data-pos="${head[0]}-${head[1]}"]`;
    const snakeHead = document.querySelector(headPos);
    snakeHead.classList.add("snake-head");
}
getSnake(config.head, config.body);

function getNewPosition() {

}

function changeDirection(event) {
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
    console.log(config.direction)
}