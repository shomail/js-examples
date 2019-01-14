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

//prototype delegation with classes
//its just constructor function under the hood
//classes still uses prototype chain
class Vehicle {
  isLegal() {
    return true;
  }
}

class CarClass extends Vehicle {
  canBeUsed() {
    return this.isLegal();
  }
}

console.log(typeof Vehicle);
console.log(Vehicle.prototype, typeof Vehicle.prototype);

const carFromClass = new CarClass();
console.log(carFromClass.canBeUsed());
console.log(Object.getPrototypeOf(carFromClass));
//here we get true from Vehicle because this keyword refers to newly created object by new keyword and it's prototype linked to Vehicle with extends keyword.
//unlike classical languages properties and methods are not directly copied, instead they live on prototype object and get refrenced from there.

//STATIC METHODS on classes
class Food {
  static isHealthy() {
    return true;
  }

  static canBeEaten() {
    return Food.isHealthy();
    //we can also use this, which will refer to Food class
  }
}

//here if we try to access isHealthy method on class we get error because its on prototype object and we need to first make instance of the class
//ERROR Food.isHealthy()
//but with static keyword we can access it directly on the class
//static props can also be called from within the class
console.log(Food.isHealthy());
console.log(Food.canBeEaten());

//determing the constructor of an object with instanceof
//instanceof operator tests wheater the prototype of constructor appears anywhere in the objects proto chain
function Bear(type) {
  this.type = type;
}

function Leapord(type) {
  this.type = type;
}

const snowBear = new Leapord('snow leapord');

Object.setPrototypeOf(Leapord.prototype, Bear.prototype);

console.log(snowBear instanceof Bear);

//factory functions for object composition

const createPlayer = player => ({
  ...player,
  team: 'abc warriors'
});

const player1 = createPlayer({
  hair: 'brown',
  height: '6 feet'
});

const player2 = createPlayer({
  hair: 'blonde',
  height: '5.10 feet'
});

console.log(player1.team);
