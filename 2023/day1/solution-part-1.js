const fs = require("fs");
const readline = require("readline");

/**
 * Extracts digits from a line and computes a value based on the first and last digit.
 * @param {string} line - A single line from the file.
 * @returns {number} The computed value based on the digits in the line.
 */
function extractAndComputeDigits(line) {
    const digits = line.match(/\d/g); // Corrected regex to match digits

    if (!digits || digits.length === 0) {
        return 0; // Return 0 if no digits found
    }

    if (digits.length === 1) {
        // If only one digit is found, duplicate it for the calculation
        return parseInt(digits[0] + digits[0], 10);
    }

    // Return the concatenated first and last digit
    return parseInt(digits[0] + digits[digits.length - 1], 10);
}

/**
 * Processes a file and calculates a cumulative result based on digits in each line.
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
            const computedValue = extractAndComputeDigits(line);
            cumulativeResult += computedValue;
            console.log(`Line: "${line}" - Computed Value:`, computedValue, "Cumulative Sum:", cumulativeResult);
        }
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

processDigitsInFile("./puzzle-input.txt");
