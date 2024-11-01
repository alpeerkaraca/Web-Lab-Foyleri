let file = require('fs');

let inputFile = file.readFileSync('asal_sayilar.txt', 'utf8');
let outputFile = file.createWriteStream('tum_sayilar.txt', 'utf8');

inputFile = inputFile.split('\n');

for (let i = 0; i <= 90; i++) {
    if (!inputFile.includes(i.toString())) {
        outputFile.write(i + '\n');
    }
} 