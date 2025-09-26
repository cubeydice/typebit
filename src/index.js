import TypeBit from "./scripts/game";

// Constants
const INVALID_KEYS = ["Tab", "CapsLock", "Alt", "AltGraph", "Fn", "Super",
  "Symbol", "NumLock", "Meta", "Hyper", "Shift", "ArrowRight", "ArrowLeft",
  "ArrowUp", "ArrowDown", "Delete", "Insert", "PageUp", "PageDown"];

// DOM Elements
const canvas = document.getElementById('canvas');
const mobileError = document.getElementById('mobile-error');
const gameContainer = document.getElementById("game-container");
const retry = document.getElementById("retry");
const mute = document.getElementById("bg-mute");
const audio = document.getElementById("bg-music");

let gameStarted = false;

// Audio mute toggle
const muteAudio = (e) => {
  e.preventDefault();
  audio.muted = !audio.muted;
  mute.src = audio.muted ? "./assets/icons/mute.png" : "./assets/icons/speaker.png";
};

// Modern mobile detection
const isMobileDevice = () => {
  return navigator.maxTouchPoints > 0 || 
         navigator.msMaxTouchPoints > 0 ||
         window.matchMedia?.('(pointer:coarse)').matches ||
         /\b(BlackBerry|webOS|iPhone|IEMobile|Android|Windows Phone|iPad|iPod)\b/i.test(navigator.userAgent);
};

// Handle mobile users
if (isMobileDevice()) {
  gameContainer.remove();
  mobileError.textContent = "sorry, typebit is not compatible with mobile devices 🥺 \r\n\r\n if you get this error on desktop, try disconnecting touch devices and restart";

  // Add social icons
  const iconDiv = document.createElement('div');
  const gitHubIcon = new Image();
  const linkedInIcon = new Image();
  
  gitHubIcon.src = '../assets/nav/github.png';
  linkedInIcon.src = '../assets/nav/linkedIn.png';
  
  gitHubIcon.onclick = () => window.open('https://github.com/cubeydice/typebit', '_blank');
  linkedInIcon.onclick = () => window.open('https://www.linkedin.com/in/queen-belle-d-118b7859/', '_blank');
  
  iconDiv.appendChild(linkedInIcon);
  iconDiv.appendChild(gitHubIcon);
  mobileError.appendChild(iconDiv);
} else {
  // Initialize game
  const game = new TypeBit(canvas);
  game.run();

  // Keyboard input
  window.addEventListener('keydown', (e) => {
    if (gameStarted) {
      if (INVALID_KEYS.includes(e.key)) return;
      
      switch (e.key) {
        case "Backspace": game.typed = game.typed.slice(0, -1); break;
        case "Escape": game.typed = ""; break;
        case "Enter": game.typed += "~"; break;
        case "Control": game.restart(); break;
        default: game.typed += e.key;
      }
    } else {
      game.play();
      gameStarted = true;
    }
  });

  // Restart button
  retry.addEventListener("click", (e) => {
    e.preventDefault();
    gameStarted = false;
    game.restart();
  });

  // Mute button
  mute.addEventListener("click", muteAudio);
}