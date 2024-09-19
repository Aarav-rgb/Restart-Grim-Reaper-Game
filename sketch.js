var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  initializeGame();
}

function draw() {
  background(0);

  if (gameState === "play") {
    handleControls();
    if (tower.y > 400) {
      tower.y = 300;
    }
    spawnDoors();
    checkCollisions();
    drawSprites();
  } else if (gameState === "end") {
    displayGameOver();
    if (mouseIsPressed || keyWentDown("r")) {
      initializeGame();
    }
  }
}

function handleControls() {
  if (keyDown("left_arrow")) {
    ghost.x -= 3;
  }
  if (keyDown("right_arrow")) {
    ghost.x += 3;
  }
  if (keyDown("space")) {
    ghost.velocityY = -10;
  }
  ghost.velocityY += 0.8;
}

function checkCollisions() {
  if (climbersGroup.isTouching(ghost) || ghost.y > 600) {
    console.log("Collision detected or ghost fell off"); // Debugging
    ghost.destroy();
    gameState = "end";
  }
}

function displayGameOver() {
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230, 250);
  textSize(20);
  text("Press 'R' or Click Mouse to Restart", 180, 300);
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

function initializeGame() {
  gameState = "play";

  // Clear existing groups and sprites
  if (tower) tower.remove();
  if (ghost) ghost.remove();
  if (doorsGroup) doorsGroup.removeSprites();
  if (climbersGroup) climbersGroup.removeSprites();
  if (invisibleBlockGroup) invisibleBlockGroup.removeSprites();

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1; // Set the velocity to 1

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}
