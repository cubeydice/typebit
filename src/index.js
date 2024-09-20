import TypeBit from "./scripts/game";
import { getLeaderboard } from "./scripts/leaderboard";

//DOM Elements
const canvas = document.getElementById('canvas');
const mobileError = document.getElementById('mobile-error');
const gameContainer = document.getElementById("game-container");
const retry = document.getElementById("retry");
const mute = document.getElementById("bg-mute");
const audio = document.getElementById("bg-music");
const invalidKeys = ["Tab","CapsLock", "Alt", "AltGraph", "Fn", "Super",
"Symbol", "NumLock", "Meta", "Hyper", "Shift", "ArrowRight", "ArrowLeft",
"ArrowUp", "ArrowDown", "Delete", "Insert", "PageUp", "PageDown"]
let gameStarted = false;

//Event to mute Audio
const muteAudio = (e) => {
  e.preventDefault();

  if (!audio.muted) {
    audio.muted = true;
    mute.src = "./assets/icons/mute.png";
  } else {
    audio.muted = false;
    mute.src = "./assets/icons/speaker.png";
  }
}

/*Check if user is using mobile device*/
window.mobileCheck = function() {
  let hasTouchScreen = false;

  //Recommended way to check for mobile device per MDN docs
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.("(pointer:coarse)");
    if (mQ?.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
  return hasTouchScreen;
};

/*Only show game if not on mobile device*/
if (window.mobileCheck()) {
  gameContainer.remove();
  mobileError.textContent = "sorry, typebit is not compatible with mobile devices 🥺 \r\n\r\n if you get this error on desktop, try disconnecting touch devices and restart"

  //Add social media icons to mobile view
  const gitHubIcon = new Image();
  const linkedInIcon = new Image();
  gitHubIcon.src = '../assets/nav/github.png';
  linkedInIcon.src = '../assets/nav/linkedIn.png';
  gitHubIcon.onclick = function() {
    window.location.href = 'https://github.com/cubeydice/typebit';
  };
  linkedInIcon.onclick = function() {
    window.location.href = 'hhttps://www.linkedin.com/in/queen-belle-d-118b7859/';
  };
  const iconDiv = document.createElement('div');
  mobileError.appendChild(iconDiv).appendChild(linkedInIcon);
  mobileError.appendChild(iconDiv).appendChild(gitHubIcon);
} else {
  // Play Game
  const game = new TypeBit(canvas);
  game.run();

  window.addEventListener('keydown', function (e) {
    //logic for key press input
    if (gameStarted) {
      if (invalidKeys.includes(e.key)) {
      } else if (e.key === "Backspace") {
        game.typed = game.typed.slice(0,-1);
      } else if (e.key === "Escape") {
        game.typed = "";
      } else if (e.key === "Enter") {
        game.typed += "~";
      } else if (e.key === "Control") {
        game.restart();
      } else {
        game.typed += e.key;
      }
    } else {
      game.play();
      gameStarted = true;
    }
  }, false);

  //Restart Game
  const restart = (e) => {
    e.preventDefault();
    gameStarted = false;
    game.restart();
  }
  retry.addEventListener("click", restart)

  // Music
  mute.addEventListener("click", muteAudio)

  //Leaderboard
  getLeaderboard();
}

