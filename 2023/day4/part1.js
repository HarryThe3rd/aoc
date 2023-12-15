const fs = require("fs");
const readline = require("readline");

function intersect(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
  }

function splitGameLine(line) {
    const [_, completeNumbersString] = line.split(": ");
    const [winningNumbersString, playNumbersString] = completeNumbersString.split(" | ");

    const winningNumbers = winningNumbersString.split(" ").map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
    const playNumbers = playNumbersString.split(" ").map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));

    const intersection = intersect(winningNumbers, playNumbers)


    if (intersection.length === 0) {
        return 0
    }

    return intersection.reduce((previous, _) => previous * 2, 1) / 2

}

async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
let result = 0
    for await (const line of rl) {
        result += splitGameLine(line);
    }
    console.log(result);    
}

processFile("./puzzle-input.txt");