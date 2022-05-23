// var express = require ('express');
// var path = require('path');
// var logger = require ('morgan');
// var bodyParser = require ('body-parser');
// var neo4j = require ('neo4j-driver');


// var app = express();

// // //view engine
// // app.set ('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// app.use (express.static(path.join(__dirname, "public")));



// var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('Hazneo4j', 'hazneo4j'));
// var session = driver.session();


// app.get('/', function(req,res){
//     session
//     .run('MATCH(n:News) RETURN n')
//     .then(function(result){
//         var newsArr = [];
//         result.records.forEach(function(record){
//             newsArr.push({
//             title: record._fields[0].properties.title,
//             keyword:record._fields[0].properties.keyword,
//             });
            
//         });
//         // res.render('index', {
//         //     companies : companyArr
//         // });
//     })
//     .catch(function(err){
//         console.log(err);
//     })
  
// });






// exports.app = app
