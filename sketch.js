let width = window.innerWidth
let height = window.innerHeight
let shapes = []
let grid_width = 10


function setup() {
    createCanvas(width, height)
    noStroke()
    rectMode(CENTER)

    for (let i = 0; i < 5; i++) {
        let side_length = 100
        let x = Math.random()*(width-side_length)
        let y = Math.random()*(height-side_length)
        shapes.push(new Square(x, y, side_length))

        x = Math.random()*(width-side_length)
        y = Math.random()*(height-side_length)
        shapes.push(new Triangle(x, y, side_length))
    }
}

function draw() {
    background(240)
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].move()
        shapes[i].display()
    }
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
class Shape {
    constructor(x, y, l) {
        // x, y: anchor coordinates
        // l: side length
        this.x = x
        this.y = y
        this.l = l
        this.offsetX = 0
        this.offsetY = 0
        this.dragging = false
        this.rotation = 0
    }

    mousePressed() {
        if (this.mouseWithinShape()) {
            this.dragging = true
            this.offsetX = this.x - mouseX
            this.offsetY = this.y - mouseY
        }
    }

    mouseReleased() {
        this.dragging = false
    }

    keyPressed() {
        if (this.dragging) {
            if (keyCode == 32) {
                this.rotation = this.rotation + PI/6
            }
        }
    }

    snapToGrid() {
        if (!this.dragging) {
            this.x = Math.round(this.x/grid_width)*grid_width
            this.y = Math.round(this.y/grid_width)*grid_width
        }
    }

    move() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
          }
    }

    fillColor() {
        if (this.dragging) {
            fill(50);
        } else if (this.mouseWithinShape()) {
            fill(100);
        } else {
            fill(175, 200);
        }
    }
}


class Square extends Shape {
    constructor(x, y, l) {
        super(x, y, l)
    }

    mouseWithinShape() {
        var translatedMouseX = mouseX - this.x
        var translatedMouseY = mouseY - this.y
        
        if (translatedMouseX > -this.l/2 && translatedMouseX < this.l/2 &&
            translatedMouseY > -this.l/2 && translatedMouseY < this.l/2) {
                return true
            } else {
                return false
            }
    }

    display() {
        push()
        this.snapToGrid()
        translate(this.x, this.y)
        rotate(this.rotation)
        this.fillColor()
        rect(0, 0, this.l, this.l)
        pop()
    }
}


class Triangle extends Shape {
    constructor(x, y, l) {
        super(x, y, l)
        this.otherVertices()
        this.area = areaOfATriangle(this.x1, this.y1, this.x2, this.y2, 
            this.x3, this.y3)

    }

    otherVertices() {
        // All vertices relative to the center at (0, 0)
        let h = this.l * Math.sqrt(3)/2
        this.x1 = 0
        this.y1 = -h/2
        this.x2 = this.l/2
        this.y2 = h/2
        this.x3 = -this.l/2
        this.y3 = h/2
    }

    mouseWithinShape() {
        var translatedMouseX = mouseX - this.x
        var translatedMouseY = mouseY - this.y
        
        var area1 = areaOfATriangle(translatedMouseX, translatedMouseY,
            this.x2, this.y2, this.x3, this.y3)
        var area2 = areaOfATriangle(this.x1, this.y1, 
            translatedMouseX, translatedMouseY, this.x3, this.y3)
        var area3 = areaOfATriangle(this.x1, this.y1, this.x2, this.y2, 
            translatedMouseX, translatedMouseY)

        if (area1 + area2 + area3 <= this.area) {
            return true
        } else {
            return false
        }
    }

    display() {
        push()
        this.snapToGrid()
        translate(this.x, this.y)
        rotate(this.rotation)
        this.otherVertices()
        this.fillColor()
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
        pop()
    }
}


function areaOfATriangle(x1, y1, x2, y2, x3, y3) {
    return floor(abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)))
}