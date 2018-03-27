let blons = []
let brdz = []

function setup(){
  createCanvas(1000,600)
}

function draw(){
  background(color(127, 199, 237))

  if(frameCount%45 === 0 ){
    blon = new Blon()
    blons.push(blon)
  }

  if(frameCount%120 === 0){
    brd = new Bird()
    brdz.push(brd)
  }

  blons.forEach((blon)=>{
    if (blon.x < 0){
      blons.splice(blons.indexOf(blon), 1)
    }
    blon.moveBlon()
  })

  brdz.forEach((brd) => {
    if (brd.x < 0){
      brdz.splice(brdz.indexOf(brd), 1)
    }
    brd.moveBrd()
  })
}
