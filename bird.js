class Bird{
  constructor(birdNum){
    this.x = 1000
    this.y = Math.floor(500 - (100*birdNum))
    this.width = 70
    this.height = 30
    this.image = null
    this.speed = Math.ceil(Math.random() * 5)
  }

  moveBrd(){
    this.x = this.x - this.speed
    // 75*noise(0.01 * this.x)
    // fill(0)
    image(this.image, this.x, this.y, this.width, this.height)
    // ellipse(this.x, this.y, this.width, this.height)
    // checkCollision, if collision, remove ballon from array
  }


}
