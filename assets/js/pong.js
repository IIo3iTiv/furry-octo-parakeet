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
        this.x += this.velocity
    }
}

const x = canvas.width / 2
const y = canvas.height / 1.25

let player = new Player(x, y, 'black', 150, 20, 0)
player.draw()

function moveRect(evt){
    switch (evt.keyCode) {
        case 37: 
            if(player.x >= 0) {
                player.velocity = -10
            }
        break
        case 39: 
            if(player.x <= canvas.width) {
                player.velocity = 10
            }
        break         
    }
}

function animate() {
    requestAnimationFrame(animate)
    cvx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    player.update()
    if (player.velocity > 0) {
        player.velocity -= 0.2
    } else if (player.velocity < 0) {
        player.velocity += 0.2
    }
}

addEventListener('keydown', moveRect)

animate()