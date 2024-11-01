const sql = require('mysql2'); /*MySQL modulü yerine mysql2 kullanma sebebim güvenlik sebebiyle bağlantıma izin vermemesi örnek hata:
   sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
   Çözüm: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server */
const env = require('dotenv').config();

let connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

const TABLE_NAME = process.env.TABLE_NAME;
const DB_NAME = process.env.DB_NAME;

// HOST, USER, PASSWORD, PORT, TABLE_NAME, DB_NAME gibi bilgileri güvenlik amaçlı .env dosyası içerisinden alıyorum.

const USERS = [
    { FirstName: 'Ken', LastName: 'Sanchez', DepartmentName: 'Executive' },
    { FirstName: 'Terri', LastName: 'Duffy', DepartmentName: 'Engineering' },
    { FirstName: 'Roberto', LastName: 'Tamburello', DepartmentName: 'Engineering' },
    { FirstName: 'Rob', LastName: 'Walters', DepartmentName: 'Engineering' },
    { FirstName: 'Gail', LastName: 'Erickson', DepartmentName: 'Engineering' },
    { FirstName: 'Jossef', LastName: 'Goldberg', DepartmentName: 'Engineering' },
    { FirstName: 'Dylan', LastName: 'Miller', DepartmentName: 'Support' },
    { FirstName: 'Diane', LastName: 'Margheim', DepartmentName: 'Support' },
    { FirstName: 'Gigi', LastName: 'Matthew', DepartmentName: 'Support' },
    { FirstName: 'Michael', LastName: 'Raheem', DepartmentName: 'Support' }
];


connection.query('CREATE DATABASE IF NOT EXISTS ' + DB_NAME, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Veritabanı oluşturuldu');
    }
});

connection.query('USE ' + DB_NAME, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(process.env.DB_NAME + ' Veritabanı seçildi');
    }
});

connection.query('CREATE TABLE IF NOT EXISTS ' + TABLE_NAME +
    ' (EmployeeID INT AUTO_INCREMENT PRIMARY KEY, FirstName  VARCHAR(255), ' +
    'LastName VARCHAR(255) UNIQUE, DepartmentName VARCHAR(255))', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(TABLE_NAME + ' Tablosu oluşturuldu');
        }
    });

USERS.forEach((user) => {
    connection.query('INSERT IGNORE INTO  ' + TABLE_NAME + '(FirstName, LastName, DepartmentName) VALUES ' + `( '${user.FirstName}', '${user.LastName}', '${user.DepartmentName}')`, (err) => {
        //Burada IGNORE kullanmamın sebebi UNIQUE Constraintini kullandığım için replika verilerde hata veriyordu bu sebeple hata oluşturan verileri atlamayı sağladım.
        //https://stackoverflow.com/questions/1361340/how-can-i-do-insert-if-not-exists-in-mysql
        if (err) {
            console.log(err);
        } else {
            console.log('Kullanıcı eklendi');
        }
    });

})


connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE DepartmentName = "Engineering"', (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Mühendislik bölümündeki çalışanlar sıralanıyor...");
        console.log(result);
    }
});

connection.query('UPDATE ' + TABLE_NAME + ' SET DepartmentName = "Executive" WHERE FirstName = "Terri"', (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Terri\'nin departmanı Executive olarak güncellendi');
    }
});


connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE FirstName = "Terri"', (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Terri'nin bilgileri yazdırılıyor...");
        console.log(result);
    }
});


connection.close = () => {
    connection.end((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Bağlantı kapatıldı');
        }
    });
}
