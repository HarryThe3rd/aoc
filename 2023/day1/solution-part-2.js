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

function extractDigits(line) {
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
    let m;
    let foundDigits = [];

    while ((m = regex.exec(line)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if(match){
                foundDigits.push(match)
            }
        });
    }

    const digits = foundDigits.map((value) => digitWords[value] || value)
    console.log(digits)

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
