const M = Math;
const m = math;
const container = document.querySelector(".area");
const display = document.querySelector(".display");

let isDragging = null;
let originX = null;
let originY = null;

const WIDTH = 40;
const HEIGHT = 40;

const THETA_NUM = 100;
const PHI_NUM = 100;
const a = 5;
const b = 14;
const LIGHT = unit([0,1,1]);
const CHAR = ['.', ',', '-', '~', ':', ';', '=', '!', '*', '#', '$', '@']

var rotateX = 0;
var rotateZ = 0;
var zArray = create2DArray(WIDTH, HEIGHT);


// Create WIDTH, HEIGHT size table
for (var i=0; i<HEIGHT; i++) {
    var tr = document.createElement('tr');
    display.appendChild(tr);
    for (var j=0; j<WIDTH; j++) {
        var td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = ' ';
    }
}

// drag and drop mouse event
container.addEventListener("mousedown", (e) => {
    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if(isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        // rotateX = diffX/100;
        // rotateZ = diffY/100;
        // clearDisplay();
        // drawDonut();
        document.querySelector('.text p:nth-child(1)').innerHTML = String(diffX);
        document.querySelector('.text p:nth-child(2)').innerHTML = String(diffY);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        rotateX -= 0.1*Math.PI;
    } else if (e.key == "ArrowRight") {
        rotateX += 0.1*Math.PI;
    } else if (e.key == "ArrowUp") {
        rotateZ += 0.1*Math.PI;
    } else if (e.key == "ArrowDown") {
        rotateZ -= 0.1*Math.PI;
    }
    clearDisplay();
    clear2DArray(zArray);
    drawDonut();
});
