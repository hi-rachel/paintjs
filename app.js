const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = Array.from(document.getElementsByClassName("jsColor"));
const lineWidth = document.getElementById("jsRange");
const color = document.getElementById("color");
const mode = document.getElementById("jsMode");
const eraser = document.getElementById("jsEraser");
const deleteAll = document.getElementById("jsDelete");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 800;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    mode.innerText = "FIll";
  } else {
    isFilling = true;
    mode.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  mode.innerText = "FIll";
}

function onDeleteAllClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colors.forEach((color) => color.addEventListener("click", onColorClick));

mode.addEventListener("click", onModeClick);
eraser.addEventListener("click", onEraserClick);
deleteAll.addEventListener("click", onDeleteAllClick);
