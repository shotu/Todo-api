var Sequelize = require('sequelize');

// creating instance of sequelize
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo', {
	description:{
		type: Sequelize.STRING,
		allowNull: false,
		validate:{
			len: [1, 250]
		}
	},
	completed:{
		type:Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue:false
	}
});

/*sequelize.sync({force: true}).then(function  () {
	console.log('everything is synced');

	Todo.create({
		description: "some is here ",
		completed: false
	}).then(function (todo){
		return Todo.create({
			description: "trash is here"
		});
		console.log('Finished!');
		console.log(todo);

	}).then(function(todos){
		if (todos) {
			todos.forEach(function (todo){
				console.log(todo.toJSON);
			});
		} else{
			console.log('no todos wer found')
		};
	}).catch(function(e){
		console.log(e);
	});
});
*/

sequelize.sync(

	).then(function(){
		console.log('everything is synced');
		Todo.findById(1).then(function (todo){
			if (todo) {
				console.log(todo.toJSON());
			} else{
				console.log("todo not found ");
			};
		})
	});