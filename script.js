const M = Math;
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

document.addEventListener("mousemove", (e) => {
    if(isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        document.querySelector('.text p:nth-child(1)').innerHTML = String(diffX);
        document.querySelector('.text p:nth-child(2)').innerHTML = String(diffY);
    }
});


const THETA_NUM = 100;
const PHI_NUM = 100;
const a = 5;
const b = 12;
const LIGHT = [0,-1,1];
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

// Calculate dot product
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

// Create 2 dimention array
function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
        arr[i].fill(-1);
    }
    return arr;
}

zArray = create2DArray(WIDTH, HEIGHT);

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
        var luminance = M.floor(dotProduct(normal, LIGHT)*8);

        r = [
            M.floor(r[0]+WIDTH/2),
            M.floor(r[1] + HEIGHT/2),
            r[2] = M.floor(r[2])
        ];

        if(r[0]==M.floor(WIDTH/2+1) && r[1]==8){
            console.log(normal,luminance,theta,unit([M.cos(theta), M.sin(theta), M.tan(phi)]),r)
        }
        if (0<r[0]<WIDTH && 0<r[1]<HEIGHT && luminance>=0 && zArray[r[0]][r[1]]<r[2]) {
            zArray[r[0]][r[1]] = r[2];
            document.querySelector('table tr:nth-child('+String(r[0])+') td:nth-child('+String([r[1]])+')').innerHTML = CHAR[luminance];
        }
        
    }
}