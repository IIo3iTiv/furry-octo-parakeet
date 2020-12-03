const canvas = document.getElementById("field")
const cvx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

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
        if ((this.x) < 0 && this.velocity < 0) {
            this.velocity = 0
        } else if ((this.x + this.width) > canvas.width && this.velocity > 0) {
            this.velocity = 0
        } else {
            this.x += this.velocity
        }
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
        if (this.velocityY == 0) {
            this.ballX = player.x + player.width / 2
        }
        if (this.ballY - this.radius < 0) {
            this.velocityY = 0 - this.velocityY
        }
        if (this.ballY + this.radius > player.y && this.ballX > player.x && this.ballX < player.x+player.width) {
            this.velocityY = 0 - this.velocityY
            this.velocityX = 5
        }
            this.ballY += this.velocityY
            this.ballX += this.velocityX
    }
}

const x = canvas.width / 2
const y = canvas.height / 1.25

let player = new Player(x, y, 'black', 150, 20, 0)

const ballX = player.x + player.width / 2
const ballY = y - 12

let ball = new Ball(ballX, ballY, 'black', 10, 0, 0)

function moveRect(evt){
    switch (evt.keyCode) {
        case 37: 
            if(player.x > 0) {
                player.velocity = -10
            }
        break
        case 39: 
            if(player.x < canvas.width) {
                player.velocity = 10
            }
        break 
        case 32:
            if(ball.velocityY == 0) {
               ball.velocityY = -10 
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
    if (player.velocity > 0) {
        player.velocity -= 0.5
    } else if (player.velocity < 0) {
        player.velocity += 0.5
    }
}

addEventListener('keydown', moveRect)

animate()