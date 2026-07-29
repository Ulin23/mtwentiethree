/* Existentialist Café — landing page behaviour */

document.addEventListener('DOMContentLoaded', () => {
    initParallaxTitle();
    initBackgroundParticles();
    initFloatingSquares();
    initCursorSpotlight();
    initClickToRevealTime();
    initClickToRevealLocation();
    initEssenceScroll();
    initWhoAmI();
    initTimeTravelVideo();
});

/* ---- title / subtitle + mirror fade on scroll ---- */
function initParallaxTitle() {
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const mirror = document.getElementById('mirror');
    const FADE_DISTANCE_PX = 700;

    window.addEventListener('scroll', () => {
        const opacity = Math.min(1, Math.max(0, window.scrollY / FADE_DISTANCE_PX));
        mirror.style.opacity = opacity;
    });

    setTimeout(() => title.classList.add('active'), 500);

    title.addEventListener('click', () => subtitle.classList.toggle('active'));
}

/* ---- background particle field (particles.js) ---- */
function initBackgroundParticles() {
    particlesJS('particles', {
        particles: {
            number: { value: 800, density: { enable: true, value_area: 800 } },
            color: { value: '#71CED9' },
            shape: { type: 'circle', stroke: { width: 0, color: '#F26A4B' } },
            opacity: { value: 0.7, random: true, anim: { enable: true, speed: 0.2, opacity_min: 0 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0 } },
            line_linked: { enable: false },
            move: { enable: true, speed: 0.2, direction: 'top', random: true, straight: false, out_mode: 'out' },
        },
        interactivity: {
            events: { onhover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 80, duration: 0.4 } },
        },
    });
}

/* ---- drifting squares in the background ---- */
function initFloatingSquares() {
    const squareContainer = document.getElementById('square-container');
    const MIN_SQUARES = 17;
    const MAX_SQUARES = 23;
    const count = randomInt(MIN_SQUARES, MAX_SQUARES);

    for (let i = 0; i < count; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        squareContainer.appendChild(square);
        placeSquare(square);
        animateSquare(square);
    }

    function placeSquare(square) {
        const size = Math.random() * 90 + 10;
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.left = `${Math.random() * window.innerWidth}px`;
        square.style.top = `${Math.random() * window.innerHeight}px`;
    }

    function animateSquare(square) {
        const speed = Math.random() * 3 + 1;
        let directionX = Math.random() < 0.5 ? 1 : -1;
        let directionY = Math.random() < 0.5 ? 1 : -1;

        function step() {
            const left = parseFloat(square.style.left) + speed * directionX;
            const top = parseFloat(square.style.top) + speed * directionY;

            if (left < 0 || left + square.clientWidth > window.innerWidth) directionX *= -1;
            if (top < 0 || top + square.clientHeight > window.innerHeight) directionY *= -1;

            square.style.left = `${left}px`;
            square.style.top = `${top}px`;
            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }
}

/* ---- cursor-following spotlight ---- */
function initCursorSpotlight() {
    const spotlight = document.getElementById('cursor-spotlight');
    window.addEventListener('mousemove', (event) => {
        spotlight.style.left = `${event.clientX}px`;
        spotlight.style.top = `${event.clientY}px`;
    });
}

/* ---- "What Time Is It Now?" toggles the live clock ---- */
function initClickToRevealTime() {
    const timeEl = document.getElementById('time');
    const originalText = timeEl.innerHTML;
    let showingTime = false;

    function render() {
        timeEl.innerHTML = showingTime ? new Date().toString() : originalText;
    }

    timeEl.addEventListener('click', () => {
        showingTime = !showingTime;
        render();
    });

    setInterval(render, 1000);
}

/* ---- "! & Here I Am!" toggles the visitor's geolocation ---- */
function initClickToRevealLocation() {
    const locationEl = document.getElementById('location');
    const originalText = locationEl.innerHTML;
    let showingLocation = false;

    locationEl.addEventListener('click', () => {
        showingLocation = !showingLocation;

        if (!showingLocation) {
            locationEl.innerHTML = originalText;
            return;
        }

        if (!navigator.geolocation) {
            locationEl.innerHTML = 'Geolocation is not supported by this browser.';
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationEl.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
            },
            (error) => {
                console.error('Error getting geolocation:', error.message);
                locationEl.innerHTML = 'Unable to retrieve location.';
            }
        );
    });
}

/* ---- clicking "essence" scrolls to the circle ---- */
function initEssenceScroll() {
    document.getElementById('essence').addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
}

/* ---- "Who Am I?" swaps to "What Do I Do?" then plays the transition video ---- */
function initWhoAmI() {
    const whoAmI = document.getElementById('who-am-i');
    const startingPoint = document.getElementById('starting-point');
    const HOVER_OUT_DELAY_MS = 300;
    let hoverTimeout;

    whoAmI.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        whoAmI.style.display = 'none';
        startingPoint.style.display = 'flex';
    });

    startingPoint.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
            startingPoint.style.display = 'none';
            whoAmI.style.display = 'flex';
        }, HOVER_OUT_DELAY_MS);
    });

    startingPoint.addEventListener('click', () => {
        startingPoint.style.display = 'none';
        document.getElementById('video').style.display = 'block';
    });
}

/* ---- clicking the transition video moves to the café interior ---- */
function initTimeTravelVideo() {
    document.getElementById('video').addEventListener('click', () => {
        window.location.href = 'inside.html';
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
