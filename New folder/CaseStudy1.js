// Cài đặt Canvas
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 730;

let score = 0;
let gameFrame = 0 ;
ctx.font = '50px Georgia';

// Di chuyển chuột
var canvasPosition = canvas.getBoundingClientRect()
var mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse.x,mouse.y)
});
// Character
// NPC
// Animation loop