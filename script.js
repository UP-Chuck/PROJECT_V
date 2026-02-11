// 1. NAVIGATION & FEATURES
function nextState(targetId) {
    // SOLUTION: Grab ALL elements with class 'container' and hide them
    const allSlides = document.querySelectorAll('.container');
    allSlides.forEach(slide => {
        slide.style.display = 'none';
    });

    // Show the target state
    const target = document.getElementById(targetId);
    if (target) {
        target.style.display = 'block';
    } else {
        console.error("Target ID not found: " + targetId);
    }

    // FEATURE: Play Music on first click (Browser policy requires interaction)
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(error => console.log("Auto-play blocked: " + error));
        music.volume = 0.4; 
    }

    // FEATURE: Confetti Explosion if she clicks YES
    if (targetId === 'state-email') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// 2. THE RUNNER BUTTON LOGIC
const noBtn = document.getElementById('btn-no');

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

function moveButton() {
    // Window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe boundaries (subtract padding)
    const maxLeft = windowWidth - btnWidth - 20;
    const maxTop = windowHeight - btnHeight - 20;

    // Generate random position
    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    // Apply new position (Fixed allows it to move anywhere on screen)
    noBtn.style.position = 'fixed'; 
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
    noBtn.style.zIndex = "100"; // Ensure it floats above hearts
}

// 3. EMAIL SENDING FUNCTION
function sendDateDetails() {
    const emailField = document.getElementById('user-email');
    const email = emailField.value;
    
    if(!email || !email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }

    const sendBtn = document.querySelector('#state-email button');
    const originalText = sendBtn.innerText;
    sendBtn.innerText = "Sending...";
    sendBtn.disabled = true;

    const templateParams = {
        to_email: email, 
    };

    // [CHANGE THIS]: Your Service ID and Template ID
    emailjs.send('service_gginf2d', 'template_a0qlw2k', templateParams)
        .then(function() {
            sendBtn.innerText = "Sent!";
            alert('Check your inbox! The details are there. ❤️');
        }, function(error) {
            sendBtn.innerText = originalText;
            sendBtn.disabled = false;
            alert('Failed... Error: ' + JSON.stringify(error));
        });
}