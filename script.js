const M = Math;
const m = math;
const container = document.querySelector(".area");
const display = document.querySelector(".display");

let isDragging = null;
let originX = null;
let originY = null;

const WIDTH = 40;
const HEIGHT = 40;

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

var rotateX = 0;
var rotateZ = 0;

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


const THETA_NUM = 50;
const PHI_NUM = 50;
const a = 5;
const b = 14;
const LIGHT = [0,-1,1];
const CHAR = ['.', ',', '-', '~', ':', ';', '=', '!', '*', '#', '$', '@']
var zArray = create2DArray(WIDTH, HEIGHT);

function clearDisplay() {
    for (var i=1; i<WIDTH+1; i++) {
        for (var j=1; j<WIDTH+1; j++) {
            document.querySelector('table tr:nth-child('+String(i)+') td:nth-child('+String(j)+')').innerHTML = " ";
        }
    }
}


function drawDonut() {
    for (var i=0; i<THETA_NUM; i++) {
        for (var j=0; j<PHI_NUM; j++) {
            var theta = 2*M.PI*i/THETA_NUM;
            var phi = 2*M.PI*j/PHI_NUM;
            
            var r = [
                M.cos(phi)*(a*M.cos(theta)+b),
                M.sin(phi)*(a*M.cos(theta)+b),
                a*M.sin(theta)
            ];
            
            var normal = unit([
                M.cos(theta)*M.cos(phi), 
                M.cos(theta)*M.sin(phi), 
                M.sin(theta)
            ]);
            
            r = m.multiply(m.matrix(r), roateMatrixByX(rotateX), rotateMatrixByZ(rotateZ))._data;
            normal = m.multiply(m.matrix(normal), roateMatrixByX(rotateX), rotateMatrixByZ(rotateZ))._data;
            
            var luminance = M.floor(dotProduct(normal, LIGHT)*8);
    
            r = [
                M.floor(r[0]+WIDTH/2),
                M.floor(r[1]+HEIGHT/2),
                r[2] = M.floor(r[2])
            ];
            // && zArray[r[0]][r[1]]<r[2]
            if (0<r[0] && r[0]<HEIGHT && 0<r[1] && r[1]<WIDTH && luminance>=0) {
                zArray[r[0]][r[1]] = r[2];
                document.querySelector('table tr:nth-child('+String(r[0])+') td:nth-child('+String([r[1]])+')').innerHTML = CHAR[luminance];
            }
            
        }
    }
}
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
    drawDonut();
});
