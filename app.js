const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

const colors = [
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

function onClick(e) {
    const color = colors[Math.floor(Math.random() * colors.length)];

    ctx.strokeStyle = color;
    ctx.moveTo(0,0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
}

canvas.addEventListener('click', onClick);