let scores, roundscores, activeplayer, gamePlaying;

let winScore = document.getElementById("win-score");
init();

function nextPlayer() {
  document.querySelectorAll(".dice").forEach((el) => (el.style.opacity = 0));
  roundscores = 0;
  document.getElementById(`current-${activeplayer}`).textContent = roundscores;
  activeplayer === 0 ? (activeplayer = 1) : (activeplayer = 0);
  if (activeplayer === 1) {
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".player-0-panel").classList.remove("active");
  } else {
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.remove("active");
  }
}

document.querySelector(".btn-roll").addEventListener("click", function () {
  winScore.disabled = true;
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6 + 1);

    const diceDom = document.querySelector(".dice1");
    diceDom.style.opacity = 1;
    diceDom.src = `dice-${dice}.png`;

    let dice2 = Math.floor(Math.random() * 6 + 1);

    const diceDom2 = document.querySelector(".dice2");
    diceDom2.style.opacity = 1;
    diceDom2.src = `dice-${dice2}.png`;

    let sumDice = dice + dice2;

    if (dice === 6 && dice2 === 6) {
      scores[activeplayer] = 0;
      document.querySelector(`#score-${activeplayer}`).textContent = "0";
      nextPlayer();
    } else if (dice !== 1 && dice2 !== 1) {
      roundscores += sumDice;
      document.getElementById(
        `current-${activeplayer}`
      ).textContent = roundscores;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    scores[activeplayer] += roundscores;
    document.querySelector(`#score-${activeplayer}`).textContent =
      scores[activeplayer];
    const diceDom = document.querySelector(".dice");
    diceDom.style.opacity = 0;

    if (scores[activeplayer] >= winScore.value) {
      document.getElementById(`name-${activeplayer}`).textContent = "Winner!";
      document.querySelector(".dice").style.opacity = "0";
      document
        .querySelector(`.player-${activeplayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activeplayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundscores = 0;
  activeplayer = 0;
  winScore.disabled = false;
  winScore.value = "100";

  gamePlaying = true;

  document.querySelectorAll(".dice").forEach((el) => (el.style.opacity = 0));

  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.getElementById(`name-0`).textContent = "Player 1";
  document.getElementById(`name-1`).textContent = "Player 2";

  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
}
