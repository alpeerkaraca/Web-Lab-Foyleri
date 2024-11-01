let math = require('mathjs');
let file = require('fs');

let txt = file.readFileSync('quiz6.txt', 'utf8');

txt = txt.split('\n');

txt.forEach(line => {
    line = line.split(',');
    let x = line[0];
    let a = line[1];
    let b = line[2];
    let c = Number(line[3].replace('\r', ''));
    let res = a * math.pow(x, 2) + b * x + c;
    console.log(res);
});

