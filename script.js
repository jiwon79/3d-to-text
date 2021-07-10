const container = document.querySelector(".area");
const box = document.querySelector(".area__box");

const {width: containerWidth, height: containerHeight} = container.getBoundingClientRect();
const {width: boxWidth, height: boxHeight} = box.getBoundingClientRect();

let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;

box.addEventListener("mousedown", (e) => {
    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;
    originLeft = box.offsetLeft;
    originTop = box.offsetTop;
    console.log(originLeft, originTop);
});

document.addEventListener("mouseup", (e) => {
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if(isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        const endOfXPoint = containerWidth - boxWidth;
        const endOfYPoint = containerHeight - boxHeight;
        box.style.left = `${Math.min(Math.max(0, originLeft+diffX), endOfXPoint)}px`;
        box.style.top = `${Math.min(Math.max(0, originTop+diffY), endOfYPoint)}px`;
    }
});