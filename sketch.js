let blons = []
let brdz = []
let naner = new Naner()
let clicked = false
let slope;
let navBar = document.createElement('div')
let scoreboard = document.createElement('h2')
scoreboard.innerText = 0;
navBar.append(scoreboard)

function setup(){
  document.body.prepend(navBar)
  createCanvas(1000,600)
}

function nanerHandler () {
  naner.showNaner()

  if (clicked === false) {
    naner.showTrajectory()
  }

  if (mouseIsPressed && clicked === false) {
    clicked = true
    slope = naner.setTrajectory()
  }

  if (clicked === true){
    naner.throwNaner(slope)
    if (!naner.onScreen) {
      naner.x = 40
      naner.y = 500
      clicked = false
      naner.onScreen = true
    }
  }
}

function blonHandler () {
  if(frameCount%45 === 0 ){
    for(i=0; i < Math.floor(Math.random()* 6); i++){
      let blon = new Blon()
      blons.push(blon)
    }
  }

  if(frameCount%30 === 0 ){
    for(i=0; i < Math.floor(Math.random()* 6); i++){
      let blon = new Blon()
      blons.push(blon)
    }
  }

  if(frameCount%35 === 0 ){
    let blon = new Blon()
    blons.push(blon)
  }

  if(frameCount%90 === 0){
    brd = new Bird()
    brdz.push(brd)
  }

  blons.forEach((blon)=>{
    if (blon.x < 0){
      blons.splice(blons.indexOf(blon), 1)
    } else{
      blon.moveBlon()
      hit = collideRectCircle(naner.x, naner.y, naner.width, naner.height, blon.x, blon.y, blon.width)
      if (hit){
        blons.splice(blons.indexOf(blon), 1)
        scoreboard.innerText = parseInt(scoreboard.innerText) + 1
      }
    }
  })

  brdz.forEach((brd) => {
    if (brd.x < 0){
      brdz.splice(brdz.indexOf(brd), 1)
    }else{
      brd.moveBrd()
      hit = collideRectCircle(naner.x, naner.y, naner.width-5, naner.height-5, brd.x, brd.y, brd.width)
      if (hit){
        endgame()
      }
    }
  })
}

function endgame() {
  noLoop()
  scoreboard.innerText = 0
  blons = []
  brdz = []
  naner = new Naner()
  clicked = false
  slope;
  alert("you died")

  loop()
}

function draw(){
  background(color(127, 199, 237))

  nanerHandler()
  blonHandler()
}
