let playerOnTurn = 'circle';
const playerCrossElm = `<p class="game__player--actual">Hraje:</p><img class="game__icons" src="podklady/cross.svg" alt="Malý bílý křížek" />`;
const playerCircleElm = `<p class="game__player--actual">Hraje:</p><img class="game__icons" src="podklady/circle.svg" alt="Malé bílé kolečko" />`;

const ticTac = (event) => {
  if (playerOnTurn === 'circle') {
    event.target.classList.add('area__field--circle');
    document.querySelector('.game__player').innerHTML = playerCrossElm;
    playerOnTurn = 'cross';
    event.target.disabled = true;
  } else if (playerOnTurn === 'cross') {
    event.target.classList.add('area__field--cross');
    document.querySelector('.game__player').innerHTML = playerCircleElm;
    playerOnTurn = 'circle';
    event.target.disabled = true;
  }
};

const gameArea = document.querySelectorAll('.area__btn');
for (let i = 0; i < gameArea.length; i += 1) {
  gameArea[i].addEventListener('click', ticTac);
}
