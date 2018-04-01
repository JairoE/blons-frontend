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
    image(this.image, this.x, this.y, this.width, this.height)
  }


}
