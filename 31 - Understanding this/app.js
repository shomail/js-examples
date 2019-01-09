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
