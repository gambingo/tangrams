let width = window.innerWidth
let height = window.innerHeight
let shapes = []

function setup() {
    createCanvas(width, height)

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
        this.rollover = false
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

    move() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
          }
    }

    fillColor() {
        this.rollover = this.mouseWithinShape()
        stroke(0);
        if (this.dragging) {
            fill(50);
        } else if (this.rollover) {
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
        if (mouseX > this.x && mouseX < this.x + this.l &&
            mouseY > this.y && mouseY < this.y + this.l) {
                return true
            } else {
                return false
            }
    }

    display() {
        this.fillColor()
        rect(this.x, this.y, this.l, this.l)
    }
}


class Triangle extends Shape {
    constructor(x, y, l) {
        super(x, y, l)
        this.otherVertices(this.x, this.y)
        this.area = areaOfATriangle(this.x, this.y, this.x2, this.y2, 
            this.x3, this.y3)

    }

    otherVertices(x, y) {
        this.x2 = x - this.l/2
        this.y2 = y + this.l*Math.sqrt(3)/2
        this.x3 = x + this.l/2
        this.y3 = y + this.l*Math.sqrt(3)/2
    }

    mouseWithinShape() {
        var area1 = areaOfATriangle(mouseX, mouseY, this.x2, this.y2, 
            this.x3, this.y3)
        var area2 = areaOfATriangle(this.x, this.y, mouseX, mouseY, 
            this.x3, this.y3)
        var area3 = areaOfATriangle(this.x, this.y, this.x2, this.y2, 
            mouseX, mouseY)

        if (area1 + area2 + area3 <= this.area) {
            return true
        } else {
            return false
        }
    }

    display() {
        this.otherVertices(this.x, this.y)
        this.fillColor()
        triangle(this.x, this.y, this.x2, this.y2, this.x3, this.y3)
    }
}


// class Rectangle {
//     constructor(x, y, w, h) {
//         this.x = x
//         this.y = y
//         this.width = w
//         this.height = h
//         this.offsetX = 0
//         this.offsetY = 0
//         this.dragging = false
//         this.rollover = false   // TODO
//     }

//     mousePressed() {
//         if (mouseX > this.x && mouseX < this.x + this.width &&
//             mouseY > this.y && mouseY < this.y + this.height) {
//                 this.dragging = true
//                 this.offsetX = this.x - mouseX
//                 this.offsetY = this.y - mouseY
//             }
//     }

//     mouseReleased() {
//         this.dragging = false
//     }

//     move() {
//         if (this.dragging) {
//             this.x = mouseX + this.offsetX;
//             this.y = mouseY + this.offsetY;
//           }
//     }

//     display() {  
//         // Color
//         stroke(0);
//         if (this.dragging) {
//             fill (50);
//         } else if (this.rollover) {
//             fill(100);
//         } else {
//             fill(175, 200);
//         }
//         rect(this.x, this.y, this.width, this.height)
//     }
// }


// class Square extends Rectangle {
//     constructor(x, y, l) {
//         super(x, y, l, l)
//     }
// }


// class Triangle {
//     constructor(x, y, l) {
//         // x, y: top vertex
//         // l: side length
//         this.x1 = x
//         this.y1 = y
//         this.l = l
//         this.otherVertices(x, y)
//         this.area = areaOfATriangle(this.x1, this.y1, this.x2, this.y2, 
//             this.x3, this.y3)
//         this.dragging = false
//         this.offsetX = 0
//         this.offsetY = 0
//     }

//     otherVertices(x, y) {
//         this.x2 = x - this.l/2
//         this.y2 = y + this.l*Math.sqrt(3)/2
//         this.x3 = x + this.l/2
//         this.y3 = y + this.l*Math.sqrt(3)/2
//     }

//     mouseWithinShape() {
//         var area1 = areaOfATriangle(mouseX, mouseY, this.x2, this.y2, 
//             this.x3, this.y3)
//         var area2 = areaOfATriangle(this.x1, this.y1, mouseX, mouseY, 
//             this.x3, this.y3)
//         var area3 = areaOfATriangle(this.x1, this.y1, this.x2, this.y2, 
//             mouseX, mouseY)

//         if (area1 + area2 + area3 <= this.area) {
//             return true
//         } else {
//             return false
//         }
//     }

//     mousePressed() {
//         if (this.mouseWithinShape()) {
//             this.dragging = true
//             this.offsetX = this.x1 - mouseX
//             this.offsetY = this.y1 - mouseY
//         }
//     }

//     mouseReleased() {
//         this.dragging = false
//     }

//     move() {
//         if (this.dragging) {
//             this.x1 = mouseX + this.offsetX
//             this.y1 = mouseY + this.offsetY
//             this.otherVertices(this.x1, this.y1)
//           }
//     }

//     display() {  
//         // Color
//         stroke(0);
//         if (this.dragging) {
//             fill(50);
//         } else if (this.rollover) {
//             fill(100);
//         } else {
//             fill(175, 200);
//         }
//         triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
//     }

// }


function areaOfATriangle(x1, y1, x2, y2, x3, y3) {
    return floor(abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)))
}