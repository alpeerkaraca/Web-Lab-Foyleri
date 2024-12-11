// Tam olarak iki elemanı sadece bir kez görünen ve diğer tüm elemanları tam olarak iki kez görünen bir
// tamsayı dizisi nums verilsin. Yalnızca bir kez görünen elemanları bulun.
// Doğrusal çalışma zamanı karmaşıklığı ve sabit ekstra alan karmaşıklığı ile bu işlemi gerçekleştirin.


let url = require('url');
let http = require('http');

http.createServer(function (req, res) {
    let path = url.parse(req.url, true).path;
    path = path.replace('/', '');
    if (path.length === 0 || path === '') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1> Dizi girmediniz! </h1>');
        res.end();
        return;
    }
    path = path.split(',');
    path = path.map(Number);

    if (path.includes(NaN) || path.length === 0 || path === '') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1> Hatali Dizi Girdisi </h1>');
        res.end();
        return;
    }

    let arr = removeDuplicates(path);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1> Verilen Dizi: [' + path + '] </h1>');
    res.write('<h1> Tekrarsiz Dizi: [' + arr + '] </h1>');
    res.end();
}).listen(5555,
    () => console.log('Sunucu http://localhost:5555/ adresini dinliyor...')
);

function removeDuplicates(nums) {
    if (nums.length === 0) return [];

    let seen = new Set();
    let duplicates = new Set();

    for (let num of nums) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }

    return nums.filter(num => !duplicates.has(num));
}