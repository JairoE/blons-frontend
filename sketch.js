let blons = []
let brdz = []
let powerBlons = []
let naner = new Naner()
let clicked = false
let slope;
let clickedEasy = false
let score = document.getElementById('current-score')
let highscoreInt = document.getElementById('high-score')
let firstGame = true
let canvasContainer = document.createElement('div')
let gameContainer = document.getElementById('gameContainer')
let form = document.getElementsByTagName('form')[0]
let userId = null
let submittedName = false
let stoppedBirds = false
let birdNum = 1
let buttonContainer = document.getElementById("button-container")

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

  if(frameCount < 1800){
    spawnBird()
  }else if (frameCount > 1800){
    spawnBird(2)
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
      hit = collideRectRect(naner.x, naner.y, naner.width-5, naner.height-5, brd.x, brd.y, brd.width-5, brd.height-5)
      if (hit){
        endgame()
      }
    }
  })
}

function spawnBird(num){
  if(frameCount%180 === 0 && !stoppedBirds){
    brd = new Bird(birdNum++)
    brd.image = loadImage('images/brd.png')
    brd.image.src = "/images/brd.png"
    brdz.push(brd)

    if (birdNum > 5){
      birdNum = 1
    }
  }
  if(frameCount%400 === 0 && num === 2){

    brd2 = new Bird(birdNum++)
    if (birdNum > 5){
      birdNum = 1
    }
    brd2.image = loadImage('images/brd.png')
    brd2.image.src = "/images/brd.png"
    brdz.push(brd2)
  }
}

function powerUpBlons() {
  // if (frameCount%40 === 0){
  //   let pB = new powerUpBlon("stop")
  //   pB.image = loadImage('images/brd_blon.png')
  //   pB.image.src = "/images/brd_blon.png"
  //   powerBlons.push(pB)
  // }
  if (frameCount%2500 === 0){
    let pB = new powerUpBlon("100")
    pB.image = loadImage('images/100_blon.png')
    pB.image.src = "/images/100_blon.png"
    powerBlons.push(pB)
  }

  if (powerBlons.length > 0){
    powerBlons.forEach((pB) => {

      if (pB.x < 0){
        powerBlons.splice(powerBlons.indexOf(pB), 1)
      } else{
        pB.movepB()
        let hit = collideRectCircle(naner.x, naner.y, naner.width, naner.height, pB.x, pB.y, pB.width)
        if (hit){
          if (pB.power === "100"){
            score.innerText = parseInt(score.innerText) + 100
          } else {
            stoppedBirds = pB.stopBirds()
          }
          powerBlons.splice(powerBlons.indexOf(pB), 1)
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
  document.getElementById("username").innerText = name
  
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

function showInstructions() {
  const instructions = document.createElement('div')
  instructions.innerHTML = `<center><h2>instructions:</h2>
  <h3>launch the naner to pop as many blons as you can without hitting a brd</h3>
  <h3>click anywhere to launch the naner - the further the click, the faster the naner goes</h3>
  <h3>keep an eye out for power blons</h3>
  <h3>press space to play!</h3></center>`
  canvasContainer.append(instructions)
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
    canvasContainer.append(leaderboard)



  })
}

function updateLeaderBoard(){

}

function setup(){
  createCanvas(1000,600)
  background(landscape)
  image(mnky, 3, 510, 90, 90)
  let canvas = document.getElementsByTagName('canvas')[0]
  canvasContainer.setAttribute('id', 'canvasContainer')
  canvasContainer.append(canvas)
  document.getElementById("gameContainer").append(canvasContainer)
  showInstructions();
  showLeaderBoard();

  // make a loop for the pause and start button 

  let buttonHandler = (()=>{

    let pauseButton = document.createElement("button")
    pauseButton.setAttribute("id","pause-button")
    pauseButton.innerHTML = "pause"
    pauseButton.addEventListener('click',(event)=>{
      buttonContainer.innerHTML=""
      buttonContainer.append(startButton)
      noLoop()
    })
    let startButton = document.getElementById("start-button")

    return function(){
        //add and remove button event listeners 
          if (submittedName === true){
              buttonContainer.innerHTML = ""
              buttonContainer.append(pauseButton)
              loop()
          }
    }
  })

  document.getElementById("start-button").addEventListener('click', buttonHandler)

  form.addEventListener('submit', function(event){
    event.preventDefault();
    createUser();
    submittedName = true
  })
  noLoop()
}

function draw(){
  // background(landscape)
  // image(mnky, 3, 510, 90, 90)


  // if (clickedEasy === true) {
    nanerHandler()
    blonHandler()
    powerUpBlons()
  // }
}
