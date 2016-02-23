var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'meet mom for lunch',
	completed: false 
},
{
	id: 2,
	description: 'Go to market',
	completed: false 
},
{
	id: 3,
	description: 'Office work',
	completed: false 
}];


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
	var matchedTodo;
	for (var i = 0; i <= todos.length - 1; i++) {
		 	console.log("checking for id availablity")
		 	 
		 	 if(todos[i].id === todoId){
		 	 	matchedTodo =todos[i] ;
		 	 			 	 }
		 };

		 if (matchedTodo) {
		 	res.send(matchedTodo);
		 } else{
		 	res.status(404).send();
		 };
		 	 	
		 

});

// GET /todos/:id
app.get('')
app.listen(PORT, function(){
	console.log('Express listning on port '+PORT);
}); 


