const fs = require("fs");
const readline = require("readline");

const gameConfig = {
    'red': 12,
    'green': 13,
    'blue': 14
};

// Create regular expressions for each color to extract counts
const colorRegexMap = createColorRegexMap(gameConfig);

/**
 * Creates a mapping of regular expressions for each color based on the game configuration.
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

/**
 * Calculates the product of the maximum counts for each color in a game line.
 * @param {string} gameLine - A single line from the game file.
 * @returns {number} The product of the maximum counts for each color.
 */
function calculateMaxColorCountsProduct(gameLine) {
    let product = 1;
    for (const color in gameConfig) {
        const colorCounts = gameLine.match(colorRegexMap[color])?.map(Number) || [1];
        const maxCount = Math.max(...colorCounts);
        product *= maxCount;
    }
    return product;
}

/**
 * Processes a game file and calculates the total result by multiplying the max color counts.
 * @param {string} filePath - The path to the game file.
 */
async function processGameFile(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let totalResult = 0;
        for await (const line of rl) {
            totalResult += calculateMaxColorCountsProduct(line);
        }
        console.log('Total Result:', totalResult);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

processGameFile("./puzzle-input.txt");
