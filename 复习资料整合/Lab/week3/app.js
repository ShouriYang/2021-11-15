const express = require("express");
let app = express();  // instance of Express class

// task2
app.get('/week3/marks/:prerq/:wsq/:lab', function(req, res) {

    res.send(`Week 3 Mark is ${req.params.prerq*0.1+req.params.wsq*0.1+req.params.lab*0.2}`);
}
);

// task1
app.get('/week3*', function(req, res){

    res.send("Welcome to Week 3");

});

app.listen(8080);
