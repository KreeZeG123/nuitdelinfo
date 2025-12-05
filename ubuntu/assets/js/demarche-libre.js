document.addEventListener("DOMContentLoaded", () => {
  const checkerboard = document.querySelector(".checkerboard-bg");
  const scrollContainer = document.querySelector(".window-content");

  const snakeCanvas = document.createElement("canvas");
  snakeCanvas.style.position = "fixed";
  snakeCanvas.style.zIndex = 1000;
  snakeCanvas.style.cursor = "pointer";
  snakeCanvas.style.pointerEvents = "none";
  document.body.appendChild(snakeCanvas);

  const ctx = snakeCanvas.getContext("2d");
  const gridSize = 40;
  let snake = [];
  let direction = "UP";
  let nextDirection = "UP";
  let apple = null;
  let gameInterval = null;
  const speed = 200;

  function updateCanvasPositionAndSize() {
    const rect = checkerboard.getBoundingClientRect();

    snakeCanvas.style.left = rect.left + "px";
    snakeCanvas.style.top = rect.top + "px";

    const newWidth = Math.max(0, Math.floor(rect.width));
    const newHeight = Math.max(0, Math.floor(rect.height));

    if (snakeCanvas.width !== newWidth || snakeCanvas.height !== newHeight) {
      snakeCanvas.width = newWidth;
      snakeCanvas.height = newHeight;
    }
  }

  function getColsRows() {
    const cols = Math.max(1, Math.floor(snakeCanvas.width / gridSize));
    const rows = Math.max(1, Math.floor(snakeCanvas.height / gridSize));
    return { cols, rows };
  }

  function getCheckerColor(x, y) {
    const size = 40; // background-size réel du checkerboard
    const col = Math.floor(x / size);
    const row = Math.floor(y / size);
    return (row + col) % 2 === 0 ? "#2d3c5d" : "#475175";
  }

  function draw() {
    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    snake.forEach((seg, index) => {
      const x = seg.x * gridSize;
      const y = seg.y * gridSize;

      let fillColor;
      if (!gameInterval) {
        fillColor = getCheckerColor(x, y);
      } else {
        const gradient = ctx.createLinearGradient(
          x,
          y,
          x + gridSize,
          y + gridSize
        );
        gradient.addColorStop(0, "#00ff4c");
        gradient.addColorStop(1, "#009933");
        fillColor = gradient;
      }

      const radius = gridSize / 4;
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + gridSize - radius, y);
      ctx.quadraticCurveTo(x + gridSize, y, x + gridSize, y + radius);
      ctx.lineTo(x + gridSize, y + gridSize - radius);
      ctx.quadraticCurveTo(
        x + gridSize,
        y + gridSize,
        x + gridSize - radius,
        y + gridSize
      );
      ctx.lineTo(x + radius, y + gridSize);
      ctx.quadraticCurveTo(x, y + gridSize, x, y + gridSize - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.fill();

      if (index === 0) {
        const eyeRadius = gridSize / 8;
        let ex1, ey1, ex2, ey2;

        switch (direction) {
          case "UP":
            ex1 = gridSize / 4;
            ey1 = gridSize / 4;
            ex2 = (3 * gridSize) / 4;
            ey2 = gridSize / 4;
            break;
          case "DOWN":
            ex1 = gridSize / 4;
            ey1 = (3 * gridSize) / 4;
            ex2 = (3 * gridSize) / 4;
            ey2 = (3 * gridSize) / 4;
            break;
          case "LEFT":
            ex1 = gridSize / 4;
            ey1 = gridSize / 4;
            ex2 = gridSize / 4;
            ey2 = (3 * gridSize) / 4;
            break;
          case "RIGHT":
            ex1 = (3 * gridSize) / 4;
            ey1 = gridSize / 4;
            ex2 = (3 * gridSize) / 4;
            ey2 = (3 * gridSize) / 4;
            break;
        }

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x + ex1, y + ey1, eyeRadius, 0, Math.PI * 2);
        ctx.arc(x + ex2, y + ey2, eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + ex1, y + ey1, eyeRadius / 2, 0, Math.PI * 2);
        ctx.arc(x + ex2, y + ey2, eyeRadius / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (apple && gameInterval) {
      const x = apple.x * gridSize;
      const y = apple.y * gridSize;
      const appleRadius = gridSize / 2.5;

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x + gridSize / 2, y + gridSize / 2, appleRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "pink";
      ctx.beginPath();
      ctx.arc(
        x + gridSize / 2.5,
        y + gridSize / 2.5,
        appleRadius / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    if (gameInterval) {
      ctx.fillStyle = "red";
      ctx.font = "24px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ECHAPE pour arrêter le snake", 15, 15);
    }
  }

  function spawnApple() {
    const { cols, rows } = getColsRows();
    const positions = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (!snake.some((s) => s.x === x && s.y === y))
          positions.push({ x, y });
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

    const { cols, rows } = getColsRows();
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
      const { cols, rows } = getColsRows();
      snake = [{ x: cols - 2, y: rows - 2 }];
      direction = "UP";
      nextDirection = "UP";
      spawnApple();
      gameInterval = setInterval(moveSnake, speed);
      draw();
    }
  }

  function stopGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    const { cols, rows } = getColsRows();
    snake = [{ x: cols - 2, y: rows - 2 }];
    direction = "UP";
    nextDirection = "UP";
    apple = null;
    draw();
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
      case "z":
        e.preventDefault();
        if (direction !== "DOWN") nextDirection = "UP";
        break;
      case "ArrowDown":
      case "s":
        e.preventDefault();
        if (direction !== "UP") nextDirection = "DOWN";
        break;
      case "ArrowLeft":
      case "q":
        e.preventDefault();
        if (direction !== "RIGHT") nextDirection = "LEFT";
        break;
      case "ArrowRight":
      case "d":
        e.preventDefault();
        if (direction !== "LEFT") nextDirection = "RIGHT";
        break;
      case "Escape":
        e.preventDefault();
        stopGame();
        break;
    }
  });

  document.addEventListener(
    "click",
    (e) => {
      if (gameInterval) return;

      const rect = snakeCanvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const clickedOnSnake = snake.some(
        (seg) =>
          clickX >= seg.x * gridSize &&
          clickX < (seg.x + 1) * gridSize &&
          clickY >= seg.y * gridSize &&
          clickY < (seg.y + 1) * gridSize
      );

      if (clickedOnSnake) startGame();
    },
    { passive: true }
  );

  const scheduleUpdate = () => {
    updateCanvasPositionAndSize();

    const { cols, rows } = getColsRows();

    if (!gameInterval) {
      snake = [{ x: cols - 2, y: rows - 2 }];
    } else {
      snake = snake.map((seg) => ({
        x: Math.min(seg.x, cols - 1),
        y: Math.min(seg.y, rows - 1),
      }));
    }

    if (apple) {
      apple.x = Math.min(apple.x, cols - 1);
      apple.y = Math.min(apple.y, rows - 1);
    }

    draw();
  };

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("scroll", scheduleUpdate, { passive: true });

  scrollContainer.addEventListener(
    "scroll",
    () => {
      updateCanvasPositionAndSize();
      draw();
    },
    { passive: true }
  );

  const ro = new ResizeObserver(() => {
    scheduleUpdate();
  });
  ro.observe(checkerboard);

  updateCanvasPositionAndSize();
  const { cols, rows } = getColsRows();
  snake = [{ x: cols - 2, y: rows - 2 }];
  draw();
});
