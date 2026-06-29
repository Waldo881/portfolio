const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);

const simplex = new SimplexNoise();
let time = 0;

const cols = 120;
const rows = 80;

function drawTopo() {
    ctx.clearRect(0, 0, width, height);

    const values = new Array(cols * rows);
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
            values[y * cols + x] = simplex.noise3D(x * 0.05, y * 0.05, time * 0.0002);
        }
    }

    const contours = d3.contours()
        .size([cols, rows])
        .thresholds(d3.range(-1, 1, 0.2))(values); 
    
    const scaleX = width / cols;
    const scaleY = height / rows;

   contours.forEach((contour, i) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(45, 90, 61, ${0.04 + i * 0.015})`;
        ctx.lineWidth = 1.8;

        contour.coordinates.forEach(polygon => {
            polygon.forEach(ring => {
                ring.forEach((point, j) => {
                    const x = point[0] * scaleX;
                    const y = point[1] * scaleY;
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.closePath();
            });
        });

        ctx.stroke();
    });
    time++;
    requestAnimationFrame(drawTopo);
}

drawTopo();

document.addEventListener('DOMContentLoaded', () => {

    const scrollBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    const eduCard = document.getElementById('eduCard');
    eduCard.addEventListener('click', () => {
    eduCard.classList.toggle('open');
});
})