const fs = require("fs");
const readline = require("readline");

const gameConfig = {
    'red': 12,
    'green': 13,
    'blue': 14
};

const colorRegexMap = {};
for (const color in gameConfig) {
    colorRegexMap[color] = new RegExp('\\d+(?=.' + color + ')', 'g');
}

function calculateProductOfMaxColorCounts(game) {
    let product = 1;
    for (const color in gameConfig) {
        const numberMatches = game.match(colorRegexMap[color]);
        const maxCount = numberMatches ? Math.max(...numberMatches.map(Number)) : 1;
        product *= maxCount;
    }
    return product;
}

async function processFile(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let result = 0;
        for await (const line of rl) {
            result += calculateProductOfMaxColorCounts(line);
        }
        console.log('Result:', result);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

processFile("./puzzle-input.txt");
