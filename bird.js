class Bird{
  constructor(){
    this.x = 1000
    this.y = Math.floor(Math.random() * 400)
    this.width = 20
    this.height = 20
  }

  moveBrd(){
    this.x = this.x - 3
    // 75*noise(0.01 * this.x)
    fill(0)
    ellipse(this.x, this.y, this.width, this.height)
    // checkCollision, if collision, remove ballon from array
  }


}
