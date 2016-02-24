var express = require('express');
var bodyParser =require('body-parser');
var _= require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todonextId =1;


app.use(bodyParser.json());


app.get('/', function(req,res){
	res.send('ToDo API Root');
});

// GET  /Todos
app.get('/todos', function (req,res) {
	res.json(todos);
	// body...
})


app.get('/todos/:id', function (req,res){
	
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos,{id:todoId} );
	
	/*var matchedTodo;
	for (var i = 0; i <= todos.length - 1; i++) {
		 	console.log("checking for id availablity")
		 	 
		 	 if(todos[i].id === todoId){
		 	 	matchedTodo =todos[i] ;
		 	 			 	 }
		 };
*/
		 if (matchedTodo) {
		 	res.send(matchedTodo);
		 } else{
		 	res.status(404).send();
		 }; 

});

// POST /todos
app.post('/todos',function (req,res) {
	var body = req.body;
	body = _.pick(body,'description','completed');
	
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0 ) {
		//console.log("isBoolean :" + _.isBoolean(body.completed)  + "isString : "+!_.isString(body.description) + "desc body len: " +  body.description.trim().length) ;
		return res.status(400).send();
	} 

	body.description = body.description.trim();
	console.log("no bad request, ");
	body.id =todonextId++;
	todos.push(body)
	console.log('description' + body.description);
	res.json(body);
	// body...
});


app.listen(PORT, function(){
	console.log('Express listning on port '+PORT);
}); 


