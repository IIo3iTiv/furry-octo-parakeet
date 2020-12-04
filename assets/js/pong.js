const canvas = document.getElementById("field")
const cvx = canvas.getContext('2d')

canvas.width = 600
canvas.height = 600


function getRandom(min, max) { // Вычисление рандомного угла
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


class Player {
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
        if (player.velocity > 0) { // Иннерция платформы
            player.velocity -= 0.5
        } else if (player.velocity < 0) {
            player.velocity += 0.5
        }
        this.x += this.velocity
    }
} 

class Ball {
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
            this.velocityY = 0 - this.velocityY
        }
        if ((this.ballY + this.radius > player.y && this.ballY < player.y + player.height) && (this.ballX > player.x && this.ballX < player.x+player.width)) { // Отскок от платформы
            if(this.velocityX == 0) { // Рандомный отскок от платформы если нет угла
                this.velocityX = getRandom(-5, 5)
            }
            this.velocityY = 0 - this.velocityY
        }
        if (this.ballX - this.radius < 0 || this.ballX + this.radius > canvas.width) { // Отскок от стен
            this.velocityX = 0 - this.velocityX
        }
        if (this.ballY > canvas.height) { // Падение шарика в бездну
            this.velocityX = 0
            this.velocityY = 0
            this.ballX = player.x + player.width / 2
            this.ballY = player.y - ball.radius
        }
            this.ballY += this.velocityY  // Движения по X и Y
            this.ballX += this.velocityX
    }
}

const x = canvas.width / 2
const y = canvas.height / 1.25

let player = new Player(x, y, 'white', 150, 20, 0)
player.x = player.x - player.width / 2
const ballX = player.x + player.width / 2
const ballY = player.y

let ball = new Ball(ballX, ballY, 'white', 10, 0, 0)
ball.ballY = player.y - ball.radius

function moveRect(evt){
    switch (evt.keyCode) {
        case 37: 
            if(player.x > 0) { // Движение платформы влево
                player.velocity = -10
            }
        break
        case 39: 
            if(player.x < canvas.width) { // Движение платформы вправо
                player.velocity = 10
            }
        break 
        case 32:
            if(ball.velocityY == 0) { // Запуск мяча
               ball.velocityY = -10
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

function animate() {
    requestAnimationFrame(animate)
    cvx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    player.update()
    ball.draw()
    ball.update()
}

addEventListener('keydown', moveRect)

animate()