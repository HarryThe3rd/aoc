const fs = require("fs");
const readline = require("readline");

const gameConfig = {
    'red': 12,
    'green': 13,
    'blue': 14
};

// Create regular expressions for each color to extract cube counts
const colorRegexMap = createColorRegexMap(gameConfig);

/**
 * Creates a mapping of regular expressions for each color.
 * @param {Object} config - The game configuration object.
 * @returns {Object} A mapping of regular expressions for each color.
 */
function createColorRegexMap(config) {
    const regexMap = {};
    for (const color in config) {
        regexMap[color] = new RegExp('\\d+(?=.' + color + ')', 'g');
    }
    return regexMap;
}

// Regular expression to extract the game ID
const gameIdRegex = /\d+/;

/**
 * Extracts the count of cubes for each color in a game line.
 * @param {string} game - A single line from the game file.
 * @returns {Object} An object mapping each color to its cube counts.
 */
function extractCubeCountsByColor(game) {
    const counts = {};
    for (const color in gameConfig) {
        let matches = game.match(colorRegexMap[color]);
        counts[color] = matches ? matches.map(value => parseInt(value)) : [0];
    }
    return counts;
}

/**
 * Determines if a game configuration is possible.
 * @param {string} game - A single line from the game file.
 * @returns {boolean} True if the game is possible, false otherwise.
 */
function isGameConfigurationPossible(game) {
    const cubeCounts = extractCubeCountsByColor(game);
    for (const color in gameConfig) {
        if (!cubeCounts[color].every(value => value <= gameConfig[color])) {
            return false;
        }
    }
    return true;
}

/**
 * Extracts the game ID from a game line.
 * @param {string} game - A single line from the game file.
 * @returns {number} The game ID.
 */
function extractGameId(game) {
    const match = game.match(gameIdRegex);
    return match ? parseInt(match[0]) : 0;
}

/**
 * Processes a game file and calculates the result based on game configurations.
 * @param {string} filePath - The path to the game file.
 */
async function processGameFile(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let totalScore = 0;
        for await (const line of rl) {
            totalScore += isGameConfigurationPossible(line) ? extractGameId(line) : 0;
        }
        console.log('Total Score:', totalScore);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

// Example usage
processGameFile("./puzzle-input.txt");
