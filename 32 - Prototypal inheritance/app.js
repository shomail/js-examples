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

const loopObj = {
  firstName: 'shomail',
  lstName: 'tahir'
};

const loopProtoObj = {
  hair: 'black'
};

Object.setPrototypeOf(loopObj, loopProtoObj);
let n = 0;

//for in loop iterates over enumerable props of obj
//it also steps thorugh proto chain obj by obj
//foo loop only goes through distinct props, so if loopObj has hair prop it will not go over it in prototype
for (let property in loopObj) {
  if (loopObj.hasOwnProperty(property)) {
    n++;
  }
}

console.log(n);

//object assign to create copy obj

const parent = {
  hair: 'black',
  heightInInches() {
    return this.height * 12;
  }
};

const child = Object.create(parent);

child.height = 5.1;
console.log(child.heightInInches());

//here if you edit parent obj which is set as prototype then it will effect child obj
//to help this situation we can use Object.assign

const copyChild = Object.assign({ height: 6 }, parent);

parent.heightInInches = () => true;

console.log(copyChild.heightInInches());
