// == units & 10's pows map ==
var exps2 = [
  ['n', 1e-9 ], // n/nΩ --> NanoOhm  ==> 10exp-9 ==> 0,000.000.001
  ['µ', 1e-6 ], // µ/µΩ --> MicroOhm ==> 10exp-6 ==> 0,000.001
  ['m', 1e-3 ], // m/mΩ --> MilliOhm ==> 10exp-3 ==> 0,001
  ['k',  1e3 ], // k/kΩ --> KiloOhm  ==> 10exp3 ==> 1.000
  ['M',  1e6 ], // M/MΩ --> MegaOhm  ==> 10exp6 ==> 1.000.000
  ['G',  1e9 ], // G/GΩ --> GigaOhm  ==> 10exp9 ==> 1.000.000.000
  ['T', 1e12 ], // T/TΩ --> TeraOhm  ==> 10exp12 ==> 1.000.000.000.000
];

// == general coloring scheme ==
var resColorsMap = {
  silver: '#C0C0C0',
  gold:   '#B8860B',
  black:  '#000000',
  brown:  '#A0522D',
  red:    '#FF0000',
  orange: '#FF8C00',
  yellow: '#FFD700',
  green:  '#008000',
  blue:   '#0000CD',
  purple: '#800080',
  gray:   '#808080',
  white:  '#F8F8FF', 
};

// == values coloring scheme ==
var resValColorsMap = [
  resColorsMap.black,   // black   ->  0
  resColorsMap.brown,   // brown   ->  1
  resColorsMap.red,     // red     ->  2
  resColorsMap.orange,  // orange  ->  3
  resColorsMap.yellow,  // yellow  ->  4
  resColorsMap.green,   // green   ->  5
  resColorsMap.blue,    // blue    ->  6
  resColorsMap.purple,  // purple  ->  7
  resColorsMap.gray,    // gray    ->  8
  resColorsMap.white,   // white   ->  9
];

// == multiplier coloring scheme == */
var resMultColorsMap = {
         0.01: resColorsMap.silver, // silver  ->  0
         0.1:  resColorsMap.gold,   // gold    ->  1
         1:    resColorsMap.black,  // black   ->  2
        10:    resColorsMap.brown,  // brown   ->  3
       100:    resColorsMap.red,    // red     ->  4
      1000:    resColorsMap.orange, // orange  ->  5
     10000:    resColorsMap.yellow, // yellow  ->  6
    100000:    resColorsMap.green,  // green   ->  7
   1000000:    resColorsMap.blue,   // blue    ->  8
  10000000:    resColorsMap.purple, // purple  ->  9 
};

// == tolerance coloring scheme == */
var resTol4bandsColorsMap = {
   0.05: resColorsMap.gray,   // gray   ->  0
   0.1:  resColorsMap.purple, // purple ->  1
   0.25: resColorsMap.blue,   // blue   ->  2
   0.5:  resColorsMap.green,  // green  ->  3
   1:    resColorsMap.brown,  // brown  ->  4
   2:    resColorsMap.red,    // red    ->  5
   5:    resColorsMap.gold,   // gold   ->  6
  10:    resColorsMap.silver, // silver ->  7
}


// helper - loop over the "units & 10's pows map" & see if we have a matching unit
var applyExp2 = function(theValue, theUnity){
  if( theUnity !== ''){
    for( var i=0; i<= exps2.length; i++){
      if (exps2[i][0] === theUnity) {
        return theValue * exps2[i][1]; 
        break;
      }
    }
  }
  return theValue;
}

// helper - get units & value from resistor values passed as trings ( may or not contain the ending "Ohm" symbol and/or n,µ,.. )
var getUnityIdx = function(valueStr){
  var valueStrArr = valueStr.split('');
  for( var i=0; i<= valueStrArr.length; i++){
    if (isNaN(parseInt(valueStrArr[i])) && valueStrArr[i] !== '.' ) { // to handle stuff like '2.3k'
      idx = i;
      return idx;
      break;
    }
  }
}

// helper - convert some value, not necesseraly a Resistor, to stuff ( including a Resistor )
var convert = function (resValOrStr, unit, type){
  // check whether we're passed a str or a value
  var value;
  if( ! isNaN(resValOrStr) ){
    if( typeof resValOrStr === "string" ) value = Number(resValOrStr);
    else value = resValOrStr;
  } else {
    var unity = resValOrStr.substr( getUnityIdx(resValOrStr) );
    if (unity.substr(-1) === "Ω" ) unity = unity.substr(0, unity.length-1);
    if( unity !== '') value = applyExp2( Number( resValOrStr.substr(0, getUnityIdx(resValOrStr) ) ), unity);
    else value = Number( resValOrStr.substr(0, getUnityIdx(resValOrStr) ) ); 
  }

  // clean & check what is the desired output unit, & convert value
  if (unit.substr(-1) === "Ω" ) unit = unit.substr(0, unit.length-1);
  var outVal = applyExp2( value, unit);

  // check what we have to return
  if( !typeof type === 'undefined' ){
    if( type === 'str') outVal += '';
    else if( type === 'unit') outVal += unit;
    else if( type === 'unity') outVal += unit + 'Ω';
    else if( type === 'resistor') outVal = Resistor(outVal);
  }
   
  return outVal; 
}


// == Prototype of Resistor ==
function ResistorProto(resVal, resStr){
  this.resValue = resVal;
  this.resString = resStr;
}

// == Fcns shared by all the ResistorProto instances ==
// tests fcn
ResistorProto.prototype.sayHello = function(){ console.log('Hello there: ' + this.resValue) }

// generate fcns to display the value of a resistor with a different unit
exps2.forEach(function(mapItem){
  ResistorProto.prototype['_in' + mapItem[0]] = function(type){
    var outVal = applyExp2( this.resValue, mapItem[0]);
    
    // check what we have to return
    if( typeof type !== 'undefined' ){
      if( type === 'str') outVal += '';
      else if( type === 'unit') outVal += mapItem[0];
      else if( type === 'unity') outVal += mapItem[0] + 'Ω';
    }
  
    return outVal;
  };
})

// generate the bands for a Resistor ( 4 bands & 5bands )
ResistorProto.prototype.generateBands2 = function(bands){
  // TODO: handle values above 1 only for the moment ( aka no m,µ,n by now)
  if(this.value < 1){
    console.log('m,µ,n not handled by now ! ')
  } else {
    //console.log('res value is above 1 Ohm: ' + this.resValue)
    
    // ====
    var colorCodesArr = [];
    
    if( this.resValue < 10){ // if we only have one digit
      // == 4 bands ==
      if( bands === 4 ){
        //console.log('4bands - one digit')
        colorCodesArr.push ( this.resValue ); // value in 1st, to apply to convention
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0.1 );           // adjusted multiplier to comply with the above(s) - 4 band version
        colorCodesArr.push ( '±' );           // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        //console.log('5bands - one digit')
        colorCodesArr.push ( this.resValue ); // value in 1st, to apply to convention
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0.01 );           // adjusted multiplier to comply with the above(s) - 5 band version
        colorCodesArr.push ( '±' );           // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    else if( this.resValue < 100){ // if we have two digit
      // == 4 bands ==
      if( bands === 4 ){
        //console.log('4bands - two digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( 1 );                     // adjusted multiplier - 4 band version
        colorCodesArr.push ( '±' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        //console.log('5bands - two digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( 0 );                     // added 0, to apply to convention
        colorCodesArr.push ( 0.1 );                   // adjusted multiplier to comply with the above(s) - 5 band version
        colorCodesArr.push ( '±' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    
    else if( this.resValue < 1000){ // if we have three digit
      // == 4 bands ==
      if( bands === 4 ){
        //console.log('4bands - three digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( 10 );                     // adjusted multiplier ( third digit is discarded ) - 4 band version
        colorCodesArr.push ( '±' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        //console.log('5bands - three digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( Number( (''+this.resValue)[2] ) ); // 3rd digit
        colorCodesArr.push ( 1 );                     // adjusted multiplier - 5 band version
        colorCodesArr.push ( '±' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    else { // if we have more than three digit
      // == 4 bands ==
      if( bands === 4 ){
        //console.log('4bands - more than three digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) );                                         // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) );                                         // 2nd digit
        colorCodesArr.push ( Number( '1' + Array( (''+this.resValue).substr(2).length+1 ).join('0') ) ) // adjusted multiplier - 4 band version
        colorCodesArr.push ( '±' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        //console.log('5bands - more than digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( Number( (''+this.resValue)[2] ) ); // 3rd digit
        colorCodesArr.push ( Number( '1' + Array( (''+this.resValue).substr(3).length+1 ).join('0') ) ) // adjusted multiplier - 5 band version
        colorCodesArr.push ( '±' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    // ====
  }
}


//  == Resistor class ( public ) ==
//function Resistor(resVal, resStr){ return new ResistorProto(resVal, resStr) }
function Resistor(resistorValue){
  if( ! isNaN(resistorValue) ){ // decimal
    if( typeof resistorValue === "string" ) this.resValue = Number(resistorValue); // if num passed as str
    else this.resValue = resistorValue; 
    this.resStr = resistorValue + 'Ω';
  } else { // string
    // get string stuff until first char: if it's Ohm, strip it, else if maj/min supported char, deduce value
    var unity = resistorValue.substr( getUnityIdx(resistorValue) ); // get the unit part
    if (unity.substr(-1) === "Ω" ) unity = unity.substr(0, unity.length-1); // clean up
    // get actual value
    if( unity !== '') this.resValue = applyExp2( Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ), unity);
    else this.resValue = Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ); 
    this.resStr = resistorValue + 'Ω';
  }
  
  return new ResistorProto(this.resValue, this.resStr)
}



// == NodeJS module exports ==
module.exports = Resistor;

/*
// usage: instanciate a Resistor
var def = Resistor(400, '400')

// == NodeJS usage ==
var Resistor = require('./Resistor_nodeModule.js')
var def = Resistor(400, '400')
*/
