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

    const accentLine = document.querySelector('.accent-line');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        accentLine.style.width = scrollPercent + '%';
    });

    const pulsingCards = document.querySelectorAll('.edu-card');
    pulsingCards.forEach(card => {
        card.style.animationDelay = '0s';
    });

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

    const expCards = document.querySelectorAll('.exp-cards .edu-card');
    expCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('open');
        });
    });

    const expStops = document.querySelectorAll('.exp-stop');
    const expDetail = document.getElementById('expDetail');

    const expData = {
        expStop1: {
            date: 'April 2026 — Present',
            company: 'Surf & Turf Coffee Shop',
            role: 'Manager',
            bullets: [
                'Managing daily operations of the coffee shop',
                'Leading and supervising staff',
                'Stock management and ordering',
                'Ensuring quality standards are maintained'
        ]
    },
    expStop2: {
        date: 'September 2025 — April 2026',
        company: 'Surf & Turf Coffee Shop',
        role: 'Barista & Barista Trainer',
        bullets: [
            'Delivered high-quality customer service in a fast-paced environment',
            'Prepared specialty beverages and ensured consistent quality',
            'Trained new baristas on coffee preparation and customer service',
            'Supervised daily operations and assisted with stock management'
        ]
    },
    expStop3: {
        date: 'February 2025 — September 2025',
        company: 'Hooked Coffee Co.',
        role: 'Barista',
        bullets: [
            'Prepared coffee and beverages according to store standards',
            'Provided friendly and efficient customer service',
            'Handled customer orders and point-of-sale transactions',
            'Maintained cleanliness and hygiene of the workspace'
        ]
    },
    expStop4: {
        date: 'March 2022 — July 2023',
        company: 'Slouw Cafe',
        role: 'Barista & Waiter',
        bullets: [
            'Prepared coffee and beverages while assisting customers',
            'Took food and drink orders and provided table service',
            'Handled POS transactions and basic cash management',
            'Worked effectively as part of a team in a fast-paced environment'
        ]
    }
};

    expStops.forEach(stop => {
        stop.addEventListener('click', () => {
            expStops.forEach(s => s.classList.remove('active'));
            stop.classList.add('active');

            const data = expData[stop.id];
            expDetail.innerHTML = `
                <span class="exp-date">${data.date}</span>
                <h3 class="exp-place">${data.company}</h3>
                <p class="exp-role">${data.role}</p>
                <ul class="exp-bullets">
                ${data.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
            `;
        });
    });
});


