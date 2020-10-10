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
        this.x_grid_offset = 0
        this.y_grid_offset = 0
        this.right_clicked = false
        this.rotation_increment = 15
    }

    mousePressed() {        
        if (this.mouseWithinShape()) {
            if (mouseButton === LEFT) {
                this.dragging = true
                this.offsetX = this.x - mouseX
                this.offsetY = this.y - mouseY
            } else if (mouseButton === RIGHT) {
                this.right_clicked = true
            }
            
        }
    }

    mouseReleased() {
        this.dragging = false
        if (this.right_clicked) {
            this.rotation = this.rotation + this.rotation_increment
            this.right_clicked = false
        }
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
            this.x = Math.round(this.x/grid_width)*grid_width + this.x_grid_offset
            this.y = Math.round(this.y/grid_width)*grid_width + this.y_grid_offset
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

    display() {
        push()
        // this.snapToGrid()
        translate(this.x, this.y)
        rotate(this.rotation)
        this.fillColor()
        this.drawShape()
        pop()
    }
}