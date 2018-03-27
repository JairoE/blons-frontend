class Blon {
  constructor(){
    this.x = 1000
    this.y = Math.floor(Math.random() * 500)
    this.width = 60
    this.height = 60
    this.counter = 0
    this.increase = Math.PI * 2 /100
  }

  moveBlon(){
      this.x = this.x - 5
      // 75*noise(0.01 * this.x)
      ellipse(this.x, this.y + this.sine(), this.width, this.height)
      // checkCollision, if collision, remove ballon from array
    }

  sine(){
    let y = Math.sin(this.counter)/2
    this.counter += this.increase;
    return y
  }
}
