const express = require("express");
const app = express();

// your code goes here
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req, res, next) {
    req.unitCode = "FIT2095";
    req.weekNumber = 4;
    next();
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//your code here 
const viewsPath = __dirname + "/views/";
app.get("/", function (req, res) {
    res.sendFile(viewsPath + "/index.html");
});
 

// your code here
app.post('/findmax', function(req, res){
    let maxValue = Math.max(req.body.value1, req.body.value2);
    res.render('responce.html', {maxValue: maxValue});
});


app.listen(8080);