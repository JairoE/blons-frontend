document.addEventListener('DOMContentLoaded', function(){
  document.body.innerHTML = `    <div id="game" class="game">


        <div id="start">
          <a id="Easy">Easy</a>
          <br>
          <a id="Medium">Medium</a>
          <br>
          <a id="Nanerz">Nanerz</a>
        </div>


      </div>
`

  const GAME = document.getElementById('game')
  // const GAME_HEIGHT = 600
  // const GAME_WIDTH = 1000
  // const BALLONS = []
  // const BRDZ = []
  const EASY = document.getElementById('Easy')
  const MEDIUM = document.getElementById('Medium')
  const NANERZ = document.getElementById('Nanerz')
  // const CANVAS = document.createElement('canvas')
  // CANVAS.setAttribute('id', "myCanvas")
  //
  //
  // let gameInterval = null
  // let birdAppearances = null
  //
  // function createBallon(y){
  //   const ballon = document.createElement('div')
  //   ballon.className = "ballon"
  //   ballon.style.top = `${y}px`
  //   let left = 1000
  //
  //   ballon.style.left = left
  //
  //   GAME.appendChild(ballon);
  //
  //   function moveBallon(ballon){
  //     function step() {
  //       ballon.style.left = `${left -= 5}px`
  //       if (left > 0) {
  //         window.requestAnimationFrame(step)
  //       } else {
  //         ballon.remove()
  //
  //       }
  //       // checkCollision, if collision, remove ballon from array
  //     }
  //     window.requestAnimationFrame(step)
  //   }
  //
  //   BALLONS.push(ballon)
  //   moveBallon(ballon)
  //
  // }
  //
  // function createBird(y){
  //   const bird = document.createElement('div')
  //   bird.className = "bird"
  //   bird.style.top = `${y}px`
  //   let left = 1000
  //
  //   bird.style.left = left
  //
  //   GAME.appendChild(bird);
  //
  //   function moveBird(bird){
  //     function step() {
  //       bird.style.left = `${left -= 5}px`
  //       if (left > 0) {
  //         window.requestAnimationFrame(step)
  //       } else {
  //         bird.remove()
  //
  //       }
  //       // checkCollision, if collision, remove bird from array
  //     }
  //     window.requestAnimationFrame(step)
  //   }
  //
  //   BRDZ.push(bird)
  //   moveBird(bird)
  //
  // }
  //
  // function drawTrajectory(){
  //   console.log(`${event.x}, ${event.y}`)
  //   ctx = CANVAS.getContext('2d');
  //   ctx.beginPath();
  //   canvas_arrow(ctx, 40, 100, event.x, event.y)
  //   ctx.stroke();
  //
  // }
  //
  // function canvas_arrow(context, fromx, fromy, tox, toy){
  //   let headlen = 10;	// length of head in pixels
	// 	let dx = tox-fromx;
	// 	let dy = toy-fromy;
	// 	let angle = Math.atan2(dy,dx);
	// 	context.moveTo(fromx, fromy);
	// 	context.lineTo(tox, toy);
	// 	context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
	// 	context.moveTo(tox, toy);
	// 	context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
  // }

  function easy(){
    hideLinks()

    document.body.innerHTML = ""

  }

  // function ballonYPos(){
  //   let pos = Math.floor(Math.random() * GAME_HEIGHT)
  //   if (pos > 480) {
  //     pos = 475
  //   }
  //   return pos;
  // }

  function addEventListeners(){
    EASY.addEventListener('click', easy)
  }

  function hideLinks(){
    EASY.style.display = 'none';
    MEDIUM.style.display = 'none';
    NANERZ.style.display = 'none';
  }

  addEventListeners()


})
