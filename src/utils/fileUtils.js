const fs = require('fs/promises');

async function readFile(filePath) {

    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }

}

async function writeFile(filePath, data) {

    try {
        await fs.writeFile(filePath, JSON.stringify(data), 'utf-8');
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
    
}

module.exports = { readFile, writeFile };







