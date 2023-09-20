import TypeBit from "./scripts/game";

const canvas = document.getElementById('canvas');
const mobileError = document.getElementById('mobile-error');
const retry = document.getElementById("retry");
const mute = document.getElementById("bg-mute");
const audio = document.getElementById("bg-music");
const invalidKeys = ["Tab","CapsLock", "Alt", "AltGraph", "Fn", "Super", "Symbol", "NumLock", "Meta", "Hyper", "Shift"]
audio.volume = 0.2;
let gameStarted = false;

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
  mobileError.innerText = "sorry, typebit is not compatible with mobile devices 🥺"
} else {
  // Play Game
  const game = new TypeBit(canvas);
  game.run();

  window.addEventListener('keydown', function (e) {
    //logic for key press input
    if (e.key === "Backspace") {
      game.typed = game.typed.slice(0,-1)
    } else if (invalidKeys.includes(e.key)) {
    } else if (e.key === "Enter") {
      game.typed += " "
    } else if (e.key === "Control") {
      game.typed = ""
    }
    else {
      game.typed += e.key;
    }

    //play game  with key press
    if (game.typed !== "" && !game.running) {
      game.play();
      gameStarted = true;
    }
  }, false);

  //Restart Game
  const restart = (e) => {
    e.preventDefault();
    game.restart();
  }
  retry.addEventListener("click", restart)

  // Music
  const muteAudio = (e) => {
    e.preventDefault();

    if (!audio.muted) {
      audio.muted = true;
      mute.src = "assets/icons/mute.png";
    } else {
      audio.muted = false;
      mute.src = "assets/icons/speaker.png";
    }
  }

  mute.addEventListener("click", muteAudio)

}

