document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const cursorSpotlight = document.getElementById('cursor-spotlight');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    var mirror = document.getElementById('mirror');

    window.addEventListener('scroll', function () {
        var opacity = 0 + window.scrollY / 700;
        opacity = Math.min(1, Math.max(0, opacity));
        mirror.style.opacity = opacity;
      });

    setTimeout(() => {
        title.classList.add('active');
    }, 500);

    title.addEventListener('click', function () {
        subtitle.classList.toggle('active');
    });

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

    window.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        cursorSpotlight.style.left = `${mouseX}px`;
        cursorSpotlight.style.top = `${mouseY}px`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const squareContainer = document.getElementById('square-container');
    const minSquares = 17;
    const maxSquares = 23;
    const numSquares = getRandomNumber(minSquares, maxSquares);

    for (let i = 0; i < numSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        squareContainer.appendChild(square);

        setPositionAndSize(square);
        animateSquare(square);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setPositionAndSize(square) {
        const size = Math.random() * 90 + 10;
        const left = Math.random() * window.innerWidth;
        const top = Math.random() * window.innerHeight;

        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.left = `${left}px`;
        square.style.top = `${top}px`;
    }

    function animateSquare(square) {
        const speed = Math.random() * 3 + 1;
        const directionX = Math.random() < 0.5 ? 1 : -1;
        const directionY = Math.random() < 0.5 ? 1 : -1;

        function moveSquare() {
            const currentLeft = parseFloat(square.style.left);
            const currentTop = parseFloat(square.style.top);

            const newLeft = currentLeft + speed * directionX;
            const newTop = currentTop + speed * directionY;

            if (newLeft < 0 || newLeft + square.clientWidth > window.innerWidth) {
                directionX *= -1;
            }

            if (newTop < 0 || newTop + square.clientHeight > window.innerHeight) {
                directionY *= -1;
            }

            square.style.left = `${newLeft}px`;
            square.style.top = `${newTop}px`;

            requestAnimationFrame(moveSquare);
        }

        moveSquare();
    }
});

var timeElement = document.getElementById("time");
var originalText = timeElement.innerHTML;
var isTimeVisible = false;

function updateDisplay() {
    if (isTimeVisible) {
        timeElement.innerHTML = new Date();
    } else {
        timeElement.innerHTML = originalText;
    }
}

timeElement.onclick = function() {
    isTimeVisible = !isTimeVisible;
    updateDisplay();
};

setInterval(updateDisplay, 1000);


var locationElement = document.getElementById("location");
var originalLocationText = locationElement.innerHTML;

function updateLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            locationElement.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
        }, function(error) {
            console.error("Error getting geolocation:", error.message);
            locationElement.innerHTML = "Unable to retrieve location.";
        });
    } else {
        locationElement.innerHTML = "Geolocation is not supported by this browser.";
    }
}

var locationState = false;

locationElement.onclick = function() {
    if (locationState) {
        locationElement.innerHTML = originalLocationText;
    } else {
        updateLocation();
    }
    
    locationState = !locationState;
};

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}


let hoverTimeout;

function showWhatDoIDo() {
    clearTimeout(hoverTimeout);
    document.getElementById('who-am-i').style.display = 'none';
    document.getElementById('starting-point').style.display = 'block';
}

function hideWhatDoIDo() {
    hoverTimeout = setTimeout(() => {
        document.getElementById('starting-point').style.display = 'none';
        document.getElementById('who-am-i').style.display = 'block';
    }, 300);
}

function showVideo() {
    document.getElementById('starting-point').style.display = 'none';
    document.getElementById('video').style.display = 'block';
}

function goToAnotherPage() {
    window.location.href = 'inside.html';
}
