
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

// get string value ( in other words, the one passed to the function -> it's the one we'll use to display stuff ;p )
var unity = valueStr.substr( getUnityIdx(valueStr) ); // we could also add the "Ohm sign to it"

// get actual value & updating it according to exps if unity is specified
if( unity !== '') var actualValue = applyExp( Number( valueStr.substr(0, getUnityIdx(valueStr) ) ), unity);
else var actualValue = Number( valueStr.substr(0, getUnityIdx(valueStr) ) );

// array holding all the values of all the resistors I own ( mostly mainly available resistor values )
resistors = [];

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


