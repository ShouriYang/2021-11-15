let express = require('Express');
let app = express();
let router = require('./app.js');
//both router.js and server.js should be in same directory
app.use('/', router);
app.listen(8080);