"use strict";

//setting up general game variables
const playerHand = document.querySelector("#player1");
const compHand = document.querySelector("#player2");
const gameLayout = document.querySelectorAll("#texts div");
const gameBtns = document.querySelectorAll("#buttons button");
const gameBtnsContainer = document.querySelector("#buttons");

//game variables that can change
let playerPick;
let compPick;
let Result;

//starting game
function startGame() {
  console.log("startGame");

  getPlayerPick();
}

//PlayerPick on click
function getPlayerPick() {
  console.log("getPlayerPick");

  gameBtns.forEach((gameBtn) => {
    gameBtn.addEventListener("click", savePick);
  });
}

//Remember players pick and call comp function
function savePick() {
  console.log("savePick");

  gameBtns.forEach((gameBtn) => {
    gameBtn.removeEventListener("click", savePick);
  });

  playerPick = this.dataset.playerPick;
  console.log(`${this.playerPick}`);

  getCompPick();
}

//Generate random comp pick and start animation
function getCompPick() {
  console.log("getCompPick");

  const compPicks = document.querySelectorAll("button[data-player-choice]");
  compPick = compPicks[Math.floor(Math.random() * Math.floor(3))].dataset.playerPick;
  console.log(`${compPick}`);

  playAnimations();
}

//Start animations and call find the winner
function playAnimations() {
  console.log("playAnimations");

  gameBtnsContainer.classList.add("disabled");

  playerHand.classList.add("shake");
  compHand.classList.add("shake");

  compHand.addEventListener("animationEnd", () => {
    playerHand.classList.remove("shake");
    compHand.classList.remove("shake");
    playerHand.classList.add("playerPick");
    compHand.classList.add("compPick");

    findWinner();
  });
}

//find winner and call show winner
function findWinner() {
  console.log("findWinner");

  if (playerPick === compPick) {
    result = "draw";
  } else if ((playerPick === "rock" && compPick === "scissors") || (playerPick === "scissors" && compPick === "paper") || (playerPick === "paper" && compPick === "rock")) {
    result = "win";
  } else {
    result = "lose";
  }

  showWinner();
}

function showWinner() {
  console.log("showWinner");

  document.querySelector(`#${result}`).classList.remove("hidden");

  setTimeout(resetGame, 1500);
}

function resetGame() {
  console.log("resetGame");

  gameFallout.forEach((gameFallout) => {
    gameFallout.classList.add("hidden");
  });

  playerHand.className = "player";
  computerHand.className = "player";

  gameBtnsContainer.classList.remove("disabled");

  startGame();
}
