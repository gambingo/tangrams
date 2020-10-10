class Rhombus extends Shape {
    constructor(x, y, l) {
        super(x, y, l)
        this.otherVertices()
    }

    otherVertices() {
        let angle = 75 * Math.PI / 180
        this.x_r = this.l * Math.cos(angle)
        this.y_r = this.l * Math.sin(angle)
    }

    lineOne(x_p) {
        return this.y_r/this.x_r * x_p - this.y_r
    }

    isBelowLineOne(x_p, y_p) {
        if (y_p >= this.lineOne(x_p)) {
            return true
        } else {
            return false
        }
    }

    lineTwo(x_p) {
        return -this.y_r/this.x_r * x_p - this.y_r
    }

    isBelowLineTwo(x_p, y_p) {
        if (y_p >= this.lineTwo(x_p)) {
            return true
        } else {
            return false
        }
    }

    lineThree(x_p) {
        return this.y_r/this.x_r * x_p + this.y_r
    }

    isAboveLineThree(x_p, y_p) {
        if (y_p <= this.lineThree(x_p)) {
            return true
        } else {
            return false
        }
    }

    lineFour(x_p) {
        return -this.y_r/this.x_r * x_p + this.y_r
    }

    isAboveLineFour(x_p, y_p) {
        if (y_p <= this.lineFour(x_p)) {
            return true
        } else {
            return false
        }
    }

    mouseWithinShape() {
        var translatedMouseX = mouseX - this.x
        var translatedMouseY = mouseY - this.y

        return (
            this.isBelowLineOne(translatedMouseX, translatedMouseY) &&
            this.isBelowLineTwo(translatedMouseX, translatedMouseY) &&
            this.isAboveLineThree(translatedMouseX, translatedMouseY) &&
            this.isAboveLineFour(translatedMouseX, translatedMouseY) 
        )
    }

    drawShape() {
        quad(this.x_r, 0, 0, this.y_r, -this.x_r, 0, 0, -this.y_r)
    }
}

