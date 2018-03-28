class Naner{
  constructor(){
    this.x = 40
    this.y = 500
    this.width = 10
    this.height = 20
    this.onScreen = true
  }

  visible() {
    if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 600) {
      this.onScreen = false
    }
  }

  showNaner(){
    fill('#ffe135')
    ellipse(this.x, this.y, this.width, this.height)
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
