const modeBtn = document.getElementById('mode-btn');
const resetBtn = document.getElementById('reset-btn');
const eraseBtn = document.getElementById('erase-btn');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const lineWidth = document.getElementById('line-width');
const lineColor = document.getElementById('line-color');
const rangeDisplay = document.getElementsByClassName('range-display');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = 2;
let isPainting = false;
let isFilling = false;

// 1. 클릭으로 색이 변화하는 선 그리기
/* const colors = [
    '#55efc4',
    '#81ecec',
    '#74b9ff',
    '#a29bfe',
    '#00cec9',
    '#6c5ce7',
    '#fd79a8',
    '#e84393',
    '#d63031',
    '#ff7675',
    '#fab1a0',
    '#ffeaa7'
];

function onDrawing(e) {
    const color = colors[Math.floor(Math.random() * colors.length)];

    ctx.moveTo(0,0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.beginPath();
}

canvas.addEventListener('click', onDrawing); */


// 2. 클릭한 채로 움직일 때 선 그리기

function onMove(e) {
    if(isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting(e) {
    isPainting = true;
}

function stopPainting(e) {
    isPainting = false;
    ctx.beginPath();
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);


// 3. input type="range"로 선 두께 조절하기
function onChangeWidth(e) {
    ctx.lineWidth = e.target.value;
}

lineWidth.addEventListener('input', onChangeWidth);


// 4. input type="color"로 선 색 조절하기
function onChangeColor(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

lineColor.addEventListener('input', onChangeColor);


// 5. 컬러팔레트로 선 색 주기 
function onColorClick(event) {
    const colorValue = event.target.dataset.color;;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;

    //컬러팔레트 클릭 시, input color도 같은 색 적용
    lineColor.value = colorValue;
}
colorOptions.forEach(color => color.addEventListener('click', onColorClick));


// 6. 색 채우기 버튼 만들기
function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = 'Fill';
    } else {
        isFilling = true;
        modeBtn.innerText = 'Stroke';
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

modeBtn.addEventListener('click', onModeClick);
canvas.addEventListener('click', onCanvasClick);


// 7. 리셋 버튼 만들기 = 흰색으로 캔버스 전체를 칠하는 것
function onResetClick() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

resetBtn.addEventListener('click', onResetClick);


// 8. 지우기 버튼 만들기 = 흰색으로 그리는 것
function onEraseClick() {
    ctx.strokeStyle = 'white';
    isFilling = false;
    modeBtn.innerText = 'Fill';
}

eraseBtn.addEventListener('click', onEraseClick);