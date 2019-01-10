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
