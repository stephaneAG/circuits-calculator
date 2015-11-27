/*

In clean english, the following is a personal try to "combinatorial optimization".
It seems to be close to what some call a "Knapsack" / "Coin" problem(s).

Formulated the best I can, my need is defined by the following(s)

- generate a combination where there's a minimal difference between the sum of all available
  resistor values, any number of times, and the goal number.

additional constraint(s):
1 - while keeping a total number of resistor values less or equal to a specific number

2 - while keeping (a) particular resistor(s)'(s) value usage less or equal to (a) number(s)

*/


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
//var goalResistance = Resistor("16k");
var goalResistance = Resistor("1100M"); // it's always nicer with big-arra(ys|nx) ;)
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

/* wip version 2 of the above - freshly extracted from your servitor's brain cells ^^ */
/*
 working as I expect ?
 === simple example ( same as the one ran against 'get_combinations()' ) ===
 var source = [2.5,3.5, 4.7]
 //> [2.5, 3.5, 4.7]
 get_combinationsWip2(9.4)
 //> [4.7, 4.7] --> ok, indeed logical
 get_combinationsWip2(7)
 //> [3.5, 3.5] ------->  PWND :P !!
 
 === additional tests ( using the std resistorsStack ) ===
 get_combinationsWip2(Resistor("2k").resValue )
 //> [1000, 1000]
 get_combinationsWip2(Resistor("3k").resValue )
 //> [1500, 1500]
 get_combinationsWip2(Resistor("4.4k").resValue )
 //> [2200, 2200]
 get_combinationsWip2(Resistor("7.8k").resValue )
 //> [3900, 3900]
 
 === BUT, we need a littl' fix' for what we "broke" ===
 get_combinationsWip2(Resistor("22k").resValue )
 //> [10000, 10000, 1000, 1000]
*/
function get_combinationsWip2(val){
    var result = [];

    while (val >= source[0]){

        for (var i = source.length - 1; i >= 0; i--){
            //console.log('val: ' + val + ' i: ' + i + '  -->  ' + source[i]);
            if (source[i] <= val){
                //console.log(source[i] + ' <= ' + val);
                var nIn = Math.floor(val/source[i]); // R: we could add "upper limit" to val [ & a or ? ] here
                console.log('REMAINS: ' + val);
                console.log('[i] ' + source[i] + ' fits ' + nIn + ' times in ' + val);
                // WIP ADD: CHECK NEXT ITEM STUFF IT THERE'S ONE
                if( i-1 >= 0 ){ // there are still items after ( actually, previous to ) this one in the array
                  var nxtIn = Math.floor(val/source[i-1]); // R: we could add "upper limit" to val [ & a or ? ] here
                  console.log('[i-1] ' + source[i-1] + ' fits ' + nxtIn + ' times in ' + val);
                  // WIP ADD: CHECK WHICH ITEM IS PRESENT X TIMES MORE THAN THE OTHER
                  // R: we could also [ / next step ? ] look for the smallest remaining value as well
                  if( nxtIn > nIn ){ // there's more [i-1]'s in val than there's [i]'s
                    // add the value n times to the result combo, & subtract it from val same number of times
                    for(var y=0; y < nxtIn; y++){
                      val = val - source[i-1];
                      result.push(source[i-1]);
                    }
                    break;
                  }
                }
                // if we have one or more times source[i] in current/remaining val, we handle things closely as before
                // R: we do NOT check yet the remaining stuff if we were to subtract source[i] from val n times ( later fcn vers )
                //if ( nIn ){
                // add the value n times to the result combo, & subtract it from val same number of times
                for(var y=0; y < nIn; y++){
                  val = val - source[i];
                  result.push(source[i]);
                }
                break;
                //}
                //val = val - source[i];
                //result.push(source[i]);
                //break;
            }
        }
    }
  
    return result;
}

/* wip version 3 of the above, that fixes the "exist as entire resistor value prevented" side-effect  */
/*
 ( .. )
 
 === additional tests ( using the std resistorsStack ) ===
 ( .. )
 // R: 1st version
 get_combinationsWip(Resistor("7.8k").resValue );
 //> [4700, 2200, 1000]
 // R: this version ( & the v2 )
 get_combinationsWip3(Resistor("7.8k").resValue )
 //> [3900, 3900]
 
 // a nice side effect ( which is actually not one, so let's say "the turn it takes" ):
 // while not written in a recursive manner, there's the added benefit of handling [i] & [i-1]
 // this is better seen in the debug logs, as follows
 get_combinationsWip3(Resistor("7.9k").resValue );
 REMAINS: 7900
 [i] 4700 fits 1 times in 7900
 [i-1] 3900 fits 2 times in 7900
 REMAINS: 100
 [i] 68 fits 1 times in 100
 [i-1] 47 fits 2 times in 100
 //> [3900, 3900, 47, 47]
 // note the difference between the above and the log of the following
 get_combinationsWip(Resistor("7.9k").resValue );
 //> [4700, 2200, 1000]
 // hence, as seen with the 7.8k example, both manners are complementary
 
 === interesting thoughts ! ===
 // to have an "upper limit" additional combination generated,
 // we'd just have to use the fcn with the original val + the upper limit threshold
 // to get either/both 'get_combinationsWip3' |/ get_combinationsWip combination(s)
 // the "bottom limit" is by essence, as it depends on the values present in the stack*
 //
 // *who said "let's write a tool to deduce dimensions/material for a particular resistance" ? ;)
 //
 // the ability to pass/specify a max usage of specific resistor values 'd be handy,
 // to be able to quickly deduce available combinations using of the shelf parts
 //
 // by default, the tool aim to use the minimum number of resistors
 // if we choose to do so, we can also opt for smallest amount of different resistor values
 //
 // if we were to allow being passed a maximum number of resistors,
 // displaying the remaining value, if any, should be mandatory
 //
 // add a 'type' prop to Resistor obj, & accept '4bands' & '5bands' as values
 // these could be used to deduce the color scheme & be used in a graph/chart,
 // or in an interactive SVG ( ex: "Adafruit Playground > Resistor Codes")
 //
 // talking about "Adafruit Playground", check the 'Multiple Resistors' calculator:
 // when in the 'in series' tab, it's nearly the exact opposite of my tool** ;P
 // **as it combines resistors values together from a set & returns the overall resistance, 
 //   while we produce return a combination of resistors of a set from an overall resistance ;p 
 
 === .. the "boulevard of broken dreams" is fixe .. ===
 get_combinationsWip3(Resistor("22k").resValue )
 //> [22000]
*/
function get_combinationsWip3(val){
    var result = [];

    while (val >= source[0]){

        for (var i = source.length - 1; i >= 0; i--){
            //console.log('val: ' + val + ' i: ' + i + '  -->  ' + source[i]);
            if (source[i] <= val){
                //console.log(source[i] + ' <= ' + val);
                var nIn = Math.floor(val/source[i]); // R: we could add "upper limit" to val [ & a or ? ] here
                console.log('REMAINS: ' + val);
                console.log('[i] ' + source[i] + ' fits ' + nIn + ' times in ' + val);
                // WIP ADD: CHECK NEXT ITEM STUFF IT THERE'S ONE
                if( i-1 >= 0 ){ // there are still items after ( actually, previous to ) this one in the array
                  var nxtIn = Math.floor(val/source[i-1]); // R: we could add "upper limit" to val [ & a or ? ] here
                  console.log('[i-1] ' + source[i-1] + ' fits ' + nxtIn + ' times in ' + val);
                  // WIP ADD: CHECK WHICH ITEM IS PRESENT X TIMES MORE THAN THE OTHER
                  // ~~R: we could also~~ we have to [ / next step ? ] look for the smallest remaining value as well
                  // else, we'd prevent "entire resistor values" to be accepted ( as it they appear one time / equals 'val')
                  // SO:
                  // if there's more [i-1]'s in val than there's [i]'s
                  // & either:
                  // if ( !source[i] === val ) // or if ( source[i] !== val )
                  // if ( val - nxtIn * source[i-1] < val - nIn * source[i] )
                  //if( nxtIn > nIn ){ // /!\ prevents entire resistor values to be matched against
                  if( nxtIn > nIn && val - nxtIn * source[i-1] < val - nIn * source[i] ){
                    // add the value n times to the result combo, & subtract it from val same number of times
                    for(var y=0; y < nxtIn; y++){
                      val = val - source[i-1];
                      result.push(source[i-1]);
                    }
                    break;
                  }
                }
                // if we have one or more times source[i] in current/remaining val, we handle things closely as before
                // R: we do NOT check yet the remaining stuff if we were to subtract source[i] from val n times ( later fcn vers )
                //if ( nIn ){
                // add the value n times to the result combo, & subtract it from val same number of times
                for(var y=0; y < nIn; y++){
                  val = val - source[i];
                  result.push(source[i]);
                }
                break;
                //}
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

/* TODO ANDTONOTFORGET /!\ 

 - convert(resValOrStr, unity[, type]) // 'd return the value, converted in the desired unity[, as suffixed resStr ]
   resValOrStr: either a Number ( value implicitely in Ω) or String containing a Number ( no unity )
                    or a String, with unity, and optional "Ω" -> we'd get the value using stg like 'Resistor(resStr).resVal'
   unity: the unit in which to convert the passed value
   type: optional, whether or not the returned value is a Number, a Str [ suffixed by the unit ] or a Resistor object
   
   inner working: get/clean/parse stuff, convert depending on unit passed ( using 'exps2' ), then return [ as suffiex str ]
   TODO: add a '.in(unit)' 'member' function to our Resistor, then generate '.in_k' & Cie the same way I did for $_div
         it'd be neat & also reduce considerably the usage of the above ;P

*/

/* wip convert */
function convert(resValOrStr, unit, type){

  // check whether we're passed a str or a value
  var value;
  if( ! isNaN(resValOrStr) ){
    if( typeof resValOrStr === "string" ) value = Number(resValOrStr);
    else value = resValOrStr;
  }
  else {
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
 
  // return stuff
  return outVal; 
  
}


/* add a '.in(unit)' 'member' function to our Resistor, then generate '.in_k' & Cie the same way I did for $_div */
// create a 'subobj' to be able to add methods to its prototype later dynamically while still keeping our Resistor +/- same
function ResistorProto(resValue, resStr){
  this.resValue = resValue;
  this.resStr = resStr;
}
// debug fcn
ResistorProto.prototype.sayHello = function(){ console.log('Hello there: ' + this.resValue) }
// modif(s) on the 'Resistor'
function MyResistor(resistorVal, resistorStr){
  // instead of return { this.resVal, this.resStr }, we do the following
  return new ResistorProto(resistorVal, resistorStr)
}
var def = MyResistor(400, 'hello world')
// generate & add the necessary functions dynamically to our prototype
exps2.forEach(function(mapItem){
  console.log('unitySymbol: ' + mapItem[0] + ' unityValue: ' + mapItem[1])
  ResistorProto.prototype['_in' + mapItem[0]] = function(){
    return this.resValue * mapItem[1];
    //console.log('resVal: ' + this.resValue + ' mapItem[0]: ' + mapItem[0] + ' mapItem[1]: ' + mapItem[1] )
  };
})
// alternative to the above that allows choosing the form of what's returned
exps2.forEach(function(mapItem){
  //console.log('unitySymbol: ' + mapItem[0] + ' unityValue: ' + mapItem[1])
  ResistorProto.prototype['_in' + mapItem[0]] = function(type){
    //var outVal = applyExp2( value, unit); // old
    //var outVal = this.resValue * mapItem[1]; // good ?
    var outVal = applyExp2( this.resValue, mapItem[0]);
    
    // check what we have to return
    //console.log( 'FORM OF RETURN: ' + type );
    if( typeof type !== 'undefined' ){
      if( type === 'str') outVal += '';
      else if( type === 'unit') outVal += mapItem[0];
      else if( type === 'unity') outVal += mapItem[0] + 'Ω';
    }
  
    //return this.resValue * mapItem[1];
    return outVal;
    //console.log('resVal: ' + this.resValue + ' mapItem[0]: ' + mapItem[0] + ' mapItem[1]: ' + mapItem[1] )
  };
})






/* wip code for later SVG handling/generation */
/*
  order of TODO's:
  
  - Resistor.generateBands(bands) - pass it 4 or 5 to get an array of resistor color codes
  - Resistor.generateSVG(bands) - pass it ( or not ) stuff & it 'll generate a colored SVG
  - ( .. )
  -> R: write down here stuff from notes on paper
*/

//R: added directly to a resistor insance in the current Resistor implm
var myResistor = Resistor('10k')
myResistor.generateBands = function(bands){
  // TODO: handle values above 1 only for the moment ( aka no m,µ,n by now)
  if(this.value < 1){
    console.log('m,µ,n not handled by now ! ')
  } else {
    console.log('res value is above 1 Ohm: ' + this.resValue)
    // ====
    var colorCodesArr = [];
    
    if(this.resValue < 10){ // if we only have one digit
      // == 4 bands ==
      if( bands === 4 ){
        colorCodesArr.push ( this.resValue ); // value in 1st, to apply to convention
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0.1 );           // adjusted multiplier to comply with the above(s) - 4 band version
      }
      // == 5 bands ==
      else {
        colorCodesArr.push ( this.resValue ); // value in 1st, to apply to convention
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0.01 );           // adjusted multiplier to comply with the above(s) - 5 band version
      }  
      
    } else { // else, aka any number of digit
      // == prepare further bands handling ==
      var serValStr = this.resValue.toString();
      colorCodesArr.push ( serValStr[0] ); // extract first digit
      colorCodesArr.push ( serValStr[1] ); // extract second digit
      // == 5 bands & adjust if additional digit precision is provided in original resistor value ==
      if( bands === 5 && serValStr.length >= 3 ){ // if we have a third digit that won't be zero-ed on 5 band resistors
        colorCodesArr.push ( serValStr[3] ); // extract third digit
        var multiplier = resValStr.substr(3); // extract rest of number if any - that is, level to 0's & use in multiplier
        if(multiplier !== ''){
          // zero-out any lasting digit, be it a 10's or whatever
          multiplier = Number( '1' + Array(multiplier.length+1).join('0') );
          
        }
      }
      // == 5 bands ==
      // == 4 bands ==
      else {
        colorCodesArr.push ( 1 ); // multiplier - 4 band version
      }
      
    }
    
    // ====
  }
}
