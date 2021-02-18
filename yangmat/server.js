var express = require('express');

var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// From https://github.com/ericf/express-handlebars#helpers
var handlebars = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        isPost: function (val) { return val === "POST" },
        isEmpty: function (arr) { return arr.length === 0 }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4859);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/show-data',function(req,res){
    let context = {
        method: 'GET',
        getParams: []
    };
    for (let p in req.query) {
        context.getParams.push({"name": p, "value": req.query[p]});
    }
    res.render('show-data', context);
});

app.post('/show-data', function(req,res){
    let context = {
        method: 'POST',
        getParams: [],
        postParams: []
    };
    for (let p in req.query) {
        context.getParams.push({"name": p, "value": req.query[p]});
    }
    for (let p in req.body) {
        context.postParams.push({"name": p, "value": req.body[p]});
    }
    res.render('show-data', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});