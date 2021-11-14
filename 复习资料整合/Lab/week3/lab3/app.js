const express = require("express");

let router = express.Router();
// database is implemented as an array of items(books)
let db = []

router.get('/', function(req,res){
    res.send("Hello from lab3 of FIT2095")
});

// Task(A): add a new book through URL
router.get('/addbook', function(req, res) {
    let newBook = {
    id:Math.round(Math.random()*1000),
    title:req.query.title,
    author:req.query.author,
    topic:req.query.topic,
    cost:req.query.cost
    };
    db.push(newBook);
    res.send(generateList());
});

// Task(B): list all books
router.get('/getallbooks', function(req,res){
    res.send(generateList());
});


// Task(C): delete a book by id
router.get('/deleteid/:id', function(req, res){
    let index = db.map(e => e.id).indexOf(Number.parseInt(req.params.id)); 
    console.log(index);
    
    if(index !== -1){
        db.splice(index, 1) //splice(i,j) removes j elements in the array starting at the index i
    }else{
        res.send("Wrong book id!")
    }
    res.send(`the book ${index+1} has been deleted`);
});

// Task(D): get bookstore total value
router.get('/getbookstorevalue', function(req, res){
    let totalValue = db.map(e=>e.cost).reduce((a,b)=> Number(a)+Number(b));
    res.send(`The total value of books is ${totalValue}`); 
});

// Extra Task in lab: display total number of books for a specific topic
router.get('/booksinacategory/:topic', function(req,res){
    let numbers = db.filter(e => e.topic === req.params.topic).length;
    res.send(`Total numbers of books in database for the <b>category<b> ${req.params.topic} is: ${numbers}`);

});

//export this router 
module.exports = router;

function generateList(){
    let text = "id  |  author  |  topic |   cost    </br>"
    for(let i =0; i<db.length;i++){
        text += db[i].id + "  |  " + db[i].author + "  |  " + db[i].topic + "  |  " + db[i].cost + "</br>";
    }
    
    if (db.length ===0){
        text = "Oops, the bookstore is still empty!"
    }
    return text;
}
