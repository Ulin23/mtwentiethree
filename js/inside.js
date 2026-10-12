/* Existentialist Café — interior page behaviour */

const SESSION_LENGTH_MS = 60000; // the whole page is built around this 1-minute "lifespan"

document.addEventListener('DOMContentLoaded', () => {
    initBackgroundParticles();
    initCountdown();
    initCursorSpotlight();
    initIdentityCard();
    initMoirePatterns();
    initBackgroundColorCycle();
    initBlackHoleReveal();
    initVideoBackgroundSwap();
    initBookExcerpts();
    initGoBackWarning();
    initIdentityEditor();
    initIdentityRandomizers();
    initExistentialistWander();
    initSessionEnd();
});

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

/* ---- 1-minute countdown that ends the "life" of the page ---- */
function initCountdown() {
    const timerEl = document.getElementById('timer');
    const countdownSeconds = SESSION_LENGTH_MS / 1000;
    let remaining = countdownSeconds;

    render();
    const interval = setInterval(() => {
        remaining--;
        render();
        if (remaining <= 0) {
            clearInterval(interval);
            alert("Time's up!");
        }
    }, 1000);

    function render() {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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

/* ---- "Me, Myself, and I" card drifts to a random spot on hover ---- */
function initIdentityCard() {
    const identity = document.getElementById('user-identity');
    identity.innerText = 'Me,Myself,andI';
    identity.addEventListener('mouseover', () => moveToRandomPosition(identity));
}

function moveToRandomPosition(element) {
    const OFFSET_LEFT = -230;
    const OFFSET_TOP = 300;
    const maxLeft = document.body.clientWidth - element.clientWidth - OFFSET_LEFT;
    const maxTop = document.body.clientHeight - element.clientHeight - OFFSET_TOP;

    element.style.left = `${Math.floor(Math.random() * maxLeft) + OFFSET_LEFT}px`;
    element.style.top = `${Math.floor(Math.random() * maxTop) + OFFSET_TOP}px`;
}

/* ---- decorative moiré pattern tiles ---- */
function initMoirePatterns() {
    const PATTERNS_PER_CONTAINER = 10;
    document.querySelectorAll('.moire-container1, .moire-container2, .moire-container3').forEach((container) => {
        for (let i = 0; i < PATTERNS_PER_CONTAINER; i++) {
            const pattern = document.createElement('div');
            pattern.classList.add('moire-pattern');
            container.appendChild(pattern);
        }
    });
}

/* ---- background color cycles for the first minute, then settles white ---- */
function initBackgroundColorCycle() {
    const COLORS = [
        '#F2CC56', '#56A5F2', '#56F2CC', '#F256D6', '#56F2B0',
        '#F28E56', '#9756F2', '#F25E56', '#56F28E', '#F256A5',
        '#56D6F2', '#F2B056', '#F25672', '#56CCF2', '#F29456',
        '#566DF2', '#F2A556', '#56F2D6', '#F2568E', '#56B0F2',
    ];
    const CHANGE_INTERVAL_MS = 5000;

    const interval = setInterval(() => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        document.body.style.backgroundColor = color;
    }, CHANGE_INTERVAL_MS);

    setTimeout(() => {
        document.body.style.backgroundColor = '#fff';
        clearInterval(interval);
    }, SESSION_LENGTH_MS);
}

/* ---- hover the "?" to reveal the black hole that leads back out ---- */
function initBlackHoleReveal() {
    const finishButton = document.getElementById('finish');
    const blackHole = document.getElementById('black-hole');

    finishButton.addEventListener('mouseover', () => {
        finishButton.style.display = 'none';
        blackHole.style.display = 'inline-block';
    });

    blackHole.addEventListener('mouseout', () => {
        blackHole.style.display = 'none';
        finishButton.style.display = 'block';
    });
}

/* ---- the dynamic noise video is replaced with a static overlay after a minute ---- */
function initVideoBackgroundSwap() {
    const video = document.getElementById('video-background');

    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay-background');
        document.body.appendChild(overlay);
        video.remove();
    }, SESSION_LENGTH_MS);
}

/* ---- clicking a book excerpt updates the one-line summary ---- */
function initBookExcerpts() {
    const summarization = document.getElementById('summarization');
    document.querySelectorAll('.interactive-section').forEach((section) => {
        section.addEventListener('click', () => {
            summarization.innerText = section.dataset.summary;
        });
    });
}

/* ---- "Go Back" always shows a reminder that time only moves forward ---- */
function initGoBackWarning() {
    const goBackEl = document.getElementById('go-back');
    const popupEl = document.getElementById('popup');

    goBackEl.addEventListener('click', () => {
        popupEl.style.display = 'block';
    });

    window.closePopup = () => {
        popupEl.style.display = 'none';
    };
}

/* ---- "Hey, Define Yourself!!!" opens the identity-naming modal, for the first minute only ---- */
function initIdentityEditor() {
    const reflectionButton = document.getElementById('reflection-button');
    const userIdentity = document.getElementById('user-identity');
    const modal = document.getElementById('myModal');
    const closeModal = document.getElementById('closeModal');
    const submitModal = document.getElementById('submitModal');
    const userInputModal = document.getElementById('userInputModal');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModalHandler() {
        modal.style.display = 'none';
    }

    function submitModalHandler() {
        const value = userInputModal.value.trim();
        if (value !== '') {
            userIdentity.innerText = value;
            sessionStorage.setItem('userInput', value);
            modal.style.display = 'none';
        }
    }

    reflectionButton.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    submitModal.addEventListener('click', submitModalHandler);

    setTimeout(() => {
        reflectionButton.removeEventListener('click', openModal);
        closeModal.removeEventListener('click', closeModalHandler);
        submitModal.removeEventListener('click', submitModalHandler);
    }, SESSION_LENGTH_MS);
}

/* ---- the seven philosopher portraits each randomize one style property
   of the identity card, and wander the screen — for the first minute only ---- */
function initIdentityRandomizers() {
    const userIdentity = document.getElementById('user-identity');

    const randomizers = {
        'font-image': () => {
            const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Segoe UI'];
            userIdentity.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        },
        'size-image': () => {
            userIdentity.style.fontSize = `${Math.floor(Math.random() * 100) + 80}px`;
        },
        'color-image': () => {
            userIdentity.style.color = randomHexColor();
        },
        'blend-mode-image': () => {
            const modes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'];
            userIdentity.style.mixBlendMode = modes[Math.floor(Math.random() * modes.length)];
        },
        'background-image': () => {
            userIdentity.style.backgroundColor = randomHexColor();
        },
        'radius-image': () => {
            userIdentity.style.borderRadius = `${Math.floor(Math.random() * 100)}px`;
        },
        'shadow-image': () => {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const blur = Math.floor(Math.random() * 10);
            userIdentity.style.textShadow = `${x}px ${y}px ${blur}px rgba(0, 0, 0, 0.5)`;
        },
    };

    const portraitImages = Object.keys(randomizers).map((id) => document.getElementById(id));

    portraitImages.forEach((image) => {
        image.addEventListener('click', randomizers[image.id]);
    });

    setTimeout(() => {
        portraitImages.forEach((image) => {
            image.style.pointerEvents = 'none';
        });
    }, SESSION_LENGTH_MS);
}

function randomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

/* ---- portraits drift sideways on their own ---- */
function initExistentialistWander() {
    const WANDER_INTERVAL_MS = 2400;
    document.querySelectorAll('.existentialists img').forEach((image) => {
        setInterval(() => {
            const maxX = window.innerWidth - image.offsetWidth;
            image.style.transition = 'left .8s, right .8s';
            image.style.left = `${Math.random() * maxX}px`;
        }, WANDER_INTERVAL_MS);
    });
}

/* ---- after a minute, hide the café content and reveal the closing "black hole in the universe" scene ---- */
function initSessionEnd() {
    const ELEMENTS_TO_HIDE = [
        '#summarization',
        '#summary-background',
        '#book-excerpts',
        '.existentialists',
        '.moire-container1',
        '.moire-container2',
        '.moire-container3',
        '#timer',
    ];

    setTimeout(() => {
        document.querySelectorAll(ELEMENTS_TO_HIDE.join(', ')).forEach((el) => {
            el.style.display = 'none';
        });

        document.getElementById('end').style.display = 'block';
        document.getElementById('finish-video').style.display = 'block';
        document.getElementById('half-earth').style.display = 'block';
    }, SESSION_LENGTH_MS);
}
