class Blon {
  constructor(){
    this.x = 1000
    this.y = Math.floor(Math.random() * 500)
    this.width = 20
    this.height = 20
  }

  moveBlon(){
      this.x = this.x - 5
      ellipse(this.x, this.y + 75*noise(0.01 * this.x), this.width, this.height)
      // checkCollision, if collision, remove ballon from array
    }

}
