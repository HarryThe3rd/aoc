const fs = require("fs");
const readline = require("readline");

function extractDigits(line) {
    const digits = line.match(/\d/dg);
    if (digits === null) {
        return 0;
    }

    if (digits.length === 1) {
        return parseInt(digits[0] + digits[0]); // If only one digit is found, return it
    }
    return parseInt(digits[0] + digits[digits.length - 1]); // Return the first and last digit
}

async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let result = 0
    for await (const line of rl) {
        const digits = extractDigits(line)
        result += digits;
        console.log(`Line: "${line}" - Digits:`, digits,"Sum:", result);
    }
}

processFile("./puzzle-input.txt");
