// Cài đặt Canvas
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = 1018;
canvas.height = 767;

let game = 'ready';
let score = 0;
let gameFrame = 0;
ctx.font = '25px Georgia';
let gameSpeed = 1;
let gameOver = false;

// Di chuyển chuột
let canvasPosition = canvas.getBoundingClientRect();
var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function () {
    mouse.click = false;
})
// Character
var theHero = new Image();
theHero.src = '455-Other03.png';

class Hero {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 25;
        this.frameX = 0;
        this.frameY = 0;
        this.width = 32;
        this.height = 48;
    }

    update() {
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 10;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 10;
        }
    }

    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.001;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        // ctx.fillStyle = 'black';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();

        if (this.x >= mouse.x) {
            ctx.drawImage(theHero, this.frameX * this.width, this.height,
                this.width, this.height, this.x - 16, this.y - 25, this.width * 1.1,
                this.height * 1.1);
        } else if (this.x <= mouse.x) {
            ctx.drawImage(theHero, this.frameX * this.width, this.height * 2,
                this.width, this.height, this.x - 16, this.y - 25, this.width * 1.1,
                this.height * 1.1);
        }//  else if (this.y <= mouse.y) {
        //     ctx.drawImage(theHero, this.frameY * this.width, this.height * 3,
        //         this.width, this.height, this.x - 16, this.y - 25, this.width * 2,
        //         this.height * 2);
        // } else if (this.y <= mouse.y) {
        //     ctx.drawImage(theHero, this.frameY * this.width, this.height * 4,
        //         this.width, this.height, this.x - 16, this.y - 25, this.width * 2,
        //         this.height * 2);
        // }

    }
}

var player = new Hero();

// NPC
var NpcArray = [];
var NpcArray1 = [];
var NpcImage = new Image();
NpcImage.src = 'Civilian31.png';
var NpcImage1 = new Image();
NpcImage1.src = 'Nun02.png';

class Npc {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 15;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }

    update() {
        this.y -= this.speed;
        var dx = this.x - player.x;
        var dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw(image) {
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0,Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        ctx.drawImage(image, this.x - 20, this.y - 23, this.radius * 2, this.radius * 3)
    }
}

// Nhạc
var soundNpc1 = document.createElement('audio');
soundNpc1.src = '005-Discovery.ogg';
var soundNpc2 = document.createElement('audio');
soundNpc2.src = '004-Treasure.ogg';
var soundNpc3 = document.createElement('audio');
soundNpc3.src = '002-Defeat.ogg';
var soundNpc4 = document.createElement('audio');
soundNpc4.src = "Protect_Overdrive.mp3";
var soundNpc5 = document.createElement('audio');
soundNpc5.src = "Hills_of_Promising_Adventures.ogg";

// Nhân vật NPC
function handleNpc() {
    if (gameFrame % 150 == 0) {
        NpcArray.push(new Npc());
    }
    for (let i = 0; i < NpcArray.length; i++) {
        NpcArray[i].update();
        NpcArray[i].draw(NpcImage);

        if (NpcArray[i].y < 0 - NpcArray[i].radius * 2) {
            NpcArray.splice(i, 1);
            i--;
        } else if (NpcArray[i].distance < NpcArray[i].radius + player.radius) {
            if (!NpcArray[i].counted) {
                if (NpcArray[i].sound == 'sound1') {
                    // soundNpc1.play();
                } else {
                    // soundNpc2.play();
                }
                score++;
                NpcArray[i].counted = true;
                NpcArray.splice(i, 1);
                i--;
            }
        }
    }
}

function handleNpc1() {
    if (gameFrame % 150 == 0) {
        NpcArray1.push(new Npc());
    }
    for (let i = 0; i < NpcArray1.length; i++) {
        NpcArray1[i].update();
        NpcArray1[i].draw(NpcImage1);

        if (NpcArray1[i].y < 0 - NpcArray1[i].radius * 2) {
            NpcArray1.splice(i, 1);
            i--;
        } else if (NpcArray1[i].distance < NpcArray1[i].radius + player.radius) {
            if (!NpcArray1[i].counted) {
                if (NpcArray1[i].sound == 'sound1') {
                    // soundNpc1.play();
                } else {
                    // soundNpc2.play();
                }
                score++;
                NpcArray1[i].counted = true;
                NpcArray1.splice(i, 1);
                i--;
            }
        }
    }
}

// Start game
canvas.addEventListener('click', function (){
    switch (game){
        case "ready":
            game = 'play'
            break;
        case "play":
            console.log("play")
            break;
    }
})

//Background
var background = new Image();
background.src = 'Wild01-Recovered.png';

function handleBackground() {
    ctx.drawImage(background, 0, 0, 1018, 767, 0, 0, canvas.width, canvas.height);
}

// Cloud
var cloud = new Image();
cloud.src = 'Worldmap20-Day.png';

var BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height - 200
}
function handleBackground1() {
    BG.x1 -= gameSpeed;
    if (BG.x1 < -BG.width) BG.x1 = BG.width;
    BG.x2 -= gameSpeed;
    if (BG.x2 < -BG.width) BG.x2 = BG.width;
    ctx.drawImage(cloud, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(cloud, BG.x2, BG.y, BG.width, BG.height);
}

// Enemies
var enemyImage = new Image();
enemyImage.src = 'Dragon.png';

class Enemy {
    constructor() {
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 5;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.width = 96;
        this.height = 96;
    }

    draw() {
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        ctx.drawImage(enemyImage, this.frameX * this.width, this.height,
            this.width, this.height, this.x - 85, this.y - 85, this.radius * 3, this.radius * 3);
    }

    update() {
        this.x -= this.speed;
        if (this.x < 0 - this.radius * 2) {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 5 + 2 ;
        }
        if (gameFrame % 5 == 0) {
            this.frame++;
            if (this.frame >= 12) {
                this.frame = 0;
            }
            if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
                this.frameX = 0;
            } else {
                this.frameX++;
            }
        }
        // Tính va chạm với người chơi
        var dx = this.x - player.x;
        var dy = this.y - player.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + player.radius) {
            handleGameOver();
        }
    }
}

// Khởi tạo enemy1
var dragon1 = new Enemy();
function handleEnemies1() {
    dragon1.draw();
    dragon1.update();
}
// Khởi tạo enemy2
var dragon2 = new Enemy();
function handleEnemies2() {
    dragon2.draw();
    dragon2.update();
}
// Khởi tạo enemy3
var dragon3 = new Enemy();
function handleEnemies3() {
    dragon3.draw();
    dragon3.update();
}

// Game Over
function handleGameOver() {
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 350, 350);
    gameOver = true;
    soundNpc4.pause();
    soundNpc3.play();
}

// Animation loop
function animate() {
    if (game == 'ready'){
        soundNpc5.play();

    } else if (game == 'play'){
        soundNpc5.pause();
        soundNpc4.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleNpc();
        handleNpc1();
        player.update();
        player.draw();
        handleBackground();
        handleBackground1()
        handleEnemies1();
        if (score >= 2) {
            handleEnemies1();
            handleEnemies2();
        }
        if (score >= 5) {
            handleEnemies1();
            handleEnemies2();
            handleEnemies3();
        }
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 30, 30);
        gameFrame++;

    }
    if (!gameOver) requestAnimationFrame(animate);
}

animate()