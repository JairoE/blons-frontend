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
let userId = null


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
        score.innerText = parseInt(score.innerText) + 1
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

  if(parseInt(score.innerText) > parseInt(highscoreInt.innerText)) {
    highscoreInt.innerText = score.innerText
    updateUserStats()
  }
  score.innerText = 0
  blons = []
  brdz = []
  naner = new Naner()
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
  sorted = null
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(json => {
    sorted = json
  })

  sorted = sorted.sort((a,b) => {
    b.highscore - a.highscore
  })
  console.log(sorted)
}

function setup(){
  createNavBar()
  createCanvas(1000,600)
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
  background(color(127, 199, 237))


  // if (firstGame === true){
  //   let input = createInput();
  //   input.position(450,300)
  //   let button = createButton('Enter Username');
  //   button.position(input.x + input.width+ 1, input.y)
  // }

  if (clickedEasy === true) {
    nanerHandler()
    blonHandler()
  }
}

function showInput(){
  document.createElement('input')
}
