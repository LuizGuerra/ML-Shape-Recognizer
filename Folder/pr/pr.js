function setup() {
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 3; j++) {
      createCanvas(64, 64);
      background(255);
      push();
      strokeWeight(random(1, 4));
      let r = random(8, 24);
      let x = random(r, width-r);
      let y = random(r, height-r);
      stroke(random(100), random(100), random(100));
      translate(x, y);
      if (j == 0) {
        circle(0, 0, r*2);
        saveCanvas("data/circle"+i+".png");
      } else if (j == 1) {
        rectMode(CENTER);
        rotate(random(-0.1, 0.1));
        square(0, 0, r*2);
        saveCanvas("data/square"+i+".png");
      } else if (j == 2) {
        rotate(random(-0.1, 0.1));
        triangle(0, -r, r, r, -r, r);
        saveCanvas("data/triangle"+i+".png");
      }
    }
  }
}

function draw() {
}
