const fs = require('fs');

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
        console.error(err);
        return [];
    }
}

/**
 * Determines if a character is a symbol.
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a symbol, false otherwise.
 */
function isSymbolCharacter(char) {
    return isNaN(char) && char !== '.';
}

/**
 * Determines if a character is a number.
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a number, false otherwise.
 */
function isNumericCharacter(char) {
    return !isNaN(char) && char !== '.';
}

/**
 * Processes a number within a schematic, ensuring it is adjacent to a symbol.
 * @param {Array<string>} schematic - The schematic represented as an array of strings.
 * @param {number} row - The row index.
 * @param {number} startCol - The starting column index of the number.
 * @returns {number} The numeric value if valid, 0 otherwise.
 */
function extractValidNumber(schematic, row, startCol) {
    let number = '';
    let col = startCol;

    while (col < schematic[row].length && isNumericCharacter(schematic[row][col])) {
        number += schematic[row][col];
        col++;
    }

    if (isAdjacentToSymbol(schematic, row, startCol) || isAdjacentToSymbol(schematic, row, col - 1)) {
        return parseInt(number);
    }

    return 0;
}

/**
 * Checks if a cell in the schematic is adjacent to a symbol.
 * @param {Array<string>} schematic - The schematic represented as an array of strings.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @returns {boolean} True if adjacent to a symbol, false otherwise.
 */
function isAdjacentToSymbol(schematic, row, col) {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
            if (rowOffset === 0 && colOffset === 0) continue;

            const adjacentRow = row + rowOffset;
            const adjacentCol = col + colOffset;

            if (adjacentRow >= 0 && adjacentRow < schematic.length && adjacentCol >= 0 && adjacentCol < schematic[row].length) {
                if (isSymbolCharacter(schematic[adjacentRow][adjacentCol])) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Calculates the sum of all valid numbers in a schematic.
 * @param {Array<string>} schematic - The schematic to process.
 * @returns {number} The sum of all valid numbers in the schematic.
 */
function calculateSumOfValidNumbers(schematic) {
    let sum = 0;

    for (let row = 0; row < schematic.length; row++) {
        for (let col = 0; col < schematic[row].length; col++) {
            if (isNumericCharacter(schematic[row][col])) {
                sum += extractValidNumber(schematic, row, col);

                while (col < schematic[row].length && isNumericCharacter(schematic[row][col])) {
                    col++;
                }
            }
        }
    }

    return sum;
}

const schematicData = readLinesFromFile('./puzzle-input.txt');
console.log(calculateSumOfValidNumbers(schematicData));
