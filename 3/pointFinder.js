const readline = require('readline');

// Генерация случайной точки в диапазоне от 0 до 100 для каждой оси

const randomPoint = {
  x: Math.floor(Math.random() * 101),
  y: Math.floor(Math.random() * 101),
  z: Math.floor(Math.random() * 101),
};

// Функция для вычисления расстояния между двумя точками

function f(s) {
  return Math.sqrt(
    (s.x - randomPoint.x) ** 2 +
    (s.y - randomPoint.y) ** 2 +
    (s.z - randomPoint.z) ** 2
  );
}

// Функция для поиска случайной точки

function findPoint() {
  let searchPoints = [];
  let calls = 0;

    // Функция для поиска координаты по одной оси с использованием метода бисекции

  function bisect(axis) {
    let start = 0;
    let end = 100;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      let point = { x: 0, y: 0, z: 0 };
      point[axis] = mid;
      let distance = f(point);
      searchPoints.push({ ...point });
      calls++;

      if (distance === 0) return mid;
      if (mid === randomPoint[axis]) return mid;

      if (mid < randomPoint[axis]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  // Поиск координат по каждой оси

  const x = bisect("x");
  const y = bisect("y");
  const z = bisect("z");

  return {
    result: {
      random_point: randomPoint,
      search_points: searchPoints,
      calls: calls,
    },
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  rl.question('Press enter to find the random point...', (input) => {
    const result = findPoint();
    console.log('Result:', JSON.stringify(result, null, 2));
    rl.close();
  });
}

mainMenu();