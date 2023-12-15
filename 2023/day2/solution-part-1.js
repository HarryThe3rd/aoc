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

const gameIdRegex = /\d+/;

function extractCubeCountByColor(game) {
    const result = {};
    for (const color in gameConfig) {
        let numberMatches = game.match(colorRegexMap[color]);
        result[color] = numberMatches ? numberMatches.map(value => parseInt(value)) : [0];
    }
    return result;
}

function isGamePossible(game) {
    const cubeCountByColor = extractCubeCountByColor(game);
    for (const color in gameConfig) {
        if (!cubeCountByColor[color].every(value => value <= gameConfig[color])) {
            return false;
        }
    }
    return true;
}

function getGameId(game) {
    const match = game.match(gameIdRegex);
    return match ? parseInt(match[0]) : 0;
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
            result += isGamePossible(line) ? getGameId(line) : 0;
        }
        console.log('Result:', result);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

processFile("./puzzle-input.txt");
