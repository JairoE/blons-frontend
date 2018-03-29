class Blon {
  constructor(powerup=null){
    this.x = 1000
    this.y = Math.floor(Math.random() * 450)
    this.width = 50
    this.height = 50
    this.counter = 0
    this.image = null
    this.speed = Math.ceil(Math.random() * 5)
  }

  moveBlon(){
    this.x = this.x - this.speed
    image(this.image, this.x, this.y + 10*this.sine(), this.width, this.height)
  }


  sine(){
    let y = Math.sin(this.counter*2*PI)
    this.counter += 0.02
    return y
  }
}
