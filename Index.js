// Cài đặt Canvas
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = 1018;
canvas.height = 767;
ctx.font = '50px Geneva';

let game = 'ready';
let score = 0;
let gameFrame = 0;
let gameSpeed = 1;
let gameOver = false;

// Di chuyển chuột

// trả về giá trị khoảng cách từ top, bottom, right, left đến canvas
let canvasPosition = canvas.getBoundingClientRect();
var mouse = {
    x: 0,
    y: 0,
    click: false
}
canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});

// Character
var theHero = new Image();
theHero.src = '455-Other03.png';

class Hero {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height;
        this.radius = 25;
        this.X = 0;
        this.width = 32;
        this.height = 48;
    }

    check() {
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 5;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 5;
        }
    }

    draw() {

        if (this.x >= mouse.x) {
            ctx.drawImage(theHero, this.X * this.width, this.height,
                this.width, this.height, this.x - 16, this.y - 25, this.width * 1.1,
                this.height * 1.1);
        } else if (this.x <= mouse.x) {
            ctx.drawImage(theHero, this.X * this.width, this.height * 2,
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
// Khởi tạo nhân vật Hero
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
        this.y = canvas.height ;
        this.radius = 15;
        this.speed = (Math.random() * 5) + 1;
    }

    check() {
        this.y -= this.speed;
        var dx = this.x - player.x;
        var dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw(image) {
        ctx.drawImage(image, this.x - 20, this.y - 23, this.radius * 2, this.radius * 3)
    }
}

// Nhân vật NPC
function createNpc() {
    if (gameFrame % 150 == 0) {
        NpcArray.push(new Npc());
    }
    for (let i = 0; i < NpcArray.length; i++) {
        NpcArray[i].check();
        NpcArray[i].draw(NpcImage);

        if (NpcArray[i].y < NpcArray[i].radius * 2) {
            NpcArray.splice(i, 1);
            i--;
        } else if (NpcArray[i].distance < NpcArray[i].radius + player.radius) {
                score++;
                NpcArray.splice(i, 1);
                i--;
        }
    }
}

function createNpc1() {
    if (gameFrame % 150 == 0) {
        NpcArray1.push(new Npc());
    }
    for (let i = 0; i < NpcArray1.length; i++) {
        NpcArray1[i].check();
        NpcArray1[i].draw(NpcImage1);

        if (NpcArray1[i].y < 0 - NpcArray1[i].radius * 2) {
            NpcArray1.splice(i, 1);
            i--;
        } else if (NpcArray1[i].distance < NpcArray1[i].radius + player.radius) {
                score++;
                NpcArray1.splice(i, 1);
                i--;
        }
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
soundNpc4.src = "Protect.mp3";
var soundNpc5 = document.createElement('audio');
soundNpc5.src = "Hills.ogg";


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

//Background Start
var backgroundstart = new Image();
backgroundstart.src = 'Wild01-Recovered Peace.png';

function createBackgroundstart() {
    ctx.drawImage(backgroundstart, 0, 0, 1018, 767, 0, 0, canvas.width, canvas.height);
}
//Background Play
var backgroundplay = new Image();
backgroundplay.src = 'Wild01-Recovered.png';

function createBackgroundplay() {
    ctx.drawImage(backgroundplay, 0, 0, 1018, 767, 0, 0, canvas.width, canvas.height);
}

// Cloud
var cloud = new Image();
cloud.src = 'Worldmap20-Day.png';

var backGround = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height - 200
}
function createBackground1() {
    backGround.x1 -= gameSpeed;
    if (backGround.x1 < -backGround.width) backGround.x1 = backGround.width;
    backGround.x2 -= gameSpeed;
    if (backGround.x2 < -backGround.width) backGround.x2 = backGround.width;
    ctx.drawImage(cloud, backGround.x1, backGround.y, backGround.width, backGround.height);
    ctx.drawImage(cloud, backGround.x2, backGround.y, backGround.width, backGround.height);
}

// Enemies
var enemyImage = new Image();
enemyImage.src = 'Dragon.png';

class Enemy {
    constructor() {
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 5;
        this.frame = 0;
        this.X = 0;
        this.width = 96;
        this.height = 96;
    }

    draw() {
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        ctx.drawImage(enemyImage, this.X * this.width, this.height,
            this.width, this.height, this.x - 85, this.y - 85, this.radius * 3, this.radius * 3);
    }

    check() {
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
                this.X = 0;
            } else {
                this.X++;
            }
        }
        // Tính va chạm với người chơi
        var dx = this.x - player.x;
        var dy = this.y - player.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + player.radius) {
            createGameOver();
        }
    }
}

// Khởi tạo enemy1
var dragon1 = new Enemy();
function createEnemies1() {
    dragon1.draw();
    dragon1.check();
}
// Khởi tạo enemy2
var dragon2 = new Enemy();
function createEnemies2() {
    dragon2.draw();
    dragon2.check();
}
// Khởi tạo enemy3
var dragon3 = new Enemy();
function createEnemies3() {
    dragon3.draw();
    dragon3.check();
}

// Game Over
function createGameOver() {
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 350, 350);
    gameOver = true;
    soundNpc4.pause();
    soundNpc3.play();
}

// Animation loop
function animate() {
    soundNpc5.play();
    if (game == 'ready'){
        createBackgroundstart();
    } else if (game == 'play'){
        soundNpc5.pause();
        soundNpc4.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createNpc();
        createNpc1();
        player.check();
        player.draw();
        createBackgroundplay();
        createBackground1()

        createEnemies1();
        if (score >= 10) {
            createEnemies1();
            createEnemies2();
        }
        if (score >= 30) {
            createEnemies1();
            createEnemies2();
            createEnemies3();
        }
        ctx.fillStyle = 'red';
        ctx.fillText('Score: ' + score, 30, 40);
        gameFrame++;

    }
    if (!gameOver) requestAnimationFrame(animate);
}

animate()