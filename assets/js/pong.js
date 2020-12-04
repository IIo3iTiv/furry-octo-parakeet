const canvas = document.getElementById("field")
const cvx = canvas.getContext('2d')

canvas.width = innerWidth / 2
canvas.height = innerHeight / 1.1


function getRandom(min, max) { // Вычисление рандомного угла
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


class Player { // Создание игрока
    constructor(x, y, color, width, height, velocity) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.velocity = velocity
    }
    
    draw() {
        cvx.beginPath()
        cvx.fillStyle = this.color
        cvx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {

        if ((this.x < 0 && this.velocity < 0) || ((this.x + this.width) > canvas.width && this.velocity > 0)) { //Столкновение платформы со стеной
            this.velocity = 0
        }  
        this.x += this.velocity
    }
} 

class Ball { // Создание шарика
    constructor(ballX, ballY, color, radius, velocityY, velocityX) {
        this.ballX = ballX
        this.ballY = ballY
        this.color = color
        this.radius = radius
        this.velocityY = velocityY
        this.velocityX = velocityX
    }

    draw() {
        cvx.beginPath()
        cvx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2, false)
        cvx.fillStyle = this.color
        cvx.fill()
    }
    
    update() {
        if (this.velocityY == 0) { // Движение шарика вместе с платформой
            this.ballX = player.x + player.width / 2
        }
        if (this.ballY - this.radius < 0) { // Отскок от потолка
            this.velocityY = -this.velocityY
        }
        if ((this.ballY + this.radius > player.y && this.ballY + this.radius < player.y + player.height) && (this.ballX + this.radius > player.x && this.ballX - this.radius < player.x+player.width)) { // Отскок от платформы
            if(this.velocityX == 0) { // Рандомный отскок от платформы если нет угла
                this.velocityX = getRandom(-5, 5)
            }
            this.velocityY = -this.velocityY      
        }
        if (this.ballX - this.radius < 0 || this.ballX + this.radius > canvas.width) { // Отскок от стен
            this.velocityX = -this.velocityX
        }
        if (this.ballY > canvas.height) { // Падение шарика в бездну
            this.velocityX = 0
            this.velocityY = 0
            this.ballX = player.x + player.width / 2
            this.ballY = player.y - ball.radius
        }
      //  if ((this.ballY > player.y && this.ballY < player.y + player.height) && (this.ballX > player.x || this.ballX < player.x + player.width)) {
      //      this.velocityY = -this.velocityY
      //     this.velocityX = -this.velocityX
      //  }
            this.ballY += this.velocityY  // Движения шарика по X и Y
            this.ballX += this.velocityX
     }
    }

    class Brick { // Создание кирпичей
        constructor(brickX, brickY, color, width, height) {
            this.brickX = brickX
            this.brickY = brickY
            this.color = color
            this.width = width
            this.height = height
        }
        
        draw() {
            cvx.beginPath()
            cvx.fillStyle = this.color
            cvx.fillRect(this.brickX, this.brickY, this.width, this.height) 
        }

        update() {
            this.draw()

            if () { //Столкновение шарика с кирпичом

            }
        }
    }

const x = canvas.width / 2
const y = canvas.height / 1.25
const playerWidth = canvas.width / 5
const playerHeight = canvas.height / 40
const ballRadius = playerHeight / 1.5
const basePlayerVelocity = playerWidth / 10
const baseBallVelocity =  basePlayerVelocity / 1.3
const bricks = []

let player = new Player(x, y, 'white', playerWidth, playerHeight, 0)
player.x = player.x - player.width / 2
const ballX = player.x + player.width / 2
const ballY = player.y

let ball = new Ball(ballX, ballY, 'white', ballRadius, 0, 0)
ball.ballY = player.y - ball.radius

function moveRect(evt){
    switch (evt.keyCode) {
        case 37: 
            if(player.x > 0) { // Движение платформы влево
                player.velocity = -basePlayerVelocity
            }
        break
        case 39: 
            if(player.x < canvas.width) { // Движение платформы вправо
                player.velocity = basePlayerVelocity
            }
        break 
        case 32:
            if(ball.velocityY == 0) { // Запуск мяча
               ball.velocityY = -baseBallVelocity
               if (player.velocity > 0) {
                ball.velocityX = 5
               } else if (player.velocity < 0) {
                ball.velocityX = -5
               } else {
                   ball.velocityX = 0
               }
            }
        break       
    }
}

function spawnBricks() {
    bricks.push(new Brick(100, 100, 'white', 50, 50))
}
spawnBricks()


function stopMove(evt){ // Остановка платформы
    switch (evt.keyCode) {
        case 37: // Движение платформы влево
                player.velocity = 0
        break
        case 39:  // Движение платформы вправо
                player.velocity = 0
        break 
    }
}

function animate() {
    requestAnimationFrame(animate)
    cvx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    player.update()
    ball.draw()
    ball.update()
    bricks.forEach((brick) => {
        brick.update()
    })
}

addEventListener('keydown', moveRect)
addEventListener('keyup', stopMove)

animate()