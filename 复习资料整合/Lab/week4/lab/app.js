const express = require('express');
const app = express();

// set port number as 8080 
app.set('PORT', 8080);

// 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let db =[];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const viewsPath = __dirname + "/views/";

app.use(express.static("public/img"));
app.use(express.static("css"));

app.get("/", (req, res) => {
    const filePath = viewsPath + "homePage.html"
    res.sendFile(filePath);
});

app.get('/newBook', function(req, res) {
    const filePath = viewsPath + "newBook.html"
    res.sendFile(filePath);
});

app.post('/newBook', function(req, res) {
    // task 4 and 5 : invalid data
    if (req.body.title.length <3) {
        res.render("invalidData.html", {errorType: "title with less than 3 characters"});
    } 
    else if (req.body.author.length <3) {
        res.render("invalidData.html", {errorType: "author name with less than 3 characters"});
    }
    else if (req.body.topic.length <3) {
        res.render("invalidData.html", {errorType: "topic with less than 3 characters"});
    }
    else if (req.body.cost <0) {
        res.render("invalidData.html", {errorType: "cost with negative value"});
    }
    else{
        let newBook = {
            title: req.body.title,
            author: req.body.author,
            topic: req.body.topic,
            cost: req.body.cost
            };
        db.push(newBook);
        res.render("allBooks.html", {name: "Guest", bookDb: dlele;eleb});
    }

});

app.get('/allbooks', function(req, res) {
    res.render("allBooks.html", {name: "Guest", bookDb: db});
});

app.get('/title', function(req, res) {
    res.render("title.html", {bookDb: db});
})

// invalid pathname will match
app.get('*', function(req, res){
    const filePath = viewsPath + "404.html";
    res.sendFile(filePath);
  });


app.listen(app.get('PORT'), () => {console.log(`we are listen on port ${app.get('PORT')}`);
});
