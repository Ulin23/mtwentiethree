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

    var container = document.getElementById("container");

    function hideContainer() {
        container.style.display = "none";
    }

    setTimeout(hideContainer, 60000);

document.addEventListener('DOMContentLoaded', function () {
    const countdownTime = 60;
    let timeRemaining = countdownTime;
    

    updateTimerDisplay();

    const countdownInterval = setInterval(function () {
        timeRemaining--;

        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            showPopup(); 
        }
    }, 1000);

    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('timer').textContent = formattedTime;
    }

    function showPopup() {
        const popupContent = "Time's up!"; 
        alert(popupContent);
    }

    const cursorSpotlight = document.getElementById('cursor-spotlight');
    window.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        cursorSpotlight.style.left = `${mouseX}px`;
        cursorSpotlight.style.top = `${mouseY}px`;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var userIdentity = document.getElementById("user-identity");

    userIdentity.addEventListener("mouseover", function() {
        moveRandomPosition(userIdentity);
    });
});

function moveRandomPosition(element) {
    var rangeWidth = -230;
    var rangeHeight = 300;

    var bodyWidth = document.body.clientWidth - element.clientWidth - rangeWidth;
    var bodyHeight = document.body.clientHeight - element.clientHeight - rangeHeight;

    var randomLeft = Math.floor(Math.random() * bodyWidth);
    var randomTop = Math.floor(Math.random() * bodyHeight);

    element.style.left = randomLeft + rangeWidth + "px";
    element.style.top = randomTop + rangeHeight + "px";
}


document.addEventListener("DOMContentLoaded", function () {
    const container1 = document.querySelector(".moire-container1");
    const container2 = document.querySelector(".moire-container2");
    const container3 = document.querySelector(".moire-container3");

    function createPatterns(container) {
        for (let i = 0; i < 10; i++) {
            const pattern = document.createElement("div");
            pattern.classList.add("moire-pattern");
            container.appendChild(pattern);
        }
    }

    createPatterns(container1);
    createPatterns(container2);
    createPatterns(container3);
});


document.addEventListener("DOMContentLoaded", function() {
    const colors = [
        "#F2CC56", "#56A5F2", "#56F2CC", "#F256D6", "#56F2B0",
        "#F28E56", "#9756F2", "#F25E56", "#56F28E", "#F256A5",
        "#56D6F2", "#F2B056", "#F25672", "#56CCF2", "#F29456",
        "#566DF2", "#F2A556", "#56F2D6", "#F2568E", "#56B0F2"
    ];

    let colorChangeInterval;

        function changeBackgroundColor() {
            const randomIndex = Math.floor(Math.random() * colors.length);
            document.body.style.backgroundColor = colors[randomIndex];
        }

        function setWhiteBackground() {
            document.body.style.backgroundColor = "#fff";
            clearInterval(colorChangeInterval);
        }

        colorChangeInterval = setInterval(changeBackgroundColor, 5000);

        setTimeout(setWhiteBackground, 60000);
});




function showBlackHole() {
    document.getElementById('finish').style.display = 'none';
    document.getElementById('black-hole').style.display = 'inline-block';
}

function hideBlackHole() {
    document.getElementById('black-hole').style.display = 'none';
    document.getElementById('finish').style.display = 'block';
}


document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-background");

    function replaceVideoWithOverlay() {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay-background");

        document.body.appendChild(overlay);

        video.remove();
    }

    setTimeout(replaceVideoWithOverlay, 60000);
});



document.getElementById("user-identity").innerText = "Me,Myself,andI";

const reflectionButton = document.getElementById('reflection-button');
const userIdentity = document.getElementById('user-identity');
const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');
const submitModal = document.getElementById('submitModal');
const userInputModal = document.getElementById('userInputModal');

function enableFunctionality() {
    reflectionButton.addEventListener('click', openModal);
}

function openModal() {
    modal.style.display = 'block';
}

function closeModalHandler() {
    modal.style.display = 'none';
}

function submitModalHandler() {
    const userInput = userInputModal.value;

    if (userInput.trim() !== '') {
        userIdentity.innerText = userInput;

        sessionStorage.setItem('userInput', userInput);
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
}, 60000);



document.getElementById('font-image').addEventListener('click', () => {
  const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Segoe UI'];
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  userIdentity.style.fontFamily = randomFont;
});

document.getElementById('size-image').addEventListener('click', () => {
  const randomSize = Math.floor(Math.random() * 100) + 80;
  userIdentity.style.fontSize = `${randomSize}px`;
});

document.getElementById('color-image').addEventListener('click', () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  userIdentity.style.color = randomColor;
});

document.getElementById('blend-mode-image').addEventListener('click', () => {
  const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'];
  const randomBlendMode = blendModes[Math.floor(Math.random() * blendModes.length)];
  userIdentity.style.mixBlendMode = randomBlendMode;
});

document.getElementById('background-image').addEventListener('click', () => {
  const randomBackgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  userIdentity.style.backgroundColor = randomBackgroundColor;
});

document.getElementById('radius-image').addEventListener('click', () => {
    const randomBorderRadius = Math.floor(Math.random() * 100);
    userIdentity.style.borderRadius = `${randomBorderRadius}px`;
  });
  
  document.getElementById('shadow-image').addEventListener('click', () => {
    const randomTextShadow = `${Math.floor(Math.random() * 10)}px ${Math.floor(Math.random() * 10)}px ${Math.floor(Math.random() * 10)}px rgba(0, 0, 0, 0.5)`;
    userIdentity.style.textShadow = randomTextShadow;
  });

const images = [
  document.getElementById('font-image'),
  document.getElementById('size-image'),
  document.getElementById('color-image'),
  document.getElementById('blend-mode-image'),
  document.getElementById('background-image'),
  document.getElementById('radius-image'),
  document.getElementById('shadow-image')
];

setTimeout(() => {
  images.forEach(image => {
    image.style.pointerEvents = 'none';
  });
}, 60000);



function updateSum(reflection) {
    const summarization = document.getElementById('summarization');
    summarization.innerText = reflection;
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        showElements();
    }, 60000);

    function showElements() {
        var endElement = document.getElementById('end');
        var videoElement = document.getElementById('finish-video');
        var imageElement = document.getElementById('half-earth');

        endElement.style.display = 'block';
        videoElement.style.display = 'block';
        imageElement.style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var goBackElement = document.getElementById('go-back');
    var popupElement = document.getElementById('popup');

    goBackElement.addEventListener('click', function() {
        showPopup();
    });

    window.closePopup = function() {
        popupElement.style.display = 'none';
    };

    function showPopup() {
        popupElement.style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.existentialists img');
    images.forEach(image => {
        moveRandomly(image);
    });
});

function moveRandomly(element) {
    setInterval(() => {
        const windowWidth = window.innerWidth;

        const randomX = Math.random() * (windowWidth - element.offsetWidth);
        
        element.style.transition = 'left .8s, right .8s';
        element.style.left = `${randomX}px`;
    }, 2400);
}

