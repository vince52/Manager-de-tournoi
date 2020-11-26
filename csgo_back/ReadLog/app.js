var app = require('express')();
var fs = require('fs');
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.get('/matchs/:id', function(req, res){
    res.send("<h1>Hello world + " + req.params.id + " AAA </h1>");

    //check in database if match exist and is an active match
    fs.writeFile(req.params.id + '.txt', 'machin', function (err) {
	if (err) throw err;
	console.log('It\'s saved!');
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
