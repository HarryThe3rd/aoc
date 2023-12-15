const fs = require("fs");
const readline = require("readline");

/**
 * Computes the intersection of two arrays.
 * @param {Array} a - The first array.
 * @param {Array} b - The second array.
 * @returns {Array} The intersection of a and b.
 */
function computeIntersection(a, b) {
    const setA = new Set(a);
    const setB = new Set(b);
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
}

/**
 * Parses a line from the game file and calculates the score.
 * @param {string} line - A line from the game file.
 * @returns {number} The calculated score for the line.
 */
function calculateLineScore(line) {
    const [_, numbersString] = line.split(": ");
    const [winningNumbersString, playNumbersString] = numbersString.split(" | ");

    const winningNumbers = winningNumbersString.split(" ").map(n => parseInt(n, 10)).filter(n => !isNaN(n));
    const playNumbers = playNumbersString.split(" ").map(n => parseInt(n, 10)).filter(n => !isNaN(n));

    const intersection = computeIntersection(winningNumbers, playNumbers);

    return intersection.length === 0 ? 0 : intersection.reduce((total, _) => total * 2, 1) / 2;
}

/**
 * Processes the game file and computes the total score.
 * @param {string} filePath - The path to the game file.
 */
async function processGameFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let totalScore = 0;
    for await (const line of rl) {
        totalScore += calculateLineScore(line);
    }

    console.log(`Total Score: ${totalScore}`);
}

// Process the input file
processGameFile("./puzzle-input.txt");
