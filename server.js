const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const multer = require('multer');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));

// const data = fs.readFileSync('./database.json');
// const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'management'
});

connection.connect();

const upload = multer({dest:'./upload'});

app.get('/api/customers', (req, res)=>{
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload')); //사용자가 /image경로로 접근하면 /upload폴더로 접근됨.

app.post('/api/customers', upload.single('image'), (req, res) => {
    var sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    var image = '/image/' + req.file.filename+'.png';
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var job = req.body.job;
    console.log(image);
    var params = [image, name, birthday, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
        console.log(rows);
    }
    );
});

app.delete('/api/customers/:id', (req, res) => {
    var sql = 'UPDATE CUSTOMER SET isDeleted = 1 where id = ?';
    var params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));