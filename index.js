let playerOnTurn = 'circle';

const playerCrossElm = `<p class="game__player--actual">Hraje:</p><img class="game__icons" src="podklady/cross.svg" alt="Malý bílý křížek" />`;
const playerCircleElm = `<p class="game__player--actual">Hraje:</p><img class="game__icons" src="podklady/circle.svg" alt="Malé bílé kolečko" />`;

const gameArea = document.querySelectorAll('.area__btn');
for (let i = 0; i < gameArea.length; i += 1) {
  gameArea[i].addEventListener('click', (event) => {
    event.preventDefault();
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

    if (isWinningMove(gameArea[i]) === true) {
      if (playerOnTurn === 'circle') {
        let winnerAlert = () => {
          confirm(
            `Vyhrál jsi, křížku! 🥳  ▻▻▻ Chceš si to dát ještě jednou? 👀`,
          );
          location.reload();
        };
        setTimeout(winnerAlert, 333);
        return;
      }
      if (playerOnTurn === 'cross') {
        const winnerAlert = () => {
          confirm(
            `Vyhrál jsi, kroužku! 🥳  ▻▻▻ Chceš si to dát ještě jednou? 👀`,
          );
          location.reload();
        };
        setTimeout(winnerAlert, 333);
      }
    }
  });
}

// VÝHRA //

const getSymbol = (field) => {
  if (field.classList.contains('area__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('area__field--circle')) {
    return 'circle';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.area__btn');

const getField = (row, column) => {
  return fields[row * boardSize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }
  if (inColumn >= symbolsToWin) {
    return true;
  }

  // BONUS //
  let x;
  let y;

  // DIAGONÁLA 1
  let inDiagonal1 = 1;

  // (A) Koukni do levého horního rohu

  // (i) vlevo + (ii) nahoru
  x = origin.row;
  y = origin.column;

  while (x > 0 && y > 0 && symbol === getSymbol(getField(x - 1, y - 1))) {
    inDiagonal1++;
    x--;
    y--;
  }

  // (B) Koukni do pravého dolního rohu

  // (i) vpravo + (ii) dolů
  while (
    x < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(y + 1, x + 1))
  ) {
    inDiagonal1++;
    x++;
    y++;
  }

  if (inDiagonal1 >= symbolsToWin) {
    return true;
  }

  //--------------------------------------//

  // DIAGONÁLA 2
  let inDiagonal2 = 1;

  // (A) Koukni do pravého horního rohu

  // (i) vpravo + (ii) nahoru
  x = origin.row;
  y = origin.column;

  while (
    y < boardSize - 1 &&
    x > 0 &&
    symbol === getSymbol(getField(x - 1, y + 1))
  ) {
    inDiagonal2++;
    x--;
    y++;
  }

  // (B) Koukni do levého dolního rohu

  // (i) vlevo + (ii) dolů
  x = origin.row;
  y = origin.column;
  while (
    x < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(x + 1, y - 1))
  ) {
    inDiagonal2++;
    x++;
    y--;
  }

  if (inDiagonal2 >= symbolsToWin) {
    return true;
  }

  return false;
};
