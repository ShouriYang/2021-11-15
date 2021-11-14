// Import packages
const  mongodb = require('mongodb');
const express = require('express');
const morgan = require("morgan");
const ejs = require("ejs");

// configure express
const app = express();
app.set("PORT", 8080);
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(morgan("common"));

// serve css files in a directory name css
app.use(express.static("public/image"));
app.use(express.static("public/css"));

// configure MongoDB
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";    // URL to MongoDB server
let db; 
// connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true}, function(err, client){
    if ( err) {
        console.log("unable to connect");
    } else{
        console.log("connect successfully");
        db = client.db("fit2095"); // db name
    }
});

// Routes handlers
// insert new user
// GET request: send page to the client
const viewPath = __dirname + "/views";
app.get("/", function(req, res){
    res.sendFile(viewPath + "/index.html");
});

// insert new book to database
app.post("/addnewbook", function(req, res){
    let details = req.body;
    db.collection("fit2095").insertOne({
        title: details.title,
        author: details.author,
        topic: details.topic,
        date: new Date(details.date),
        summary: details.summary
    });
    // redirect the client to get all books after inserting
    res.redirect("/getallbooks");
});
app.get('/getallbooks', function(req, res){
    db.collection("fit2095").find({}).toArray(function(err, data){
        res.render("getallbooks.html", {db: data});
    });
});


// delete books by topic 
app.get('/deletebytopic', function(req, res){
    res.sendFile(viewPath + "/deletebooks.html");
});
app.post('/deletebytopic', function(req, res){
    let topic = req.body.topic;
    let filter = {topic: topic};  
    db.collection('fit2095').deleteMany(filter);
    res.redirect('/getallbooks');
});

app.get('/update', function(req, res) {
    res.sendFile(viewPath + "/updatebooks.html");
})
app.post('/update', function(req, res){
    let bookdetails = req.body;
    let filter = {title: bookdetails.title};  
    let theUpdate = {
        $set: {
            title: bookdetails.title,
            author: bookdetails.author,
            topic: bookdetails.topic,
            date: new Date(bookdetails.date),
            summary: bookdetails.summary
        }
      }
    db.collection('fit2095').update(filter, theUpdate,{upsert: true });
    res.redirect('/getallbooks');
});

app.get('/extratask', function(req, res ) {
    let query = {date: {$gte: new Date("2020-08-27"), $lte: new Date("2021-08-27")}};
    db.collection("fit2095").find(query).toArray(function(err, data){
        console.log(data);
        res.render("extraTask.html", {db: data});
    })
});

app.listen(app.get("PORT"), () => {
   console.log("listening on the port："+ app.get("PORT"));
});