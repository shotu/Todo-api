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
	
	var queryParams = req.query;
	var filteredTodos =todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed ==="true"){

		filteredTodos = _.where(filteredTodos, {completed: true});

	}else if (queryParams.hasOwnProperty('completed') && queryParams.completed ==="false") {
		filteredTodos = _.where(filteredTodos, {completed: false});
	} 

	res.json(filteredTodos);
	
})


app.get('/todos/:id', function (req,res){
	
	var todoId = parseInt(req.params.id,10);
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


//DELETE /todos/:id
app.delete('/todos/:id', function (req,res) {

	var deleteTodoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos,{id:deleteTodoId} );
	
	if (!matchedTodo) {
		return res.status(404).send();
	} 

	todos = _.without(todos, matchedTodo);
	console.log("todos updated");
	
	res.json(matchedTodo);
	
});

// PUT /todos/:id

app.put('/todos/:id', function (req, res) {

	console.log(" comes to update code");

	var todoId = parseInt(req.params.id, 10);

	var matchedTodo = _.findWhere(todos,{id:todoId} );

	if (!matchedTodo) {
		console.log("No Macthed todo");
		return res.status(404).send();
	} 

	console.log(" Macthed todo");
	var body = req.body;
	body = _.pick(body,'description','completed');
	var validAttributes ={};

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {

		console.log(" updating completed property ");
		validAttributes.completed = body.completed;
	
	} else if (body.hasOwnProperty('completed')) {
		
			return res.status(400).send();
	} 
    console.log(" coming to description part ");
    
	if ( body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		
		console.log(" updating completed property ");
		
		validAttributes.description =body.description;

	
	} else if(body.hasOwnProperty('description')) {
			return res.status(400).send();

	}

	console.log("updating the validAttributes");
	
	_.extend(matchedTodo,validAttributes);

	res.json(matchedTodo);
});




app.listen(PORT, function(){
	console.log('Express listning on port '+PORT);
}); 


