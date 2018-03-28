class Naner{
  constructor(){
    this.x = 40
    this.y = 500
    this.width = 60
    this.height = 80
    this.onScreen = true
    this.image = null
  }

  visible() {
    if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 600) {
      this.onScreen = false
    }
  }

  showNaner(){
  //  fill('#ffe135')
    image(this.image, this.x, this.y, this.width, this.height)
  //  ellipse(this.x, this.y, this.width, this.height)
  }

  setTrajectory() {
    let slope = {x: (mouseY-this.y), y: (mouseX-this.x)}
    return slope
  }

  showTrajectory() {
    line(this.x, this.y, mouseX, mouseY)
  }

  throwNaner(slope){
    this.x = this.x + ((slope.y)/80)
    this.y = this.y +  ((slope.x)/80)
    this.visible()
  }

}
