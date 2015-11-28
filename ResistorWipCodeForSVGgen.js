myResistor.resValue = 1
// == 4bands - one digit ==
myResistor.generateBands2(4)
//> [1, 0, 0.1, "t"]
// == 5bands - one digit ==
myResistor.generateBands2(5)
//> [1, 0, 0, 0.01, "t"]


myResistor.resValue = 10
// == 4bands - two digit ==
myResistor.generateBands2(4)
//> [1, 0, 1, "t"]

// == 5bands - two digit ==
myResistor.generateBands2(5)
//> [1, 0, 0, 0.1, "t"]


myResistor.resValue = 100
// == 4bands - three digit ==
myResistor.generateBands2(4)
//> [1, 1, 10, "t"]
// == 5bands - three digit ==
myResistor.generateBands2(5)
//> [1, 0, 0, 1, "t"]


myResistor.resValue = 1000
// == 4bands - more than three digit ==
myResistor.generateBands2(4)
//> [1, 0, 100, "t"]
// == 5bands - more than digit ==
myResistor.generateBands2(5)
//> [1, 0, 0, 10, "t"]


myResistor.resValue = 10000
// == 4bands - more than three digit ==
myResistor.generateBands2(4)
//> [1, 0, 1000, "t"]
// == 5bands - more than digit ==
myResistor.generateBands2(5)
//> [1, 0, 0, 100, "t"]


myResistor.generateBands2 = function(bands){
  // TODO: handle values above 1 only for the moment ( aka no m,µ,n by now)
  if(this.value < 1){
    console.log('m,µ,n not handled by now ! ')
  } else {
    console.log('res value is above 1 Ohm: ' + this.resValue)
    
    // ====
    var colorCodesArr = [];
    
    if( this.resValue < 10){ // if we only have one digit
      // == 4 bands ==
      if( bands === 4 ){
        console.log('4bands - one digit')
        colorCodesArr.push ( this.resValue ); // value in 1st, to apply to convention
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0.1 );           // adjusted multiplier to comply with the above(s) - 4 band version
        colorCodesArr.push ( 't' );           // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        console.log('5bands - one digit')
        colorCodesArr.push ( this.resValue ); // value in 1st, to apply to convention
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0 );             // added 0, same as above
        colorCodesArr.push ( 0.01 );           // adjusted multiplier to comply with the above(s) - 5 band version
        colorCodesArr.push ( 't' );           // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    else if( this.resValue < 100){ // if we have two digit
      // == 4 bands ==
      if( bands === 4 ){
        console.log('4bands - two digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( 1 );                     // adjusted multiplier - 4 band version
        colorCodesArr.push ( 't' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        console.log('5bands - two digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( 0 );                     // added 0, to apply to convention
        colorCodesArr.push ( 0.1 );                   // adjusted multiplier to comply with the above(s) - 5 band version
        colorCodesArr.push ( 't' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    
    else if( this.resValue < 1000){ // if we have three digit
      // == 4 bands ==
      if( bands === 4 ){
        console.log('4bands - three digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 2nd digit
        colorCodesArr.push ( 10 );                     // adjusted multiplier ( third digit is discarded ) - 4 band version
        colorCodesArr.push ( 't' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        console.log('5bands - three digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( Number( (''+this.resValue)[2] ) ); // 3rd digit
        colorCodesArr.push ( 1 );                     // adjusted multiplier - 5 band version
        colorCodesArr.push ( 't' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    else { // if we have more than three digit
      // == 4 bands ==
      if( bands === 4 ){
        console.log('4bands - more than digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( 10 );                     // adjusted multiplier ( third digit is discarded ) - 4 band version
        colorCodesArr.push ( 't' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }
      // == 5 bands ==
      else {
        console.log('5bands - more than digit')
        colorCodesArr.push ( Number( (''+this.resValue)[0] ) ); // 1st digit
        colorCodesArr.push ( Number( (''+this.resValue)[1] ) ); // 2nd digit
        colorCodesArr.push ( Number( (''+this.resValue)[2] ) ); // 3rd digit
        colorCodesArr.push ( 1 );                     // adjusted multiplier - 5 band version
        colorCodesArr.push ( 't' );                   // dummy placeholder for tolerance
        return colorCodesArr;
      }  
      
    }
    
    // ====
  }
}







/* == LATEST -> big, ok, but works fiiine ^^ == */
myResistor.generateBands2 = function(bands){
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

/* quickly log using colored blocks - nb: not using color tables yet */
/*
  usage:
  myResistor.logBands_block(myResistor.generateBands2(4) )
  //> ⊣𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⊢
  myResistor.logBands_block(myResistor.generateBands2(5) )
  //> ⊣𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⊢
*/
myResistor.logBands_block = function(bandsArray){
  if( bandsArray.length === 4 ){
    console.log('%c⊣%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: chocolate; font-size: 30px;', 'color: transparent;', 
                'color: blue; font-size: 30px;', 'color: transparent;', 
                'color: red; font-size: 30px;', 'color: transparent;', 
                'color: gray; font-size: 30px;', 'color: transparent;', 'color: black; font-size: 29px;');
  } else {
    console.log('%c⊣%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: chocolate; font-size: 30px;', 'color: transparent;', 
                'color: blue; font-size: 30px;', 'color: transparent;', 
                'color: black; font-size: 30px;', 'color: transparent;',
                'color: chocolate; font-size: 30px;', 'color: transparent;', 
                'color: gray; font-size: 30px;', 'color: transparent;', 'color: black; font-size: 29px;');
  }
}
/* version that uses the colors from the color maps */
myResistor.logBands_block2 = function(bandsArray){
  if( bandsArray.length === 4 ){
    console.log('%c⊣%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: '+resValColorsMap[ bandsArray[0] ]+'; font-size: 30px;', 'color: transparent;',    // 1st digit
                'color: '+resValColorsMap[ bandsArray[1] ]+'; font-size: 30px;', 'color: transparent;',    // 2nd digit
                'color: '+resMultColorsMap[ bandsArray[2] ]+';; font-size: 30px;', 'color: transparent;',  // multiplier
                'color: gray; font-size: 30px;', 'color: transparent;', 'color: black; font-size: 29px;');
  } else {
    console.log('%c⊣%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: '+resValColorsMap[ bandsArray[0] ]+'; font-size: 30px;', 'color: transparent;',    // 1st digit
                'color: '+resValColorsMap[ bandsArray[1] ]+'; font-size: 30px;', 'color: transparent;',    // 2nd digit
                'color: '+resValColorsMap[ bandsArray[2] ]+'; font-size: 30px;', 'color: transparent;',    // 3rd digit
                'color: '+resMultColorsMap[ bandsArray[3] ]+';; font-size: 30px;', 'color: transparent;',  // multiplier
                'color: gray; font-size: 30px;', 'color: transparent;', 'color: black; font-size: 29px;');
  }
}
/* version that displays a plus-minus sign instead of the last tolerance color, since we don't generate the tolerance value neither its color, to ease the reading of the other colors / values ;p */
myResistor.logBands_block3 = function(bandsArray){
  if( bandsArray.length === 4 ){
    console.log('%c⊣%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c'+bandsArray[3]+'%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: '+resValColorsMap[ bandsArray[0] ]+'; font-size: 30px;', 'color: transparent;',    // 1st digit
                'color: '+resValColorsMap[ bandsArray[1] ]+'; font-size: 30px;', 'color: transparent;',    // 2nd digit
                'color: '+resMultColorsMap[ bandsArray[2] ]+';; font-size: 30px;', 'color: transparent;',  // multiplier
                'color: gray; font-size: 24px;', 'color: transparent;', 'color: black; font-size: 29px;'); // tolerance
  } else {
    console.log('%c⊣%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c⬛%c𝇁𝇁%c'+bandsArray[4]+'%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: '+resValColorsMap[ bandsArray[0] ]+'; font-size: 30px;', 'color: transparent;',    // 1st digit
                'color: '+resValColorsMap[ bandsArray[1] ]+'; font-size: 30px;', 'color: transparent;',    // 2nd digit
                'color: '+resValColorsMap[ bandsArray[2] ]+'; font-size: 30px;', 'color: transparent;',    // 3rd digit
                'color: '+resMultColorsMap[ bandsArray[3] ]+';; font-size: 30px;', 'color: transparent;',  // multiplier
                'color: gray; font-size: 24px;', 'color: transparent;', 'color: black; font-size: 29px;'); // tolerance
  }
}

/* quickly log using colors values - nb: not using color tables yet */
/*
  usage:
  myResistor.logBands_unit(myResistor.generateBands2(4) )
  //> -|1|0|x1000|t|-
  myResistor.logBands_unit(5, myResistor.generateBands2(5) )
  //> -|1|0|0|x100|t|-
*/
myResistor.logBands_unit = function(bandsArray){
  if( bandsArray.length === 4 ){
    console.log('-|%c'+bandsArray[0]+'%c|%c'+bandsArray[1]+'%c|%cx'+bandsArray[2]+'%c|%c'+bandsArray[3]+'%c|-', 
                'color: chocolate;', 'color: black;', 
                'color: blue;', 'color: black;', 
                'color: red;', 'color: black;', 
                'color: gray;', 'color: black;');
  } else {
    console.log('-|%c'+bandsArray[0]+'%c|%c'+bandsArray[1]+'%c|%c'+bandsArray[2]+'%c|%cx'+bandsArray[3]+'%c|%c'+bandsArray[4]+'%c|-', 
                'color: chocolate;', 'color: black;', 
                'color: blue;', 'color: black;', 
                'color: black;', 'color: black;',
                'color: chocolate;', 'color: black;', 
                'color: gray;', 'color: black;');
  }
}
/* sized-up alternative of the above, using glyphs */
myResistor.logBands_unit2 = function(bandsArray){
  if( bandsArray.length === 4 ){
    console.log('%c⊣%c𝇁𝇁%c'+bandsArray[0]+'%c𝇁𝇁%c'+bandsArray[1]+'%c𝇁𝇁%cx'+bandsArray[2]+'%c𝇁𝇁%c'+bandsArray[3]+'%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: chocolate; font-size: 24px;', 'color: transparent;', 
                'color: blue; font-size: 24px;', 'color: transparent;', 
                'color: red; font-size: 24px;', 'color: transparent;', 
                'color: gray; font-size: 24px;', 'color: transparent;', 'color: black; font-size: 29px;');
  } else {
    console.log('%c⊣%c𝇁𝇁%c'+bandsArray[0]+'%c𝇁𝇁%c'+bandsArray[1]+'%c𝇁𝇁%c'+bandsArray[2]+'%c𝇁𝇁%cx'+bandsArray[3]+'%c𝇁𝇁%c'+bandsArray[4]+'%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: chocolate; font-size: 24px;', 'color: transparent;', 
                'color: blue; font-size: 24px;', 'color: transparent;', 
                'color: black; font-size: 24px;', 'color: transparent;',
                'color: chocolate; font-size: 24px;', 'color: transparent;', 
                'color: gray; font-size: 24px;', 'color: transparent;', 'color: black; font-size: 29px;');
  }
}
/* version that uses the colors from the color maps */
myResistor.logBands_unit3 = function(bandsArray){
  if( bandsArray.length === 4 ){
    console.log('%c⊣%c𝇁𝇁%c'+bandsArray[0]+'%c𝇁𝇁%c'+bandsArray[1]+'%c𝇁𝇁%cx'+bandsArray[2]+'%c𝇁𝇁%c'+bandsArray[3]+'%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: '+resValColorsMap[ bandsArray[0] ]+'; font-size: 24px;', 'color: transparent;',            // 1st digit
                'color: '+resValColorsMap[ bandsArray[1] ]+'; font-size: 24px;', 'color: transparent;',            // 2nd digit
                'color: '+resMultColorsMap[ bandsArray[2] ]+'; font-size: 24px;', 'color: transparent;',            // multiplier
                'color: gray; font-size: 24px;', 'color: transparent;', 'color: black; font-size: 29px;');
  } else {
    console.log('%c⊣%c𝇁𝇁%c'+bandsArray[0]+'%c𝇁𝇁%c'+bandsArray[1]+'%c𝇁𝇁%c'+bandsArray[2]+'%c𝇁𝇁%cx'+bandsArray[3]+'%c𝇁𝇁%c'+bandsArray[4]+'%c𝇁𝇁%c⊢',
                'color: black; font-size: 29px;', 'color: transparent;',
                'color: '+resValColorsMap[ bandsArray[0] ]+'; font-size: 24px;', 'color: transparent;',                                 // 1st digit
                'color: '+resValColorsMap[ bandsArray[1] ]+'; font-size: 24px;', 'color: transparent;',                                 // 2nd digit
                'color: '+resValColorsMap[ bandsArray[2] ]+'; font-size: 24px;', 'color: transparent;',                                 // 3rd digit
                'color: '+resMultColorsMap[ bandsArray[3] ]+'; font-size: 24px;', 'color: transparent;',                                 // multiplier 
                'color: gray; font-size: 24px;', 'color: transparent;', 'color: black; font-size: 29px;');
  }
}

/* quickly producing a comprehensive output */
/*
  usage:
  myResistor.logResistor()
  //> == [ 4 bands ] ==
  //> ⊣𝇁𝇁1𝇁𝇁0𝇁𝇁x1000𝇁𝇁t𝇁𝇁⊢
  //> ⊣𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⊢
  //> == [ 5 bands ] ==
  //> ⊣𝇁𝇁1𝇁𝇁0𝇁𝇁0𝇁𝇁x100𝇁𝇁t𝇁𝇁⊢
  //> ⊣𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⊢
  //> 10kΩ ( 10000Ω )

  myResistor.logResistor(4)
  //> == [ 4 bands ] ==
  //> ⊣𝇁𝇁1𝇁𝇁0𝇁𝇁x1000𝇁𝇁t𝇁𝇁⊢
  //> ⊣𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⊢
  //> 10kΩ ( 10000Ω )

  myResistor.logResistor(5)
  //> == [ 5 bands ] ==
  //> ⊣𝇁𝇁1𝇁𝇁0𝇁𝇁0𝇁𝇁x100𝇁𝇁t𝇁𝇁⊢
  //> ⊣𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⬛𝇁𝇁⊢
  //> 10kΩ ( 10000Ω )
*/
myResistor.logResistor = function(bands, flag){
  // if no particular band is passed, we simply display both ;)
  if( !isNaN(bands) ){
    console.log('%c== [ '+bands+' bands ] ==', 'font-size: 16px; color: grey;')
    this.logBands_unit3( this.generateBands2(bands) );
    this.logBands_block3( this.generateBands2(bands) );
  } else { // idea: ideally, displaying them side by side 'd be neat ;p
    console.log('%c== [ 4 bands ] ==', 'font-size: 16px; color: grey;')
    this.logBands_unit3( this.generateBands2(4) );
    this.logBands_block3( this.generateBands2(4) );
    console.log('%c== [ 5 bands ] ==', 'font-size: 16px; color: grey;')
    this.logBands_unit3( this.generateBands2(5) );
    this.logBands_block3( this.generateBands2(5) );
  }
  
  console.log('%c '+this.resStr+' ( '+this.resValue+'Ω )', 'font-size: 16px; color: grey;')
}



/* now, the color maps needed for the above & for future SVG generation ;P */
/* == coloring scheme == */
var resColorsMap = {
  silver: '#C0C0C0', // silver  ->   0
  gold:   '#B8860B', // gold    ->   1
  black:  '#000000', // black   ->   2
  brown:  '#A0522D', // brown   ->   3
  red:    '#FF0000', // red     ->   4
  orange: '#FF8C00', // orange  ->   5
  yellow: '#FFD700', // yellow  ->   6
  green:  '#008000', // green   ->   7
  blue:   '#0000CD', // blue    ->   8
  purple: '#800080', // purple  ->   9
  gray:   '#808080', // gray    ->  10
  white:  '#F8F8FF', // white   ->  11 
}
/* == values == */
var resValColorsMap = [
  resColorsMap.black,     // black   ->  0
  resColorsMap.brown, // brown   ->  1
  resColorsMap.red,       // red     ->  2
  resColorsMap.orange,    // orange  ->  3
  resColorsMap.yellow,    // yellow  ->  4
  resColorsMap.green,     // green   ->  5
  resColorsMap.blue,      // blue    ->  6
  resColorsMap.purple,    // purple  ->  7
  resColorsMap.gray,      // gray    ->  8
  resColorsMap.white,     // white   ->  9
];
/* == multiplier == */
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
}
/* == tolerance == */
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


/* quick test fcn to debug all the above - could also lead to some nice print of all the resistors generated in the javascript console ;P */
// one by one ? nope !
function testRes(val){
  console.log('%c== [ RESISTOR: '+val+' ] ==', 'font-size: 16px; color: grey;')
  myResistor.resValue = val; myResistor.resStr = ''+val;
  myResistor.logResistor()
  console.log('\r\n\r\n')
}
// loop over our resistorsStack ;P
resistorsStack.forEach(function(resistor){
  console.log('%c== [ RESISTOR: '+resistor.resStr+' ( '+resistor.resValue+'Ω ) ] ==', 'font-size: 16px; color: grey;')
  myResistor.resValue = resistor.resValue; myResistor.resStr = resistor.resStr;
  myResistor.logResistor()
  console.log('\r\n\r\n')
});

/* finding a hackety way of getting my colored console.log() outputs out of that browser .. */
/*
Solution ?
-> use xdotool to loop <n> times, & while looping:
  - "type" some javascript + Enter key to call the below javascript function
  - take a screenshot of a part of the screen, always the same

  In bash:
  sleep 5; for i in {0..24}; do 
    echo "${i}: calling js ..";
    #xdotool type "updateStack()"; sleep 1; xdotool key Return; # either prevented or faulty keyboard map trouble of mine ( .. ), anyway ..
    xdotool type "hackyUpdate"; sleep 1; xdotool key Return;
    sleep 2; 
    echo "${i} takin screenshot ..";
    #sudo import -window root -crop 510x300+13+1304 -delay 200 "screenshot$i.png" # using Window ID to prevent weird behavior ( call 'xwininfo -display :0' & then click the desired window to get some props )
    sudo import -window "0x4400168" -crop 510x254+13+115 -delay 200 "screenshot$i.png";
    sleep 3;
  done;

  ## quicker / final version of the above
  extractFromChromeJsConsole(){
    sleep 5; for i in {0..24}; do echo "${i}: calling js .."; xdotool type "hackyUpdate"; xdotool key Return; sleep 1; echo "${i} takin screenshot .."; import -window "0x4400168" -crop 510x254+13+115 -delay 200 "screenshot$i.png"; sleep 1; done;
    sleep 3
    montage ./*.png -tile x5 -geometry +70+70 ./montage.png
  }

  Once this is done, we can gently make a mosaic of our fresh colored logs
  In bash:
  montage ./* -tile x5 -geometry +0+0 ./montage.png
  Now, while the above is the bare minimum to get a correct image quality, we can do some little layout improvements, & I like the following one for its clarity
  montage ./* -tile x5 -geometry +70+70 ./montage.png

  also R: the following could have been handy if the wheel scroll wasn't some lamely configurable .. :/
          - scrollwheel down, 7 times: sleep 3; xdotool click --repeat 7 5
          - scrollwheel up, 3 times: sleep 3; xdotool click --repeat 3 4
          the following command was used to make a screencast: ffmpeg -video_size 1920x1080 -framerate 30 -f x11grab -i :0.0+0,0 output.mp4
*/
/*
resistorsStack.forEach(function(resistor){
  console.log('%c== [ RESISTOR: '+val+' ] ==', 'font-size: 16px; color: grey;')
  myResistor.resValue = resistor.resValue; myResistor.resStr = resistor.resStr;
  myResistor.logResistor()
  console.log('\r\n\r\n')
});
*/
var cntr = resistorsStack.length;
var idx = 0;
function updateStack(){
  if(idx < cntr){
    console.clear();
    
    myResistor.resValue = resistorsStack[idx].resValue; myResistor.resStr = resistorsStack[idx].resStr;
    myResistor.logResistor()
    ++idx;
  } else {
    console.log('done !')
  }
}
/* 
  R: also, since it seems everytime we write a ')' to the javascript console from xdotool
     we get a '°' in return, the following allows us to call functions withouth suffixing '()' to them ;P
*/
var hackyUpdate = function(){}
hackyUpdate.toString = updateStack;
// now, we can type 'hackyUpdate' & hit Enter/Return, & it'll run the function ;D


/* 
  Now everything seems +/- fine with the generative algorithm ( although it's still quite big & could be optimized, while still keeping its clarity ) ..

  .. yet I wanna improve the output "montage" of resistor tiles while keeping my console.log fcns the same ..

  .. without overriding the original console obj neither its log function ( from the following article, there still seems to be a bug in chrome with it ..) ..

  .. enter my littl' "hacky clojure trick" ;p

  var consoleLog = function(theMessage){
    var console = {};
    console.log = function(message){
      window.console.log('message for enclosed console obj: ' + message); // HERE, the replacement for the 'console.log()' calls
    }
    console.log(theMessage);
    // HERE, any function already written than uses 'console.log()'
  };

  .. and only 10 seconds after writing the above, it seems that 'var _console = console' indeed works to keep the original object available :/ !
  .. I guess an update has been done / or the dudes used ( .. )

  So!

  var _console = console
  var console = {}  
  console.messages = []
  console.args = []
  console.log = function(message){
    var args = Array.prototype.slice.call(arguments, 1);
    this.messages.push( message );
    this.args = this.args.concat( args );// wtf not working ?
    // debug
    _console.log( 'message: ' + message + '\r\nargs[]:', args)
    _console.log( 'console.messages[]: ' + '\r\n-> ' + this.messages.join('\r\n-> ') + '\r\nconsole.args[]:' + '\r\n-> ' + this.args.join('\r\n-> ') )
  }
  console.clearMessages = function(){
    console.args = [];
    console.messages = [];
  }
  console.displayLog = function(separator, separatorStyle){
    var theSep = separator || '\r\n'
    var theSeparatorStyle = separatorStyle || 'color: purple'
    if(theSep === '\r\n') _console.log.apply( _console, Array(this.messages.join( theSep ) ).concat( this.args ) )
    else {
      var ruleIdx=0
      for(var i=0; i < console.messages.length; i++){
        var currRuleIdx = ruleIdx;
        ruleIdx += console.messages[i].split('%c').length-1;
        _console.log('currRuleIdx: ' + currRuleIdx + ' ruleIdx: ' + ruleIdx)
        if ( i < console.messages.length-1 ){
          console.args.splice(ruleIdx, 0, theSeparatorStyle, 'color: black');
          ruleIdx += 2;
        }
      }
      _console.log.apply( _console, Array(this.messages.join( '%c'+theSep+'%c' ) ).concat( this.args ) )
    }
    this.clearMessages();
  }

  

  Usage:
    console.log('premier message')
    console.log('%csecond %cmessage', 'color: red', 'color: blue')
    console.log('%ctroisieme %cmessage', 'color: yellow', 'color: green')
    console.log('quatrieme message')
    console.log('%ccinquieme message', 'color: orange')

    // display as the original console.log would have, but without any gray lines in between the lines logged
    console.displayLog()
    // or
    console.displayLog('')

    // display with a space in between instead of a new line
    console.displayLog(' ')

    // display with more new lines than the default ( a line per log )
    console.displayLog('\r\n\r\n')

    // display with a custom separator
    console.displayLog(' ==> ')

    // display with a custom separator & a custom style for it
    console.displayLog('\r\n       |\r\n', 'color: gray' )
*/
