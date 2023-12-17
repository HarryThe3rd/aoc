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
        console.log(err)
        return [];
    }
}



const data = readLinesFromFile('./puzzle-input-test.txt');
console.log(data);
