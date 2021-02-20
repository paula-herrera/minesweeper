function createBoard(r, c, bombs) {
  if (bombs > r * c) {
    bombs = (r * c) / 3;
  };

  // Create Empty Grid
  let grid = [];
  for (let row = 0; row < r; row++) {
    let subArr = [];
    for (let col = 0; col < c; col++) {
      subArr.push(0);
    }
    grid.push(subArr);
  }

  // Place Bombs
  let bombCount = 0;
  while (bombCount < bombs) {
    let x = Math.floor(Math.random() * r);
    let y = Math.floor(Math.random() * c);

    if (grid[x][y] === 0) {
      grid[x][y] = 'x';
      bombCount++;
    }
  }

  // Neighbor Bomb Count
  return grid;
};

console.table(createBoard(10, 10, 10))