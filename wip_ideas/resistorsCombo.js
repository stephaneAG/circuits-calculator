
/*
# the following file aims to define the idea of a "resistor combo" calculator
# in other words, a little utility program to calculate the "resistor combos" for a specific value,
# based on a set of resistor values & some parameters on the maximum number of resistors to be used in a said-"combo"
# also, the "resistor" objets 'll hold their value in Ohms ( decimals ) as well as their value in string ( k,m, ... Ohms )
# in other words, the decimal values are deduced from values in string, adjusting themselves depending on the unit presence

# Followds, the text from my original notes ( as a sort-of-a-reminder ;p )


*/

// rought concept
var resistor = function(resistorValue){
  if( ! isNaN(resistorValue) ){
    console.log("decimal !");
    this.resValue = resistorValue; 
    this.resStr = resistorValue.toString(); // we could also have added "Ω" at the end
  }
  else {
    // get string stuff until first char: if it's Ohm, strip it, else if maj/min supported char, deduce value
    console.log("string !");
    this.resValue = ".."; // do what the above comment say, & finally just use only the unit char OR add to it the "Ω" at the end
    this.resStr = resistorValue;
  }
}
// LESS ROUGH CONCEPT FOR THE ABOVE FUNCTION
/*
var Resistor = function(resistorValue){
  if( ! isNaN(resistorValue) ){
    console.log("decimal !");
    // maybe the number is within a string, let's make it ready for later / standardize that !
    if( typeof resistorValue === "string" ) this.resValue = Number(resistorValue);
    else this.resValue = resistorValue; 
    this.resStr = resistorValue.toString(); // we could also have added "Ω" at the end
  }
  else {
    // get string stuff until first char: if it's Ohm, strip it, else if maj/min supported char, deduce value
    console.log("string !");
    // do what the above comment say, & finally just use only the unit char OR add to it the "Ω" at the end
    // get the unity part
    var unity = resistorValue.substr( getUnityIdx(resistorValue) );
    // clean it up
    if (unity.substr(-1) === "Ω" ) unity = unity.substr(0, unity.length-1);
    // get actual value
    //if( unity !== '') this.resValue = applyExp( Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ), unity);
    if( unity !== '') this.resValue = applyExp2( Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ), unity);
    else this.resValue = Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ); 
    this.resStr = resistorValue;
  }
  // in case we don't wanna use the 'var x = new Resistor(..)' syntax, but instead 'var x = Resistor(..)'
  return { resValue: this.resValue, resStr: this.resStr};
}
*/
// version of the above that adds "Ohm" to the resStr variable
var Resistor = function(resistorValue){
  if( ! isNaN(resistorValue) ){
    console.log("decimal !");
    // maybe the number is within a string, let's make it ready for later / standardize that !
    if( typeof resistorValue === "string" ) this.resValue = Number(resistorValue);
    else this.resValue = resistorValue; 
    //this.resStr = resistorValue.toString(); // we could also have added "Ω" at the end
    this.resStr = resistorValue + 'Ω'; // alternative: we add "Ω" at the end ;)
  }
  else {
    // get string stuff until first char: if it's Ohm, strip it, else if maj/min supported char, deduce value
    console.log("string !");
    // do what the above comment say, & finally just use only the unit char OR add to it the "Ω" at the end
    // get the unity part
    var unity = resistorValue.substr( getUnityIdx(resistorValue) );
    // clean it up
    if (unity.substr(-1) === "Ω" ) unity = unity.substr(0, unity.length-1);
    // get actual value
    //if( unity !== '') this.resValue = applyExp( Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ), unity);
    if( unity !== '') this.resValue = applyExp2( Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ), unity);
    else this.resValue = Number( resistorValue.substr(0, getUnityIdx(resistorValue) ) ); 
    //this.resStr = resistorValue;
    this.resStr = resistorValue + 'Ω'; // alternative: we add "Ω" at the end ;)
  }
  // in case we don't wanna use the 'var x = new Resistor(..)' syntax, but instead 'var x = Resistor(..)'
  return { resValue: this.resValue, resStr: this.resStr};
}

// get units & value from resistor values passed as trings ( may or not contain the ending "Ohm" symbol and/or n,µ,.. )
getUnityIdx = function(valueStr){
  var valueStrArr = valueStr.split('');
  for( var i=0; i<= valueStrArr.length; i++){
    if (isNaN(parseInt(valueStrArr[i]))) {
      idx = i;
      return idx;
      break;
    }
  }
}

// get value & unity
// strip "Ω" if present at the end of the unity ( not likely, but who knows ? ^^ ), as it's implied
if (unity.substr(-1) === "Ω" ) unity = unity.substr(0, unity.length-1)

// if unity is still !== '', we have to map the char passed to the corresponding exp in the following chart & update resValue
/*
n/nΩ --> NanoOhm  ==> 10exp-9 ==> 0,000.000.001
µ/µΩ --> MicroOhm ==> 10exp-6 ==> 0,000.001
m/mΩ --> MilliOhm ==> 10exp-3 ==> 0,001
/Ω   --> Ohm      ==> 10exp0  ==> 1
k/kΩ --> KiloOhm  ==> 10exp3 ==> 1.000
M/MΩ --> MegaOhm  ==> 10exp6 ==> 1.000.000
G/GΩ --> GigaOhm  ==> 10exp9 ==> 1.000.000.000
T/TΩ --> TeraOhm  ==> 10exp12 ==> 1.000.000.000.000
*/
// array(s) to match the unity against ( & use 'Math.pow(10, arr[idx][1]) * resValue' to deduce actual value of resistor )
var exps = [
  ['n', -9 ],
  ['µ', -6 ],
  ['m', -3 ],
  ['k',  3 ],
  ['M',  6 ],
  ['G',  9 ],
  ['T', 12 ],
];
// alternative version of the above array
var exps2 = [
  ['n', 1e-9 ],
  ['µ', 1e-6 ],
  ['m', 1e-3 ],
  ['k',  1e3 ],
  ['M',  1e6 ],
  ['G',  1e9 ],
  ['T', 1e12 ],
];


// get a number udpdated if the unity passed is present in the exps array, in other words, "supported"
applyExp = function(theValue, theUnity){
  if( theUnity !== ''){
    // loop over the exps array & try to see if unity matches one of the array's[0] items
    // if so, update the resValue using the corresponding array's[1] item
    for( var i=0; i<= exps.length; i++){
      if (exps[i][0] === theUnity) {
        return theValue * Math.pow(10, exps[i][1]); 
        break;
      }
    }
  }
  return theValue;
}
// alternative version of the above function
applyExp2 = function(theValue, theUnity){
  if( theUnity !== ''){
    // loop over the exps array & try to see if unity matches one of the array's[0] items
    // if so, update the resValue using the corresponding array's[1] item
    for( var i=0; i<= exps2.length; i++){
      if (exps2[i][0] === theUnity) {
        return theValue * exps2[i][1]; 
        break;
      }
    }
  }
  return theValue;
}

// get string value ( in other words, the one passed to the function -> it's the one we'll use to display stuff ;p )
var unity = valueStr.substr( getUnityIdx(valueStr) ); // we could also add the "Ohm sign to it"

// get actual value & updating it according to exps if unity is specified
if( unity !== '') var actualValue = applyExp( Number( valueStr.substr(0, getUnityIdx(valueStr) ) ), unity);
else var actualValue = Number( valueStr.substr(0, getUnityIdx(valueStr) ) );

// array holding all the values of all the resistors I own ( mostly mainly available resistor values )
resistors = [
  /* Ω - Ohm */
  47,
  68,
  150,
  200,
  270,
  330,
  470,
  510,
  560,
  /* kΩ - KiloOhm */
  '1k',
  '1.5k',
  '2.2k',
  '3.9k',
  '4.7k',
  '10k',
  '22k',
  '27k',
  '36k',
  '47k',
  '100k',
  '200k',
  '330k',
  /* MΩ - MegaOhm */
  '1M',
  '20M',
  '1100M',
];

// array holding all the resistor Objects gotten from the above reistor array's values
// 'll be used to deduce the possible configs when providing the tool a request ( aka, get the optimal combo for ( .. ) )
resistorsStack = [];








/* == R: NOT MY CODE !!! == 
 the following is the best I could find to study a possible [ yet not exactly to my likings ..] implm
 of the knapsack-like problematic I'm facing ..
 for the record, I have 2 solutions-that-won't-be-working-I-guess on my own ^^
*/
var source = [0., 2.5, 3.5, 4.7];
function get_combinations(val)
{
    var result = [];

    while (val >= source[0])
    {
        for (var i = source.length - 1; i >= 0; i--)
        {
            if (source[i] <= val)
            {
                val = val - source[i];
                result.push(source[i]);
                break;
            }
        }
    }
  
    return result;
}
console.log( get_combinations(7).join(' + ') );


/* ONE OF MY NAÏVE/CRUDE IDEA :p */
var source = [2.5, 3.5, 4.7];
function getCombo(val){
  
  // remvove too big values
  var goodSrc = source;
  for(var i=0; i>goodSrc.length;i++ ){
    if( goodSrc[i] > val ) goodSrc.unset(i);
    console.log(goodSrc[i] + ' was too big !');
  }  

  // deduce solution(s)
  goodSrc.sort(); // in case it's not sorted already / to strip unnecessary dots ( commas )
  goodSrc.reverse(); // biggers first
  var results = [];
  while(val != 0 ){
  
    for(var i=0; i>goodSrc.length;i++ ){
      // check how many times goodSrc[i] fits in val entirely
      var nIn = Math.floor(val/goodSrc[i]);
      console.log('elem i: ' + goodSrc[i] + ' appears ' + nIn + ' times entirely in val: ' + val);
      // and what's left after substracting nIn * goodSrc[i] from val
      var isLeft = val - ( goodSrc[i] * nIn );
      console.log('remaining stuff when subtracting: ' + isLeft);
      // check elements after goodSrc[i] if they exist
      for(var y=0; y>goodSrc.length-(i+1); y++){
        var nIn = Math.floor(val/goodSrc[i+y]);
        console.log('elem y: ' + goodSrc[i+y] + ' appears ' + nIn + ' times entirely in val: ' + val);
        var isLeft = val - ( goodSrc[i+y] * nIn );
        console.log('remaining stuff when subtracting: ' + isLeft);
      }

      // TODO: check if elem after exist & has bigger nIn than it
      // if so, compare the remaining stuff & use the item that left the smallest amount
      // if the amount is === 0, we're good :D !
      // else, check the "upper" & "bottom" limits to know how far we're allowed to go upper & below an exact-matching value
    }
  
  }
}
