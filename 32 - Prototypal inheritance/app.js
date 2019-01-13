console.log('Javascript prototypal inheritance examples');

//in js every obj is connected to the base object through prototype chain, that's how we can access base methods like .toString()
//in case of object literal it is linked to global Object prototype through prototype chain
const nameObj = {
  firstName: 'shomail'
};

const protoObj = {
  lastName: 'tahir'
};

console.log(nameObj);
console.log(nameObj.firstName);
console.log(nameObj.toString());

//we set prototype of obj with built in method on global Object
Object.setPrototypeOf(nameObj, protoObj);

console.log(nameObj);
//now we have achived inheritance, as lastName will be read from up the chain
console.log(nameObj.lastName);

//prototype delegation with new keyword
//here the newly created object myCar prototype refers to the prototype of constructor function
//prototype objects are created when functions are declared
//by default they have only one accessible property called constructor
//we can add new propperties to this prototype obj and it is available to the instance with new keyword
//constructor prop on prototype obj holds the value of function
function Car(make) {
  this.make = make;
}

console.log(Car.prototype);
console.log(Car.prototype.constructor);

Car.prototype.wheels = 4;

console.log(Car.prototype);

const myCar = new Car('BMW');

console.log(myCar);

//if we set the prototype obj to empty obj
//then constructor prop refers to global object type
//Car.prototype = {}
//console.log(Car.prototype.constructor) // Object

//this keyword inside prototype

function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

function Bar(name) {
  //   Foo(name);
  Foo.call(this, name);
}

Bar.prototype = Object.create(Foo.prototype);
const a = new Bar('shomail');

//here Bar function do not have myName function in its prototype chain and we have to link them

// console.log(a.myName());

console.log(a.myName());
//now we have name printed on screen
