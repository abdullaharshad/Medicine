var fs = require('fs');
var express = require('express');
var router = express.Router();
const knex=require('../db/knexfile.js');

var xlsx = require('node-xlsx');


// parses a buffer
router.get('/index.html', function (req, res) {
    //res.sendFile( __dirname + "/../views/" + "index.html" );
    res.render('index');
});

router.post('/file_upload', function (req, res) {
    var obj = xlsx.parse(fs.readFileSync(req.file.path));
    var insertArray = [];
    for (var i = 0; i < obj[0].data.length; i++) {
        var name = obj[0].data[i][0];
        insertArray.push({
            name: name
        });
    }
    if(req.body.table_name == 'chemicals') {
        knex('chemicals')
            .insert(insertArray).asCallback(function (err, result) {
                if (err) {
                    return res.render('index', {error:'could not upload'});
                } else {
                    return res.render('index', {success:'success'});
                }
            });
    } else if(req.body.table_name == 'drugs') {
        knex('drugs')
            .insert(insertArray).asCallback(function (err, result) {
                if (err) {
                    return res.render('index', {error:'could not upload'});
                } else {
                    return res.render('index', {success:'success'});
                }
            });
    } else if(req.body.table_name == 'herbals') {
        knex('herbals')
            .insert(insertArray).asCallback(function (err, result) {
                if (err) {
                    return res.render('index', {error:'could not upload'});
                } else {
                    return res.render('index', {success:'success'});
                }
            });
    }
});


 router.get('/', function (req, res) {
    res.render('main',{list:[],name:'',table_name:'drugs'});
 });


router.post('/search', function (req, res) {
  console.log(req.body);

    knex(req.body.table_name)
        .where('name','LIKE','%'+req.body.name+'%').asCallback(function (err, result) {
            if (err) {
                return res.render('main', {error:'something went wrong',table_name:req.body.table_name,name:req.body.name});
            } else {
                return res.render('main', {list:result,table_name:req.body.table_name,name:req.body.name});
            }
        });

})








//where('name','LIKE','%'+req.body.name+'%')
module.exports = router;
