const fs = require('fs');

/**
 * Determines the number of winning variations for each time and distance pair.
 * @param {Array<Array<number>>} timeDistancePairs - An array of time and distance pairs.
 * @returns {Array<number>} An array representing the number of winning variations for each pair.
 */
function numberOfWinsPerGame(timeDistance) {
    const times = timeDistance[0]
    const distance = timeDistance[1]
    let winningVariations = []
    for (let index in times) {
        winningVariations.push(findRecordBreakingDistances(times[index], distance[index]).length)
    }
    return winningVariations;
}

/**
 * Finds variations where a record is beaten.
 * @param {int} totalTime - The total time available.
 * @param {int} recordDistance - The record distance to beat.
 * @returns {Array<int>} An array of distances where the record is beaten.
 */
function findRecordBreakingDistances(totalTime, recordDistance) {
    let recordBeatenDistances = [];
    for (let pressedTime = 0; pressedTime <= totalTime; pressedTime++) {
        const distanceTraveled = traveldDistance(pressedTime, totalTime);
        if (distanceTraveled > recordDistance) {
            recordBeatenDistances.push(distanceTraveled);
        }
    }
    return recordBeatenDistances;
}


/**
 * Calculates the distance traveled within a given time.
 * @param {int} buttonTime - The time how long the button is pressed.
 * @param {int} totalTime - The total time available.
 * @returns {int} The distance traveled.
 */
function traveldDistance(buttonTime, totalTime) {
    if (buttonTime === 0 || buttonTime >= totalTime) {
        return 0;
    }
    return buttonTime * (totalTime - buttonTime);
}

function convertLinesToNumberArrays(lines) {
    const regex = new RegExp('\\d+', 'g')
    return lines.map(value => value.match(regex).map(value => parseInt(value)))
}

/**
 * Reads the contents of a file and returns an array of its lines.
 * @param {string} filePath - The path of the file to read.
 * @returns {Array<string>} An array of lines from the file.
 */
function readLinesFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n');
    } catch (err) {
        console.log(err)
        return [];
    }
}

const filesLinesAsArray1 = readLinesFromFile('./puzzle-input-1.txt');
const linesAsArray1 = convertLinesToNumberArrays(filesLinesAsArray1);
const result1 = numberOfWinsPerGame(linesAsArray1).reduce((acc, curr) => curr > 0 ? acc * curr : acc, 1)
console.log('Part 1: ', result1)

const filesLinesAsArray2 = readLinesFromFile('./puzzle-input-2.txt');
const linesAsArray2 = convertLinesToNumberArrays(filesLinesAsArray2);
const result2 = numberOfWinsPerGame(linesAsArray2).reduce((acc, curr) => curr > 0 ? acc * curr : acc, 1)
console.log('Part 2: ',result2)

