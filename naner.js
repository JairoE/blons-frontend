class Naner{
  constructor(){
    this.x = 85
    this.y = 490
    this.width = 40
    this.height = 60
    this.onScreen = true
    this.image = null
  }

  visible() {
    if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 600) {
      this.onScreen = false
    }
  }

  showNaner(){
    image(this.image, this.x, this.y, this.width, this.height)
  }

  setTrajectory() {
    let slope = {x: (mouseY-this.y), y: (mouseX-this.x)}
    return slope
  }

  showTrajectory() {
    line(this.x + 17, this.y + 35, mouseX, mouseY)
  }

  throwNaner(slope){
    this.x = this.x + ((slope.y)/75)
    this.y = this.y +  ((slope.x)/75)
    this.visible()
  }

}
