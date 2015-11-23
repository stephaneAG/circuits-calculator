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

// not my code, but ~working
/*
 why ~working ?
 simple example:
 var source = [2.5,3.5, 4.7]
 //> [2.5, 3.5, 4.7]
 get_combinations(9.4)
 //> [4.7, 4.7] --> ok, indeed logical
 get_combinations(7)
 //> [4.7] -------> wtf-is-my '[3.5, 3.5]' ? => NOT logical ?!
*/
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

/* alternative, wip version of the above - written by your servitor this time ;p */
function get_combinationsWip(val){
    var result = [];

    while (val >= source[0]){

        for (var i = source.length - 1; i >= 0; i--){
            //console.log('val: ' + val + ' i: ' + i + '  -->  ' + source[i]);
            if (source[i] <= val){
                //console.log(source[i] + ' <= ' + val);
                var nIn = Math.floor(val/source[i]); // R: we could add "upper limit" to val [ & a or ? ] here
                console.log('REMAINS: ' + val);
                console.log(source[i] + ' fits ' + nIn + ' times in ' + val);
                // if we have one or more times source[i] in current/remaining val
                // R: we do NOT check yet the remaining stuff if we were to subtract source[i] from val n times ( later fcn vers )
                if ( nIn ){
                  for(var y=0; y < nIn; y++){ // add the value n times to the result combo, & subtract it from val same number of times
                    val = val - source[i];
                    result.push(source[i]);
                  }
                  break;
                }
                //val = val - source[i];
                //result.push(source[i]);
                //break;
            }
        }
    }
  
    return result;
}



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

// quickie to checkout how this 'd look like
// 'll be useful anyway if didn't use the resistorsStack in the 1st place ..
// quick helper
function resStrFromVal(resVal){
  for( var i=0; i<resistorsStack.length; i++){
    if( resistorsStack[i].resValue === resVal ) return resistorsStack[i].resStr;
  }
  return resVal+'Ω'; //TODO: format it with the default/specified unity
}
// replace val in our <qtty>x<val> by resStr ( ex '10000' -> '10kΩ')
for(var i=0; i<outputCombo.length;i++){
  // get part after 'x'
  var resVal = Number( outputCombo[i].substr(outputCombo[i].indexOf('x')+1 ) );
  // replace it by it's corresponding resStr
  outputCombo[i] = outputCombo[i].substr(0, outputCombo[i].indexOf('x')+1 ) + resStrFromVal(resVal);
}
// and now ? ;D
outputCombo.join(' + ')
//> "2x4.7kΩ" ---> YAY ^^ !

// to get the sum of our outputCombo ( which may not be an exact match )
// for ES6
var outputComboSum = stdCombo.reduce( (a, b) => a + b );
// else
var outputComboSum = stdCombo.reduce( function(a, b){ return a + b}, 0);
//> 9400

// now, format it with the default/specified unity ^^ !
// nb: we could also add a handy 'convert(resVal, desiredUnity)' function ;p

// quick & naïve/crude handling of the above - aka format in unity that's most handy/representative
if(outputComboSum > 1){
  var numLen = outputComboSum.toString().length;
  // put bigger values above this one ;p ( in other words, 'StatOhm, anyone ?' )
  if(numLen > 12) { console.log('Ωs to TΩs !'); outputComboSum = outputComboSum*1e-12+'TΩ'; }
  else if(numLen > 9) { console.log('Ωs to GΩs !'); outputComboSum = outputComboSum*1e-9+'GΩ'; }
  else if(numLen > 6) { console.log('Ωs to MΩs !'); outputComboSum = outputComboSum*1e-6+'MΩ'; }
  else if(numLen > 3) { console.log('Ωs to kΩs !'); outputComboSum = outputComboSum*1e-3+'kΩ'; }
  else { console.log('Ωs stays Ωs ;p'); outputComboSum = outputComboSum+'Ω'; }
} else if (outputComboSum < 1){ // µΩ, anyone ? TODO: adjust the below part, see below comment ( .. )
  // R: the -2 takes in account the prefixing '0.' that gets added even when entering '.005'
  var numLen = outputComboSum.toString().length-2;
  if(numLen > 9) { console.log('Ωs to nΩs !'); outputComboSum = outputComboSum*1e9+'nΩ'; }
  else if(numLen > 6) { console.log('Ωs to µΩs !'); outputComboSum = outputComboSum*1e6+'µΩ'; }
  else if(numLen > 3) { console.log('Ωs to mΩs !'); outputComboSum = outputComboSum*1e3+'mΩ'; }
  else { console.log('Ωs stays Ωs ;p'); outputComboSum = outputComboSum+'Ω'; }
}
//> "9.4kΩ" ---> NEAT ! ;P
/*
when trying different values, either I'm really,reaalllly tired, or it's not that handy that way for values
that are < 1
*/
