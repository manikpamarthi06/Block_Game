//1. ball props
let ball_x, ball_y, ball_dx, ball_dy, ball_radius;

//2. paddle props
let paddle_x, paddle_y, paddle_height, paddle_width, paddle_dx;

//3. blocks props
let bricks = [];
//     [
//   [{x: 20, y: 30, width: 80, height: 25, v: true},
//    {x:110, y: 30, width: 80, height: 25, v: true},
//    {x: 200, y: 30, width: 80, height: 25, v: true},
//    {x: 290, y: 30, width: 80, height: 25, v: true}],
//   [{x: 20, y: 80, width: 80, height: 25, v: true},
//    {x:110, y: 80, width: 80, height: 25, v: true},
//    {x: 200, y: 80, width: 80, height: 25, v: true},
//    {x: 290, y: 80, width: 80, height: 25, v: true}]
// ];

let lives = 3, score = 0;
let rows = 4, columns = 4;

function setup() {
  createCanvas(400, 400); 
  // score = 0;
  
  //1. ball props
  ball_x = width / 2;
  ball_y = height / 2 + 100;
  ball_dx = 2;
  ball_dy = -1.6;
  ball_radius = 25;
  
  //2. paddle props
  paddle_width = 80;
  paddle_x = (width/2) - (paddle_width/2);
  paddle_y = height - 20;
  paddle_height = 15;
  paddle_dx = 5;
  
  //3. block props
  block_width = 80;
  block_x = 30;
  block_y = 30;
  block_height = 15;
  
  
  for(let i = 0; i < rows; i++){
    let rows = [];
    for(let j = 0; j < columns; j++){
      rows.push({
        x: i*90 + 20,
        y: j*50 + 40,
        width: 80,
        height:30,
        v: true,
      });
    }
    // console.log(rows);
    bricks.push(rows);
  }
  // console.log(bricks[3][2].x);
}



function draw() {
  background("black");
  
  ball_x += ball_dx;
  ball_y += ball_dy;
  
  fill("green")
  text(`Score: ${score}`, width -100, 20);
  text(`Lives: ${lives}`, 10, 20);
  
  if(keyIsDown(RIGHT_ARROW) && (paddle_x + paddle_width <= width)){
    paddle_x += paddle_dx;
  }
  
  if(keyIsDown(LEFT_ARROW) && (paddle_x >= 0)){
    paddle_x -= paddle_dx;
  }
  
  fill("white");
  
  circle(ball_x, ball_y, ball_radius); //movement of ball
  
  
  rect(paddle_x, paddle_y, paddle_width, paddle_height); //movement of paddle
   if(score === rows * columns){
    fill("green");
    ball_dx = ball_dy = 0;
    text("You Won", width/2 - 50, height/2);
  }
  
  if(lives === 0){
    fill("red");
    ball_dx = ball_dy = 0;
    text("Game Over,You Lost!!!", width/2 - 75, height/2 + 60)
  }
  
  fill("red");
  //Block creation
  // rect(block_x, block_y, block_width, block_height);
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
      if(bricks[i][j].v){
        rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].width, bricks[i][j].height)
        
        //1. bottom of the block
        
         if((ball_x >= bricks[i][j].x && ball_x <= bricks[i][j].x + bricks[i][j].width) &&                 (ball_y - ball_radius/2 <= bricks[i][j].y + bricks[i][j].height && ball_y - ball_radius/2 >= bricks[i][j].y)){
          ball_dy = -(ball_dy);
          score++;
          bricks[i][j].v = false;
          bricks[i][j].width = 0;
          bricks[i][j].height = 0;
        }
        
        //2. top of the block
        
         if((ball_x >= bricks[i][j].x && ball_x <= bricks[i][j].x + bricks[i][j].width) &&                 (ball_y + ball_radius/2 <= bricks[i][j].y && ball_y + ball_radius/2 >= bricks[i][j].y + bricks[i][j].height)){
            ball_dy = -(ball_dy);
            score++;
            bricks[i][j].v = false;
            bricks[i][j].width = 0;
            bricks[i][j].height = 0;
        }
        
        //3.right of the block
        
        if((ball_y >= bricks[i][j].y && ball_y <= bricks[i][j].y + bricks[i][j].height) &&
          (ball_x + ball_radius/2 >= bricks[i][j].x && ball_x + ball_radius/2 <= bricks[i][j].x+bricks[i][j].width)){
            ball_dx = -(ball_dx);
            score++;
            bricks[i][j].v = false;
            bricks[i][j].width = 0;
            bricks[i][j].height = 0;
        }
        
        //4.left of the block
        
        if((ball_y >= bricks[i][j].y && ball_y <= bricks[i][j].y + bricks[i][j].height) &&
          (ball_x - ball_radius/2 >= bricks[i][j].x && ball_x - ball_radius/2 <= bricks[i][j].x+bricks[i][j].width)){
            ball_dx = -(ball_dx);
            score++;
            bricks[i][j].v = false;
            bricks[i][j].width = 0;
            bricks[i][j].height = 0;
        }
      }
    }
  }
  
  // 1. right side of box and left of the box
  if((ball_x + (ball_radius /2)) > width || (ball_x - (ball_radius/2)) < 0) {
    ball_dx = -(ball_dx);
  }
  
  //2 . left side of box
  else if((ball_y - (ball_radius/2)) < 0){
    ball_dy = -(ball_dy);
  }
  
  //3. ball hitting paddle
  else if((ball_y + (ball_radius/2)) >= paddle_y && (ball_x >= paddle_x) && (ball_x <= paddle_x + paddle_width)){
    ball_dy = -(ball_dy);
  } 
  
  // 4 . bottom of the box
  else if((ball_y + (ball_radius / 2)) > height){
    ball_dy = 0;
    ball_dx = 0;
    lives--;
    setup();
  }
  
}