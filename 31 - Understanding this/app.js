//in global execution context this refers to window obj in browser, even in strict mode.
//in node repl env this refers to global obj, however in module or file it refer to module.exports obj
console.log('Is this equal to window obj in global env? ');
console.log(this === window);

//This in function calls..
//value of this is determined by how the function is called
//in plain func call this refers to window or global in node
//in strict mode this refers to undefined

function globalFunc() {
  console.log('Is this equal to window obj inside global func?');
  console.log(this === window);
}

globalFunc();

//another example of top level func this refers to window obj
//here we do not get what we want, values of this refers to window obj
//we are setting props to global instead of uselessPerson obj and it's undefined
//** here if we are in strict mode then value of this will be undefined, and we are unable to set these props
//that's why uppercase function name is a hint to us that it is a constructor func.
//constructor func should be invoked with new keyword.

function GlobalPerson(first, last) {
  this.firstName = first;
  this.lastName = last;
}

const uselessPerson = GlobalPerson('shomail', 'tahir');
console.log('values of uselessPerson:');
console.log(uselessPerson);
console.log('Oops!! window obj modified:');
console.log(window.firstName, window.lastName);

//constructor function with new keyword
//new keyword creates a brand new obj for us
//then this keyword is bound to that new obj
//and finally constructor func return this new obj
//and links the returned obj to constructor functions prototype

function PersonConstructor(first, last) {
  this.firstName = first;
  this.lastName = last;

  //   return { firstName: "Junk!!", lastName: "Yard!!"};
  //this return will overwrite the auto created obj by new keyword
  //if we return anything other than obj js will ignore it and use newly created obj
}

const personObj = new PersonConstructor('shomail', 'tahir');

console.log('Person obj created with constructor func and new keyword:');
console.log(personObj);

//this inside the obj method
//when this keyword is used inside an object method this refers to the object
const animal = {
  type: 'dog',
  speak() {
    console.log(`hello hello!! I am a ${this.type}`);
  }
};

//here animal is the receiver of the method call and therefore this refers to receiver
animal.speak();

//this receiver mechanism is not affected by where the function is defined
//we can define method seperatly and attach it later to the obj

function feedAnimal(food) {
  console.log(`animal ${this.type} ate ${food}, and looks satisfied`);
}

animal.feedAnimal = feedAnimal;

animal.feedAnimal('burger');

//in a call chain receiver the immediate left obj in this case animal;
//foo.bar.animal.speak();

//case of loosing the receiver obj and undefined this
//if we store the obj method as a plain function this binding is lost
const dogBark = animal.speak;

console.log(`I love when dogs bark, let's hear it! ${dogBark()}, wait!! what 😕`);
console.log('-------------'); //we could also use apply method

//calling functions on obj without attaching to the obj, by using call() prototype method available on functions //first argument of call method is obj we need to call this function on, and it's called 'this arg'
function sleep() {
  console.log(`This cute little ${this.type} should sleep now! zzZZZZZzzzZZZ 😴😴😴`);
}
sleep.call(animal); //sleep.apply(animal); same result //difference between call and apply //along with obj to refer to arg, we can pass additional args to call and apply //call accepts list of args while apply we can provide array of args
const numbers = [1, 2, 3, 4, 5];
//the first version is the sytactic sugar which do the same thing as the second one
const slice1 = numbers.slice(1, 3);
const slice2 = numbers.slice.call(numbers, 1, 3);
const slice3 = numbers.slice.apply(numbers, [1, 3]);
console.log(`All roads leads to Rome!! same results.`);
console.log(slice1, slice2, slice3); //there is a gotcha with call and apply //if used outside of strict mode it and provided with null or undefined it refers to global obj //when we provide a function as callback to another function it looses it's this binding to the reciver
animal.wakeup = function() {
  console.log(`cute little ${this.type} is awake and fresh!!`);
}; //here we have lost this and it's undefined, one way is to use arrow function and call method iside of it. //settimeout call the callback with this set to window
//another way is use bind method to hard bind reciver obj
setTimeout(animal.wakeup, 1000);
setTimeout(animal.wakeup.bind(animal), 2000);
//now if we extract this hard binded function into variable it's still refer to the bound obj
const lovelyBark = animal.speak.bind(animal);
lovelyBark(); //once a function is hard bound, its this context cannot be changed even not with call and apply //our own version of bind function
Function.prototype.bind = function(thisArg, ...fixedArgs) {
  const func = this;
  return function(...args) {
    return func.apply(thisArg, [...fixedArgs, ...args]);
  };
}; //arrow func //does not create this context //instead it uses this from it's enclosing context
const outerThis = this;
const arrowFunc = () => {
  console.log(this === outerThis);
};
arrowFunc(); //this binding in arrow func cannot be set with call and apply //cannot be used as a constructor func //this in class body
class PersonClass {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
    this.lang = 'Eng';
  }
  speak() {
    console.log(`Person ${this.firstName} speaks ${this.lang}`);
  }
}
const mePerson = new PersonClass('shomail', 'tahir');
mePerson.speak();
