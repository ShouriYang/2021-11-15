let http = require("http");
let fs = require("fs");
let url = require("url")

http.createServer(function (req, res) {
    console.log("URL=" + req.url);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    var baseURL = "http://" + req.headers.host + "/";
    var url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);
    let msg = params.get("year") + " " + params.get("month");
    res.end(msg);
  }).listen(8080);


// http.createServer(function(req, res){
//     let filePath = req.url.split('/')[1];
//     let fileName = 'index.html'
//     console.log(filePath)

//     switch (filePath){
//         case '':
//             fileName = 'index.html';
//             break;
//         case 'assessments':
//             fileName = 'Assessments.html';
//             break;
//         case 'topics':
//             fileName = 'Assessments.html';
//             break;
//         case 'whichweek':
           
//             let params = url.parse(req.url,true).query;
//             day = params.d;
//             month = params.m;
//             year = params.y;
//             // if ((day<26 && month <=7 && year ==2021)||// get erro if the date is before the first dat of semester which is at 2021.07.26
//             //     (day>31 && month ==10 && year==2021) ||  // get error if the date is after week 14 whose end point is at 2021.10.31
//             //     (month >10 && year==2021) ||
//             //     (year<2021) || //  get error if the year is before 2021
//             //     (year>2021) || //  get error if the year is after 2021
//             //     (day>31) ||  // get error if the format of day and month is wrong
//             //     (month>12) || 
//             //     (day<0) || 
//             //     (month>12)) {
//             //     fileName = '404.html';
//             // }
//             // else{
//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end("We are in week "+ getDaysDiff(day, month, year));
//             // }
//             break;
//         case 'help':
//             fileName = 'helpPage.html';
//             break;
//         default:
//             fileName = '404.html';
//             break;
//     }
//     if(filePath !== 'whichweek'){

//     fs.readFile(fileName, function (error, content) {
//         if (error) {
//               res.writeHead(404, { // file not found
//                 "Content-Type": "text/html",
//               });
//         }
//         else {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         }
//         res.end(content, 'utf-8')
//     });
// }
// }).listen(5050);

function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("7/26/2021"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}