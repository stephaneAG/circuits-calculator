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
    //if (isNaN(parseInt(valueStrArr[i]))) {
    if (isNaN(parseInt(valueStrArr[i])) && valueStrArr[i] !== '.' ) { // to handle stuff like '2.3k'
      idx = i;
      return idx;
      break;
    }
  }
}

var exps2 = [
  ['n', 1e-9 ],
  ['µ', 1e-6 ],
  ['m', 1e-3 ],
  ['k',  1e3 ],
  ['M',  1e6 ],
  ['G',  1e9 ],
  ['T', 1e12 ],
];

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

resistorsStack = [];
resistors.forEach(function(resistorVal){ resistorsStack.push( Resistor(resistorVal) ); });

// quick debug ?
resistorsStack.forEach(function(resistorObj){ console.log( resistorObj.resStr + ' ==> ' + resistorObj.resValue) });

// quickie to debug my idea for deducing combos ( .. )
// to hold our goal value ( in goalResistance.resValue )
var goalResistance = Resistor("16k");
// to hold our sources
var source = [];
//resistorsStack.forEach(function(resistorObj){ source.push( resistorObj.resValue ); });

resistorsStack.forEach(function(resistorObj){
  if( resistorObj.resValue <= goalResistance.resValue ) source.push( resistorObj.resValue );
});

// don't mind the following & check the above ;p
// discard any source that's bigger than the goal value
// ( we can either splice() values ot of source, or push some of them to a new array )
//var goodSrc = [];

// R!: to 'sort' numerical stuff from tiniest to biggest:
// source.sort( function(a, b){return a-b} );
// & to 'sort' numerical stuff from biggest to tiniest: ( instead of doing sort(..).reverse() )
// source.sort( function(a, b){return b-a} );

// sorte the source resistor values from biggest to tiniest - currently not used as is ;p
//source.sort( function(a, b){return b-a} );

// debug
for(var i=0; i<source.length;i++){
  var nIn = Math.floor(goalResistance.resValue/source[i]);
  //console.log('elem i: ' + source[i] + ' appears ' + nIn + ' times entirely in val: ' + goalResistance.resValue);
  var isLeft = goalResistance.resValue - ( source[i] * nIn );
  //console.log('remaining stuff when subtracting: ' + isLeft);
  console.log('%c' + source[i] + '  ->  TIMES: ' + nIn + '  =>  REMAINS: ' + isLeft, 'color: #0037BE;')
}


/* WIP combos calculations .. */

// not my code, but working
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
// to use:
get_combinations(Resistor("9.4k").resValue )
//> [4700, 4700]

// to properly format the output 
//( unities are to be added, depending on the desired/specified output unity )
// also, going further away from the above example implm, we could still have the str<->val relationship we had ( .. )
var stdCombo = get_combinations(Resistor("9.4k").resValue )
var counts = {};
var outputCombo = [];
for(var i = 0; i< stdCombo.length; i++) {
    var num = stdCombo[i];
    counts[num] = counts[num] ? counts[num]+1 : 1;
}
var resistorsByQtty = keys(counts)
resistorsByQtty.forEach(function(elem){
  console.log(elem + ' x ' + counts[elem]);
  outputCombo.push( counts[elem] + 'x' + elem );
});
// to get a grasp on what it 'd look like with multiple resistor values
//outputCombo.push( '1x250' )
outputCombo.join(' + ')
//> "2x4700 + 1x250"
