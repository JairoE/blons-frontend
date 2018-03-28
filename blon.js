class Blon {
  constructor(){
    this.x = 1000
    this.y = Math.floor(Math.random() * 450)
    this.width = 50
    this.height = 50
    this.counter = 0
    this.speed = Math.ceil(Math.random() * 5)
  }

  moveBlon(){
      this.x = this.x - this.speed
      // 75*noise(0.01 * this.x)
      fill(255)
      ellipse(this.x, this.y + 10*this.sine(), this.width, this.height)
      // checkCollision, if collision, remove ballon from array
    }

  sine(){
    let y = Math.sin(this.counter*2*PI)
    this.counter += 0.02
    return y
  }
}
