const container = document.querySelector(".area");
const display = document.querySelector(".display");

let isDragging = null;
let originX = null;
let originY = null;

const WIDTH = 20;
const HEIGHT = 20;

for (var i=0; i<WIDTH; i++) {
    var th = document.createElement('th');
    display.appendChild(th);
    for (var j=0; j<HEIGHT; j++) {
        var tr = document.createElement('tr');
        th.appendChild(tr);
        tr.innerHTML = '0';
    }
}


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