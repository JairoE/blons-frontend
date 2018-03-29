class Bird{
  constructor(){
    this.x = 1000
    this.y = Math.floor(Math.random() * 400)
<<<<<<< HEAD
    this.width = 70
    this.height = 30
    this.image = null
=======
    this.width = 20
    this.height = 20
    this.speed = Math.ceil(Math.random() * 7)
>>>>>>> 4f064031f8a682b602663d0943e55a550757ca33
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
