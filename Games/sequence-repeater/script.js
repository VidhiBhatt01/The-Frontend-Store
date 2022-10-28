const defaultStartReactor = {
  computerCombination: [],
  playerCombination: [],
  computerCombinationPosition: 1,
  combinationMaxPosition: 5,
  memoryMaxCombination: 9,
};

const START_REACTOR = Object.assign({}, defaultStartReactor);

let INTERFACE = {
  memoryPanel: document.querySelector(".panelMemory"),
  computerLedPanel: document.querySelector(".computerLedPanel"),
  playerLedPanel: document.querySelector(".playerLedPanel"),
  playerMemory: document.querySelector(".playerMemory"),
  playerMemoryButtons: document.getElementsByClassName("player-memory"),

  turnLedOn(index, ledPanel) {
    ledPanel.children[index].classList.add("ledOn");
  },

  turnAllLedsOff() {
    const computerLedPanel = INTERFACE.computerLedPanel;
    const playerLedPanel = INTERFACE.playerLedPanel;

    for (var i = 0; i < computerLedPanel.children.length; i++) {
      computerLedPanel.children[i].classList.remove("ledOn");
      playerLedPanel.children[i].classList.remove("ledOn");
    }
  },
};

let AUDIO = {
  start: "start.mp3",
  fail: "fail.mp3",
  complete: "complete.mp3",
  combinations: [
    "0.mp3",
    "1.mp3",
    "2.mp3",
    "3.mp3",
    "4.mp3",
    "5.mp3",
    "6.mp3",
    "7.mp3",
    "0.mp3",
  ],
};

function loadAudio(filename) {
  const file = `./assets/audio/${filename}?cb=${new Date().getTime()}`;
  const audio = new Audio(file);

  audio.load();
  return audio;
}

function loadAudios() {
  AUDIO.start = loadAudio(AUDIO.start);
  AUDIO.complete = loadAudio(AUDIO.complete);
  AUDIO.fail = loadAudio(AUDIO.fail);
  AUDIO.combinations = AUDIO.combinations.map((audio) => loadAudio(audio));
}

function createCombination() {
  let newComb = [];

  for (let i = 0; i < START_REACTOR.combinationMaxPosition; i++) {
    const pos = Math.floor(
      Math.random() * START_REACTOR.memoryMaxCombination + 1
    );

    newComb.push(pos);
  }

  return newComb;
}

function playItem(item, combinationPosition, origin = "computer") {
  const leds =
    origin == "computer"
      ? INTERFACE.computerLedPanel
      : INTERFACE.playerLedPanel;
  const memPanel = INTERFACE.memoryPanel.children[item];

  memPanel.classList.add("memoryActive");
  INTERFACE.turnLedOn(combinationPosition, leds);
  AUDIO.combinations[item].play().then(() => {
    setTimeout(() => {
      memPanel.classList.remove("memoryActive");
    }, 150);
  });
}

function switchPanel(activate = true) {
  console.log("switchPanel");
  const playerMemory = INTERFACE.playerMemory;

  if (activate) {
    console.log("aadd");
    playerMemory.classList.add("playerActive");
  } else {
    console.log("remove");
    playerMemory.classList.remove("playerActive");
  }

  for (let i = 0; i < playerMemory.children.length; i++) {
    const element = playerMemory.children[i];

    if ((element.tagName = "DIV")) {
      if (activate) {
        element.classList.add("playerMemoryActive");
      } else if (!activate) {
        element.classList.remove("playerMemoryActive");
      }
    }
  }
}

function playCombination() {
  START_REACTOR.playerCombination = [];
  INTERFACE.turnAllLedsOff();
  switchPanel(false);

  for (let i = 0; i <= START_REACTOR.computerCombinationPosition - 1; i++) {
    setTimeout(() => {
      playItem(START_REACTOR.computerCombination[i], i);
    }, 400 * (i + 1));
  }

  setTimeout(() => {
    INTERFACE.turnAllLedsOff();
    switchPanel(true);
  }, 600 * START_REACTOR.computerCombinationPosition);
}

function endGame(type = "fail") {
  const memPanel = INTERFACE.memoryPanel;
  const ledPanel = INTERFACE.computerLedPanel;
  const audio = type == "complete" ? AUDIO.complete : AUDIO.fail;
  const typeClasses =
    type == "complete"
      ? ["playerMemoryComplete", "playerLedComplete"]
      : ["playerMemoryError", "playerLedError"];

  audio.play().then(() => {
    for (let i = 0; i < memPanel.children.length; i++) {
      if (memPanel.children[i].tagName == "DIV") {
        memPanel.children[i].classList.add(typeClasses[0]);
      }
    }

    for (let i = 0; i < ledPanel.children.length; i++) {
      if (ledPanel.children[i].tagName == "DIV") {
        ledPanel.children[i].classList.add(typeClasses[0]);
      }
    }

    setTimeout(() => {
      for (let i = 0; i < memPanel.children.length; i++) {
        if (memPanel.children[i].tagName == "DIV") {
          memPanel.children[i].classList.remove(typeClasses[0]);
        }
      }

      for (let i = 0; i < ledPanel.children.length; i++) {
        if (ledPanel.children[i].tagName == "DIV") {
          ledPanel.children[i].classList.remove(typeClasses[0]);
        }
      }
    }, 900);
  });
}

function isTheRightCombination(position) {
  let computerCombination = START_REACTOR.computerCombination.slice(
    0,
    position
  );

  return (
    computerCombination.toString() == START_REACTOR.playerCombination.toString()
  );
}

function play(idx) {
  playItem(idx, START_REACTOR.playerCombination.length, "player");
  START_REACTOR.playerCombination.push(idx);

  if (isTheRightCombination(START_REACTOR.playerCombination.length)) {
    if (
      START_REACTOR.playerCombination.length ==
      START_REACTOR.combinationMaxPosition
    ) {
      endGame("complete");
      setTimeout(() => {
        start();
      }, 1200);
      return;
    }

    if (
      START_REACTOR.playerCombination.length ==
      START_REACTOR.computerCombinationPosition
    ) {
      START_REACTOR.computerCombinationPosition++;
      setTimeout(() => {
        playCombination();
      }, 1200);
    }
  } else {
    endGame("fail");
    document.getElementById("title").textContent = "ERROR!";
    setTimeout(() => {
      document.getElementById("title").textContent = "START REACTOR";
      start();
    }, 1200);

    return;
  }
}

function startInterface() {
  return AUDIO.start.play();
}

function load() {
  return new Promise((res, rej) => {
    loadAudios();
    const { playerMemory, playerMemoryButtons: memory } = INTERFACE;

    Array.prototype.forEach.call(memory, (element) => {
      element.addEventListener("click", () => {
        if (playerMemory.classList.contains("playerActive")) {
          play(parseInt(element.dataset.memory));

          element.style.animation = "playermemoryClick .4s";

          setTimeout(() => {
            element.style.animation = "";
          }, 400);
        }
      });
    });
  });
}

function start() {
  START_REACTOR.computerCombination = createCombination();
  START_REACTOR.computerCombinationPosition = 1;
  START_REACTOR.playerCombination = [];
  startInterface().then(() => {
    setTimeout(() => playCombination(), 500);
  });
}

const loadButton = document.getElementById("loadButton");
const startButton = document.getElementById("startButton");

loadButton.addEventListener("click", () => {
  load();
  loadButton.style.display = "none";
  startButton.style.display = "";
});
startButton.addEventListener("click", () => {
  start();
  startButton.style.display = "none";
});
