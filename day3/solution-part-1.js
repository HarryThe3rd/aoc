const fs = require('fs');

function readSchematicFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n');
    } catch (err) {
        console.error(err);
        return [];
    }
}

function isSymbol(char) {
    return isNaN(char) && char !== '.';
}

function isNumber(char) {
    return !isNaN(char) && char !== '.';
}

/** 
 * Processes a potential number starting at startCol in the schematic at the given row.
 * Build the number by concatenating adjacent numeric characters
 * Checks if the number is adjacent to a symbol.
**/
function processNumber(schematic, row, startCol) {
    let number = '';
    let col = startCol;

    // Concatenate all adjacent numeric characters to form the number
    while (col < schematic[row].length && isNumber(schematic[row][col])) {
        number += schematic[row][col];
        col++;
    }

    // Check if the number is adjacent to a symbol (either at start or end)
    if (isAdjacentToSymbol(schematic, row, startCol) || isAdjacentToSymbol(schematic, row, col - 1)) {
        return parseInt(number);
    }

    return 0;
}

/**
 * Check if cell at the specified row and col in the schematic is adjacent to a symbol. 
 * Looks at all neighboring cells, including diagonals.
**/
function isAdjacentToSymbol(schematic, row, col) {
    const rows = schematic.length;
    const cols = schematic[0].length;

    // Check each neighboring cell around the given cell
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
            // Skip the current cell
            if (rowOffset === 0 && colOffset === 0) continue;

            const adjacentRow = row + rowOffset;
            const adjacentCol = col + colOffset;

            // Check if the neighboring cell is within range
            if (adjacentRow >= 0 && adjacentRow < rows && adjacentCol >= 0 && adjacentCol < cols) {
                // Return true if the neighboring cell is a symbol
                if (isSymbol(schematic[adjacentRow][adjacentCol])) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Calculate the sum of all valid numbers in the schematic.
 * Iterates through each cell
 * Processes potential numbers
 * Adds them to the sum if they are adjacent to a symbol.
**/
function sumPartNumbers(schematic) {
    let sum = 0;

    // Iterate through each row and column of the schematic
    for (let row = 0; row < schematic.length; row++) {
        let col = 0;
        while (col < schematic[row].length) {
            // If the current cell is a number, process it
            if (isNumber(schematic[row][col])) {
                sum += processNumber(schematic, row, col);

                // Skip past the rest of the number
                while (col < schematic[row].length && isNumber(schematic[row][col])) {
                    col++;
                }
            } else {
                // Move to the next cell if it's not a number
                col++;
            }
        }
    }

    return sum;
}

const schematic = readSchematicFromFile('./puzzle-input.txt');
console.log(sumPartNumbers(schematic));
