/*
  may I be willing to rewrite the quick-log fcns, the following hack accept the
  browser syntax to apply styling to the output
*/

Myconsolelog = function(messageStr){
  var args = Array.prototype.slice.call(arguments, 1);
  for(var i=0; i < args.length; i++){
    var nodeStyle = '';
    //args[i].indexOf('color:') > -1 ? nodeStyle += args[i].substr(args[i].indexOf('color:')+7, args[i].indexOf(';')+1 ) : '';
    //args[i].indexOf('background:') > -1 ? nodeStyle += args[i].substr(args[i].indexOf('background:')+12, args[i].indexOf(';')+1 ) : '';
    var styleArgs = args[i].split(';');
    for(var j=0; j < styleArgs.length; j++){
      console.log('j: ' + ' data: ' + styleArgs[j])
      var styleArg = styleArgs[j];
      styleArg[0] === ' ' ? styleArg = styleArg.substr(1) : '';
      console.log('j: ' + ' data: ' + styleArg)
      if(styleArg){
        styleArg.indexOf('color:') > -1 ? nodeStyle += styleArg.substr(styleArg.indexOf('color:')+7) : ''; // TODO: replace by call to helper fcn that translates the color passed ( #XXXXXX ) to a nodejs format ( \x1b[XXm ) 
        styleArg.indexOf('background:') > -1 ? nodeStyle += styleArg.substr(styleArg.indexOf('background:')+12 ) : ''; // TODO: same as above ( R/Nb: '\e[33m' & '\x1b' both works using 'echo -e ' in teminal )
      }
    }
    messageStr = messageStr.replace('%c', nodeStyle)
    //messageStr = messageStr.replace('%c', 'LOL')
  }
  //_console.log(messageStr)
  console.log(messageStr)
}

/* == R: coloring scheme to find a match in terminal ANSI colors ==*/
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
