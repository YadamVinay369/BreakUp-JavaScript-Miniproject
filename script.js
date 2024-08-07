const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
let maxScore = 0;

let level = 2;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: level,
  dx: level,
  dy: -level,
};

// Update ball speed when level changes
const updateBallSpeed=()=>{
    ball.speed = level
    ball.dx = level
    ball.dy = level
}

// event handler to handling different levels
easy.addEventListener("click", () => {
  level = 2;
  updateBallSpeed();
});
medium.addEventListener("click", () => {
  level = 3.5;
  updateBallSpeed();
});
hard.addEventListener("click", () => {
  level = 5;
  updateBallSpeed();
});

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visibility: true,
};

//create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

//Draw ball on canvas
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#FBF6E2";
  ctx.fill();
  ctx.closePath();
};

// Draw paddle on canvas
const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#FBF6E2";
  ctx.fill();
  ctx.closePath();
};

// Draw score on canvas
const drawScore = () => {
  ctx.font = "bold 20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 120, 40);
};

// Draw max score on canvas
const drawMaxScore = () => {
  ctx.font = "bold 20px Arial";
  ctx.fillText(`Max Score: ${maxScore}`, 45, 40);
};

// Draw bricks on canvas
const drawBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visibility ? "#FBF6E2" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
};

// Move paddle on canvas

const movePaddle = () => {
  paddle.x += paddle.dx;

  //Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

// Move ball on canvas
const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // wall collision detection (right and left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  // wall collision detection (top and bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visibility) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visibility = false;
          increaseScore();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    maxScore = maxScore < score ? score : maxScore;
    score = 0;
  }
};

// Increase Score
const increaseScore = () => {
  score++;
  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
};

// Make all bricks appear
const showAllBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visibility = true));
  });
};

// Draw everything
const draw = () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawMaxScore();
  drawBricks();
};

// Update canvas drawing and animation
const update = () => {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
};

update();

//keydown event
const keyDown = (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
};

//keyup event
const keyUp = (e) => {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
};

//keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//Rules event handler and close event handler
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));


//Loading 

let loader = document.querySelector("#loader");

window.addEventListener("load",()=>{
  let x = setTimeout(()=>{loader.style.display = "none"
    console.log("called")
  },3000)
  
})