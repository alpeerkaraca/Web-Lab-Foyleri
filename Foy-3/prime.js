let file = require('fs');
let math = require('mathjs');

let outputFile = file.createWriteStream('asal.txt');

for(i = 1; i <= 100; i++){
    if(math.isPrime(i)){
        outputFile.write(i + '\n');
    }
}


/* Eğer Math Kütüphanesini Kullanmamam Gerekiyorsa */

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}
