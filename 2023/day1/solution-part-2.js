const fs = require("fs");
const readline = require("readline");

const digitWords = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};

/**
 * Extracts and processes digits from a line, converting word digits to numbers.
 * @param {string} line - A single line from the file.
 * @returns {number} The computed value based on the extracted digits.
 */
function extractAndProcessDigits(line) {
    const regex = new RegExp(Object.keys(digitWords).join('|') + '|\\d', 'g');
    const matches = line.match(regex) || [];

    const digits = matches.map(match => digitWords[match] || match);

    if (digits.length === 0) {
        return 0;
    }
    if (digits.length === 1) {
        return parseInt(digits[0] + digits[0], 10); // Duplicate if only one digit
    }
    return parseInt(digits[0] + digits[digits.length - 1], 10); // Use first and last digit
}

/**
 * Processes a file line by line and calculates a cumulative result based on digits.
 * @param {string} filePath - The path to the file to be processed.
 */
async function processDigitsInFile(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        let cumulativeResult = 0;
        for await (const line of rl) {
            const computedValue = extractAndProcessDigits(line);
            cumulativeResult += computedValue;
            console.log(`Line: "${line}" - Computed Value:`, computedValue, "Cumulative Sum:", cumulativeResult);
        }
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

processDigitsInFile("./puzzle-input.txt");
