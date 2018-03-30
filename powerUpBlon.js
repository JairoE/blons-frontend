class powerUpBlon{
  constructor(power){
    this.x = 1000
    this.y = Math.floor(Math.random() * 450)
    this.width = 50
    this.height = 50
    this.counter = 0
    this.image = null
    this.power = power
  }

  movepB(){
    this.x = this.x - 7
    image(this.image, this.x, this.y + 50*this.sine(), this.width, this.height)
  }


  sine(){
    let y = Math.sin(this.counter*2*PI)
    this.counter += 0.02
    return y
  }

  stopBirds(){
    return false
  }
}
