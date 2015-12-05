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
  silver: '#C0C0C0', // \e[38;5;7m
  gold:   '#B8860B', // \e[38;5;3m
  black:  '#000000', // \e[38;5;16m
  brown:  '#A0522D', // \e[38;5;95m
  red:    '#FF0000', // \e[38;5;1m
  orange: '#FF8C00', // \e[38;5;166m
  yellow: '#FFD700', // \e[38;5;11m
  green:  '#008000', // \e[38;5;2m
  blue:   '#0000CD', // \e[38;5;20m
  purple: '#800080', // \e[38;5;54m
  gray:   '#808080', // \e[38;5;59m
  white:  '#F8F8FF', // \e[38;5;255m
};

var termColorsMap = {
  resColorsMap.silver: ['\x1b[38;5;7m', '\x1b[48;5;7m'],     // #C0C0C0
  resColorsMap.gold:   ['\x1b[38;5;3m', '\x1b[48;5;3m'],     // #B8860B
  resColorsMap.black:  ['\x1b[38;5;16m', '\x1b[48;5;16m'],   // #000000
  resColorsMap.brown:  ['\x1b[38;5;95m', '\x1b[48;5;95m'],   // #A0522D
  resColorsMap.red:    ['\x1b[38;5;1m', '\x1b[48;5;1m'],     // #FF0000
  resColorsMap.orange: ['\x1b[38;5;166m', '\x1b[48;5;166m'], // #FF8C00
  resColorsMap.yellow: ['\x1b[38;5;11m', '\x1b[48;5;11m'],   // #FFD700
  resColorsMap.green:  ['\x1b[38;5;2m', '\x1b[48;5;2m'],     // #008000
  resColorsMap.blue:   ['\x1b[38;5;20m', '\x1b[48;5;20m'],   // #0000CD
  resColorsMap.purple: ['\x1b[38;5;54m', '\x1b[48;5;54m'],   // #800080
  resColorsMap.gray:   ['\x1b[38;5;59m', '\x1b[48;5;59m'],   // #808080
  resColorsMap.white:  ['\x1b[38;5;255m', '\x1b[48;5;255m'], // #F8F8FF
};
// quick helper fcn to get a corresponding ansi color from hex one, or none if not found
function termColor(hexColor){
  Object.keys( termColorsMap ).forEach(function(index){
    if(hexColor === index) return index
  })
  return ''
}

/* R: I have to find a way to deduce available(s)/nearest corresponding colors */
//visually listing the above colors
Object.keys( resColorsMap ).forEach(function(index){
  console.log('index: ' + index + '\t' + resColorsMap[index] + '\t%c⬛⬛⬛⬛⬛⬛', 'color: ' + resColorsMap[index] + ';')
})
// getting the foreground colors available in my term'
for code in {0..255}; do echo -e "\e[38;5;${code}m"'\\e[38;5;'"$code"m"\e[0m"; done
// getting thr abckground colors available in my term'
for code in {0..255}; do echo -e "\e[48;5;${code}m"'\\e[48;5;'"$code"m"\e[0m"; done
