const container = document.querySelector(".area");
const display = document.querySelector(".display");

let isDragging = null;
let originX = null;
let originY = null;

const WIDTH = 40;
const HEIGHT = 30;

for (var i=0; i<HEIGHT; i++) {
    var tr = document.createElement('tr');
    display.appendChild(tr);
    for (var j=0; j<WIDTH; j++) {
        var td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = '#';
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