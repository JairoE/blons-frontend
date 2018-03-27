let blons = []
function setup(){
  createCanvas(1000,600)
}

function draw(){
  background(color(127, 199, 237))
  console.log(frameCount)
  console.log(blons.length)
  if(frameCount%45 ===0 ){
    blon = new Blon()
    blons.push(blon)
  }

  blons.forEach((blon)=>{
    if (blon.x < 0){
      blons.splice(blons.indexOf(blon), 1)
    }
    blon.moveBlon()
  })
}
