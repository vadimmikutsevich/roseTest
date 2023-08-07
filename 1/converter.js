const readline = require('readline');

let conversionRates = {
  m: { m: 1, cm: 100, in: 39.3701, ft: 3.28084 },
  cm: { m: 0.01, cm: 1, in: 0.393701, ft: 0.0328084 },
  in: { m: 0.0254, cm: 2.54, in: 1, ft: 0.0833333 },
  ft: { m: 0.3048, cm: 30.48, in: 12, ft: 1 },
};

function loadConversionRates(jsonString) {
  const newRates = JSON.parse(jsonString);
  conversionRates = { ...conversionRates, ...newRates };
}

function convertDistance(inputJSON) {
  const { distance, convert_to } = JSON.parse(inputJSON);
  const { unit, value } = distance;

  if (!conversionRates[unit] || !conversionRates[unit][convert_to]) {
    return JSON.stringify({ error: "Unsupported units" });
  }

  const resultValue = value * conversionRates[unit][convert_to];
  const roundedValue = Math.round(resultValue * 100) / 100;

  return JSON.stringify({ unit: convert_to, value: roundedValue });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mainMenu() {
  rl.question('1. Convert distance\n2. Load conversion rates from JSON\n3. Exit\nChoose an option: ', (option) => {
    switch (option) {
      case '1':
        convertMenu();
        break;
      case '2':
        loadRatesMenu();
        break;
      case '3':
        rl.close();
        break;
      default:
        console.log('Invalid option. Try again.');
        mainMenu();
    }
  });
}

function convertMenu() {
  rl.question('Enter JSON for conversion (e.g., {"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}): ', (inputJSON) => {
    const result = convertDistance(inputJSON);
    console.log('Result:', result);
    mainMenu();
  });
}

function loadRatesMenu() {
  rl.question('Enter JSON for additional conversion rates: ', (jsonString) => {
    loadConversionRates(jsonString);
    console.log('Conversion rates loaded successfully.');
    mainMenu();
  });
}

mainMenu();