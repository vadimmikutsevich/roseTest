const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function processJSON(inputJSON) {
  const { data, condition } = JSON.parse(inputJSON);
  let result = data.slice(); // Копирование исходных данных

  // Применение правила include, если оно есть
  if (condition.include) {
    condition.include.forEach((rule) => {
      const key = Object.keys(rule)[0];
      const value = rule[key];
      result = result.filter((item) => item[key] === value);
    });
  }

  // Применение правила exclude, если оно есть
  if (condition.exclude) {
    condition.exclude.forEach((rule) => {
      const key = Object.keys(rule)[0];
      const value = rule[key];
      result = result.filter((item) => item[key] !== value);
    });
  }

  // Применение правила sort_by, если оно есть
  if (condition.sort_by) {
    condition.sort_by.forEach((key) => {
      result.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    });
  }

  return JSON.stringify({ result });
}

function mainMenu() {
  rl.question('1. Process JSON\n2. Exit\nChoose an option: ', (option) => {
    switch (option) {
      case '1':
        processMenu();
        break;
      case '2':
        rl.close();
        break;
      default:
        console.log('Invalid option. Try again.');
        mainMenu();
    }
  });
}

function processMenu() {
  rl.question('Enter JSON for processing: ', (inputJSON) => {
    const result = processJSON(inputJSON);
    console.log('Result:', result);
    mainMenu();
  });
}

mainMenu();