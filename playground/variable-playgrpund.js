var person = {
	name:  'andrew',
	age: 21
};

function updatePerson (obj) {
/*	obj ={
		name: 'Rahul',
		age:21
	};*/
	obj.age = 25;

}

updatePerson(person);
console.log(person);



var arr = [12,34,56];

function updateArr (obj) {

	obj.push(23);
	debugger;
}

updateArr(arr);

console.log(arr);