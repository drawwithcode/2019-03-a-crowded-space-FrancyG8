// Help Little Red Riding Hood picking up mushrooms

var mushroomsInTheWood = 30;
var pickedMushrooms = 0;
var allMyMushrooms = [];


function preload() {
  // put preload code here
}


function setup() {

  createCanvas(windowWidth, windowHeight);

  // mushrooms in the wood
  for (var i = 0; i < mushroomsInTheWood; i++) {
    var tempX = random(0, windowWidth);
    var tempY = random(0, windowHeight);
    var tempR = 80;
    var tempMushrooms = new Mushroom(tempX, tempY, tempR);
    allMyMushrooms.push(tempMushrooms);
  }

}


function draw() {

  background('DarkGreen');

  // external border
  push();
    strokeWeight(20);
    stroke('YellowGreen');
    noFill();
    rect(0, 0, width, height);
  pop();


  // glittering forest
  push();
    fill('YellowGreen');
    noStroke();
    var s = random() * width;
    var t = random() * height;
    var v = random() * 30;
    ellipse (s, t, v);
  pop();
  push();
    fill('PapayaWhip');
    noStroke();
    var s = random() * width;
    var t = random() * height;
    var v = random() * 30;
    ellipse (s, t, v);
  pop();

  // basket
  push();
    angleMode(DEGREES);
    noStroke();
    fill('Chocolate');
    arc(mouseX, mouseY, 200, 200, 0, 180);
    noFill();
    stroke('Chocolate');
    strokeWeight(10);
    arc(mouseX, mouseY, 170, 170, 180, 360);
  pop();
  push();
    textSize(20);
    textStyle(BOLD);
    fill('SandyBrown');
    text('your basket', mouseX - 55, mouseY - 20);
  pop();

  // mushrooms
  for (var i = 0; i < allMyMushrooms.length; i++) {
    var tempMushrooms = allMyMushrooms[i];
    tempMushrooms.move();
    tempMushrooms.display();

    // text
    push();
      fill('YellowGreen');
      textStyle(BOLD);
      textSize(30);
      textAlign(CENTER,CENTER);
      text('- help Little Red Riding Hood pick up mushrooms -', windowWidth/2, windowHeight/9);
    pop();

  }

  // if you pick up every mushroom
  if (pickedMushrooms == 30) {
    push();
      background('Red');
      fill('White');
      textStyle(BOLD);
      textSize(40);
      textAlign(CENTER,CENTER);
      text('- Granny will be so happy! -', windowWidth/2, windowHeight/2);
    pop();

    // glittering granny
    push();
      fill('Seashell');
      noStroke();
      var s = random() * width;
      var t = random() * height;
      var v = random() * 40;
      ellipse (s, t, v);
    pop();
  }

}


function Mushroom(_x, _y, _diameter) {

  this.size = _diameter;
  this.x = _x;
  this.y = _y;
  this.speed = 4;
  this.color = 'Red';

  var xIncrease = 1;
  var yIncrease = 1;

  // bouncing mushrooms
  this.move = function() {
    this.x += xIncrease * this.speed;
    this.y += yIncrease * this.speed;

    //vertical bouncing
    if(this.y > windowHeight || this.y < 0) {
      yIncrease = -yIncrease;
    }

    //horizontal bouncing
    if(this.x > windowWidth || this.x < 0) {
      xIncrease = -xIncrease;
    }
  }

  // picking up mushrooms
  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.size) {
    this.size = 0;
    pickedMushrooms++;
    }
  }

  // display mushrooms
  this.display = function() {
    fill(this.color);
    noStroke();
    push();
      translate(this.x, this.y);
      angleMode(DEGREES);
      rotate(180);
      // mushroom cap
      arc(0, 0, this.size, this.size, 0, 180);
      // mushroom stem
      fill('White');
      rect(0 - (this.size/3), 0, 50, -(this.size/2));
    pop();
  }

}


// pick mushrooms
function mouseClicked() {
  for (var i = 0; i < allMyMushrooms.length; i++) {
    allMyMushrooms[i].click();
  }
}
