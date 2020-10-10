class Triangle extends Shape {
    constructor(x, y, l) {
        super(x, y, l)
        this.otherVertices()
        this.area = areaOfATriangle(this.x1, this.y1, this.x2, this.y2, 
            this.x3, this.y3)
        // this.x_grid_offset = Math.sqrt(3)/2
        this.y_grid_offset = this.y1%5
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

    drawShape() {
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
    }

}


function areaOfATriangle(x1, y1, x2, y2, x3, y3) {
    return floor(abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)))
}