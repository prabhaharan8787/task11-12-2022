const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const multer = require('multer');
const mycon = require('mysql');
var app = express();
var upload = multer();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(upload.array());
app.use(express.static('public'));

var con = mycon.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Prabhaharan@8787",
    database: "upstock"
})

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("db connected");
    }
});
app.post('/SignUpHome', (request, response) => {
    let role = request.body.user_type;
    let name = request.body.name;
    let email = request.body.email;
 
    let password = request.body.password;
   

    let sql = 'insert into taskin(name,password,email,role) values(?,?,?,?)';

    con.query(sql, [name,password,email,role], (err, res) => {
        if (err) {
            response.send(err);
        }
        else {
            response.send(res);
        }
    })

});
app.post('/SignIn', (request, response) => {
    let username = request.body.username_inp;
    let password = request.body.password;

    var sql = 'select * from taskin where name=?';

    con.query(sql, [username], (err, res) => {
        if (err) {
            let s = { "status": "username_error" };
            response.send(s);

        }

        else if (res.length > 0) {
            let username1 = res[0].username;
            let password1 = res[0].password;
            let role = res[0].role;

            if (username1 === username1 && password1 === password) {
                let s = { "status": "login_success","role": role };
                response.send(s);
            }
            else {
                let s = { "status": "invalid_login" };
                response.send(s);
            }
        }


        else {
            let s = { "status": "invalid_login" }
        }
    })

})







app.listen(3002);