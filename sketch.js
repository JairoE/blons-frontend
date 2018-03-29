let blons = []
let brdz = []
let powerBlonz = []
let naner = new Naner()
let clicked = false
let slope;
let clickedEasy = false
let score = document.getElementById('current-score')
let highscoreInt = document.getElementById('high-score')
let firstGame = true
let canvasContainer = document.createElement('div')
let body = document.getElementById('body')
let form = document.getElementsByTagName('form')[0]
let userId = null
let submittedName = false
let stoppedBirds = false
let birdNum = 1

function preload() {
  naner.image = loadImage('images/naner.png')
  naner.image.src = "/images/naner.png"
  mnky = loadImage('images/mnky.png')
  landscape = loadImage('images/landscape.png')

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
      naner.x = 85
      naner.y = 490
      clicked = false
      naner.onScreen = true
    }
  }
}

function blonHandler () {
  if(frameCount%45 === 0 ){
    for(i=0; i < Math.floor(Math.random()* 4); i++){
      let blon = new Blon()
      blon.image = loadImage('images/blon.png')
      blon.image.src = "/images/blon.png"
      blons.push(blon)
    }
  }

  if(frameCount%30 === 0 ){
    for(i=0; i < Math.floor(Math.random()* 4); i++){
      let blon = new Blon()
      blon.image = loadImage('images/blon.png')
      blon.image.src = "/images/blon.png"
      blons.push(blon)
    }
  }

  if(frameCount%35 === 0 ){
    let blon = new Blon()
    blon.image = loadImage('images/blon.png')
    blon.image.src = "/images/blon.png"
    blons.push(blon)
  }

  if(frameCount%180 === 0 && !stoppedBirds){
    brd = new Bird(birdNum++)
    if (birdNum > 5){
      birdNum = 1
    }
    brd.image = loadImage('images/brd.png')
    brd.image.src = "/images/brd.png"
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
        score.innerText = parseInt(score.innerText) + 1
      }
    }
  })

  brdz.forEach((brd) => {
    if (brd.x < 0){
      brdz.splice(brdz.indexOf(brd), 1)
    }else{
      brd.moveBrd()
      hit = collideRectRect(naner.x, naner.y, naner.width-5, naner.height-5, brd.x, brd.y, brd.width, brd.height)
      if (hit){
        endgame()
      }
    }
  })
}

function powerUpBlons() {
  if (frameCount % 1500){
    pB = new powerUpBlon("stop")
    powerBlons.push(pb)
  }

  if (frameCount % 2500){
    pb = new powerUpBlon("plus")
    powerBlons.push(pb)
  }

  if (powerBlonz.length > 0){
    powerBlonz.forEach((pB) => {

      if (blon.x < 0){
        blons.splice(blons.indexOf(blon), 1)
      } else{
        pb.moveBlon()
        hit = collideRectCircle(naner.x, naner.y, naner.width, naner.height, pb.x, pb.y, pb.width)
        if (hit){
          if (pb.power === "100"){
            score.innerText = parseInt(score.innerText) + 100
          } else {
            stoppedBirds = pb.stopBirds()
          }
          pb.splice(blons.indexOf(blon), 1)
        }
      }

    })
  }
}

function endgame() {
  noLoop()

  if(parseInt(score.innerText) > parseInt(highscoreInt.innerText)) {
    highscoreInt.innerText = score.innerText
    updateUserStats()
    updateLeaderBoard()
  }
  score.innerText = 0
  blons = []
  brdz = []
  naner = new Naner()
  preload()
  clicked = false
  clickedEasy = false
  alert("Try Again!")

  loop()
}

function createUser() {
  let name = event.target.children[0].value.toLowerCase()

  fetch('http://localhost:3000/users', {
	method: "POST",
	headers: {
		'Content-Type': "application/json"
    },
	body: JSON.stringify({
		username: `${name}`,
		highscore: 0
    })
  })
  .then(res => res.json())
  .then(json => {
    userId=json.id
  })
  document.getElementsByTagName('ul')[0].children[0].innerText = name
  document.getElementsByTagName('form')[0].remove()
}

function updateUserStats() {
  fetch(`http://localhost:3000/users/${userId}`, {
	method: "PATCH",
	headers: {
		'Content-Type': "application/json"
    },
	body: JSON.stringify({
		highscore: highscoreInt.innerText
    })
  })
}

function showLeaderBoard(){
  let sorted = null;
  let leaderboard = document.createElement('table')
  leaderboard.innerHTML = `<tr> <th>Username</th> <th> HighScore </th></tr>`
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(json => {
    sorted = json;
    sorted = sorted.sort((a,b) => {
      return b.highscore - a.highscore
    })

    for(i=0; i<10; i++){
      leaderboard.innerHTML += `<tr> <td> ${sorted[i].username} </td>
      <td> ${sorted[i].highscore} </td> </tr>`
    }
    leaderboard.id="leaderboard"
    document.body.append(leaderboard)



  })
}

function updateLeaderBoard(){

}

function setup(){
  // createNavBar()
  createCanvas(1000,600)
  let canvas = document.getElementsByTagName('canvas')[0]
  canvasContainer.setAttribute('id', 'canvasContainer')
  canvasContainer.append(canvas)
  body.append(canvasContainer)
  showLeaderBoard()

  window.addEventListener('keydown', function(event){
    if (event.which === 32 && submittedName === true) {
      clickedEasy = true
    }
  })

  form.addEventListener('submit', function(event){
    event.preventDefault();
    createUser();
    submittedName = true
  })
}

function draw(){
  background(landscape)
  image(mnky, 3, 510, 90, 90)


  if (clickedEasy === true) {
    nanerHandler()
    blonHandler()
  }
}

function showInput(){
  document.createElement('input')
}
