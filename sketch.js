let width = window.innerWidth
let height = window.innerHeight
let shapes = []
let grid_width = 10


function setup() {
    createCanvas(width, height)
    noStroke()
    rectMode(CENTER)
    angleMode(DEGREES)

    for (let i = 0; i < 4; i++) {
        let side_length = 100

        let x = Math.random()*(width-side_length)
        let y = Math.random()*(height-side_length)
        shapes.push(new Square(x, y, side_length))

        x = Math.random()*(width-side_length)
        y = Math.random()*(height-side_length)
        shapes.push(new Triangle(x, y, side_length))

        x = Math.random()*(width-side_length)
        y = Math.random()*(height-side_length)
        shapes.push(new Rhombus(x, y, side_length))
    }
}

function draw() {
    background(240)
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].move()
        shapes[i].display()
    }
}

document.oncontextmenu = function() {
    return false;
  }

function mousePressed() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].mousePressed()
    }
}

function mouseReleased() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].mouseReleased()
    }
}

function keyPressed() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].keyPressed()
    }
}


// OBJECTS

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };