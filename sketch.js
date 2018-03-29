let blons = []
let brdz = []
let naner = new Naner()
let clicked = false
let slope;
let clickedEasy = false
let score = document.createElement('span')
let highscoreInt = document.createElement('span')
let firstGame = true
let canvasContainer = document.createElement('div')
let leaderboard = document.createElement('ul')
let userId = null

<<<<<<< HEAD
function preload() {
  naner.image = loadImage('images/naner.png')
  naner.image.src = "http://localhost:3000/images/naner.png"
  mnky = loadImage('images/mnky.png')
  landscape = loadImage('images/landscape.png')

  // blons.forEach((blon) => {
  //   blon.image = loadImage('images/blon.png')
  //   blon.image.src = "http://localhost:3000/images/blon.png"
  // })
}

function setup(){
=======

function createNavBar (){
  let navBar = document.createElement('ul')
  let startgame = document.createElement('li')
  let blonsTitle = document.createElement('li')
  let scoreBoard = document.createElement('li')
  let highScore = document.createElement('li')
  scoreBoard.innerHTML = "SCORE: ";
  highScore.innerHTML = "HIGHSCORE: "
  score.innerText = 0;
  highscoreInt.innerText = 0;
  scoreBoard.append(score)
  highScore.append(highscoreInt)
  startgame.innerHTML = `Press E for EZ mode`
  blonsTitle.innerHTML = `Blons World`
  navBar.append(startgame, blonsTitle, scoreBoard, highScore)
>>>>>>> 4f064031f8a682b602663d0943e55a550757ca33
  document.body.prepend(navBar)
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
    for(i=0; i < Math.floor(Math.random()* 6); i++){
      let blon = new Blon()
      blon.image = loadImage('images/blon.png')
      blon.image.src = "http://localhost:3000/images/blon.png"
      blons.push(blon)
    }
  }

  if(frameCount%30 === 0 ){
    for(i=0; i < Math.floor(Math.random()* 6); i++){
      let blon = new Blon()
      blon.image = loadImage('images/blon.png')
      blon.image.src = "http://localhost:3000/images/blon.png"
      blons.push(blon)
    }
  }

  if(frameCount%35 === 0 ){
    let blon = new Blon()
    blon.image = loadImage('images/blon.png')
    blon.image.src = "http://localhost:3000/images/blon.png"
    blons.push(blon)
  }

  if(frameCount%90 === 0){
    brd = new Bird()
    brd.image = loadImage('images/brd.png')
    brd.image.src = "http://localhost:3000/images/brd.png"
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

function endgame() {
  noLoop()

  if(parseInt(score.innerText) > parseInt(highscoreInt.innerText)) {
    highscoreInt.innerText = score.innerText
    updateUserStats()
  }
  score.innerText = 0
  blons = []
  brdz = []
  naner = new Naner()
  preload()
  clicked = false
  clickedEasy = false
  alert("you died")

  loop()
}

function createUser() {
  let name = event.target.children[0].value

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
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(json => {
    sorted = json;
    sorted = sorted.sort((a,b) => {
      return b.highscore - a.highscore
    })

    leaderboard.innerText = "HIGH SCORES"

    for(i=0; i<10; i++){
      li = document.createElement('li')
      li.innerText = `${sorted[i].username}  :  ${sorted[i].highscore}`
      leaderboard.append(li)
    }

    document.body.insertBefore(leaderboard, canvasContainer)
  })
}

function setup(){
  createNavBar()
  createCanvas(1000,600)
  showLeaderBoard()
  let canvas = document.getElementsByTagName('canvas')[0]
  canvasContainer.setAttribute('id', 'canvasContainer')
  canvasContainer.append(canvas)
  let form = document.createElement('form')
  let input = document.createElement('input')
  let button = document.createElement('button')
  button.innerText = "Submit"
  input.placeholder = "Enter Username"
  form.append(input, button)
  document.body.append(form)
  document.body.append(canvasContainer)

  window.addEventListener('keydown', function(event){
    if (event.which === 32) {
      clickedEasy = true
    }
  })

  form.addEventListener('submit', function(event){
    event.preventDefault();
    createUser();
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
