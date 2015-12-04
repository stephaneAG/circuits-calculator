// Prototype of Resistor
function ResistorProto(resVal, resStr){
  this.resValue = resVal;
  this.resString = resStr;
}

// Fcns shared by all the ResistorProto instances
ResistorProto.prototype.sayHello = function(){ console.log('Hello there: ' + this.resValue) }

// Resistor class ( public )
function Resistor(resVal, resStr){ return new ResistorProto(resVal, resStr) }

// == NodeJS module exports ==
module.exports = Resistor;

/*
// usage: instanciate a Resistor
var def = Resistor(400, '400')

// == NodeJS usage ==
var Resistor = require('./Resistor_nodeModule.js')
var def = Resistor(400, '400')
*/
