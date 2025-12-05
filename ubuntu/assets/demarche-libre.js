document.addEventListener("DOMContentLoaded", () => {
  const checkerboard = document.querySelector(".checkerboard-bg");
  const scrollContainer = document.querySelector(".window-content"); // <- conteneur scrollable

  // Canvas couvrant toute la div visible
  const snakeCanvas = document.createElement("canvas");
  snakeCanvas.style.position = "absolute";
  snakeCanvas.style.top = "0";
  snakeCanvas.style.left = "0";
  snakeCanvas.style.zIndex = 1000;
  snakeCanvas.style.cursor = "pointer";
  checkerboard.appendChild(snakeCanvas);

  // Dimension exacte du canvas par rapport au checkerboard
  snakeCanvas.width = checkerboard.clientWidth;
  snakeCanvas.height = checkerboard.clientHeight;

  const ctx = snakeCanvas.getContext("2d");

  const gridSize = 40;
  const cols = Math.floor(snakeCanvas.width / gridSize);
  const rows = Math.floor(snakeCanvas.height / gridSize);

  let snake = [{ x: 0, y: 0 }];
  let direction = "RIGHT";
  let nextDirection = "RIGHT";
  let apple = null;
  let gameInterval = null;
  const speed = 200;

  function draw() {
    // Offset scroll du conteneur
    const scrollTop = scrollContainer.scrollTop;
    const scrollLeft = scrollContainer.scrollLeft;

    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    ctx.fillStyle = "#00ff4c";
    snake.forEach((seg) => {
      ctx.fillRect(
        seg.x * gridSize - scrollLeft,
        seg.y * gridSize - scrollTop,
        gridSize,
        gridSize
      );
    });

    if (apple) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        apple.x * gridSize - scrollLeft,
        apple.y * gridSize - scrollTop,
        gridSize,
        gridSize
      );
    }
  }

  function spawnApple() {
    const positions = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (!snake.some((s) => s.x === x && s.y === y)) {
          positions.push({ x, y });
        }
      }
    }
    if (positions.length === 0) return;
    apple = positions[Math.floor(Math.random() * positions.length)];
  }

  function moveSnake() {
    const head = { ...snake[0] };
    direction = nextDirection;

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    if (head.x < 0) head.x = cols - 1;
    if (head.x >= cols) head.x = 0;
    if (head.y < 0) head.y = rows - 1;
    if (head.y >= rows) head.y = 0;

    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      stopGame();
      return;
    }

    snake.unshift(head);

    if (apple && head.x === apple.x && head.y === apple.y) {
      spawnApple();
    } else {
      snake.pop();
    }

    draw();
  }

  function startGame() {
    if (!gameInterval) {
      snake = [{ x: 0, y: 0 }];
      nextDirection = "RIGHT";
      spawnApple();
      gameInterval = setInterval(moveSnake, speed);
    }
  }

  function stopGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    snake = [{ x: 0, y: 0 }];
    apple = null;
    draw();
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (direction !== "DOWN") nextDirection = "UP";
        break;
      case "ArrowDown":
        e.preventDefault();
        if (direction !== "UP") nextDirection = "DOWN";
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (direction !== "RIGHT") nextDirection = "LEFT";
        break;
      case "ArrowRight":
        e.preventDefault();
        if (direction !== "LEFT") nextDirection = "RIGHT";
        break;
      case "Escape":
        e.preventDefault();
        stopGame();
        break;
    }
  });

  snakeCanvas.addEventListener("click", () => {
    if (!gameInterval) startGame();
  });

  // Redessine le snake quand on scroll le vrai conteneur
  scrollContainer.addEventListener("scroll", draw);

  window.addEventListener("resize", () => {
    snakeCanvas.width = checkerboard.clientWidth;
    snakeCanvas.height = checkerboard.clientHeight;
    draw();
  });

  draw();
});
