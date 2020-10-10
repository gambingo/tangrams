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

    drawShape() {
        rect(0, 0, this.l, this.l)
    }


    // display() {
    //     push()
    //     // this.snapToGrid()
    //     translate(this.x, this.y)
    //     rotate(this.rotation)
    //     this.fillColor()
        
    //     pop()
    // }
}