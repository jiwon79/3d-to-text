const M = Math;
const container = document.querySelector(".area");
const display = document.querySelector(".display");

let isDragging = null;
let originX = null;
let originY = null;

const WIDTH = 40;
const HEIGHT = 30;

// Create WIDTH, HEIGHT size table
for (var i=0; i<HEIGHT; i++) {
    var tr = document.createElement('tr');
    display.appendChild(tr);
    for (var j=0; j<WIDTH; j++) {
        var td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = '#';
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
        document.querySelector('.text p:nth-child(1)').innerHTML = String(diffX);
        document.querySelector('.text p:nth-child(2)').innerHTML = String(diffY);
    }
});


const THETA_NUM = 10;
const PHI_NUM = 10;
const a = 5;
const b = 12;
const LIGHT = [0,1,-1];
const CHAR = ['.', ',', '-', '~', ':', ';', '=', '!', '*', '#', '$', '@']

// Calculate vector magnitude
function magnitude(vec) {
    result = 0;
    for (var i=0; i<vec.length; i++) {
        result += vec[i]*vec[i]
    }

    return M.sqrt(result)
}

// Calculate unit vector
function unit(vec) {
    var mag = magnitude(vec);
    var result = [];
    for (var i=0; i<vec.length; i++) {
        result.push(vec[i]/mag);
    }

    return result;
}

function dotProduct(vec1, vec2) {
    if (vec1.length != vec2.length) {
        return false;
    }

    var result = 0;
    for (var k=0; k<vec1.length; k++) {
        result += vec1[k]*vec2[k]
    }
    return result
}

for (var i=0; i<THETA_NUM; i++) {
    for (var j=0; j<PHI_NUM; j++) {
        var theta = 2*M.PI*i/THETA_NUM;
        var phi = 2*M.PI*j/PHI_NUM;

        var r = [
            M.cos(phi)*(a*M.cos(theta)+b),
            M.sin(phi)*(a*M.cos(theta)+b),
            a*M.sin(theta)
        ];
        var normal = unit([M.cos(theta), M.sin(theta), M.tan(phi)]);

        var luminance = dotProduct(normal, [0,1,-1])*8;
        console.log(luminance);
    }
}