# circuits-calculator
WIP POC of a circuit-calculation tool to work with 123DCircuits schematics's SVGs

The goal is to be able to easily create a schematic in 123DCircuits, set specific "patterns" for the dynamic parts of it ( read: the ones that 'll be updated by the calculations ) & then "export" it ( generate a modded SVG + a .json file ) for usage in circuits-calculator.  
Then, the json can be edited to specify which formula(s) to apply, & some infos about the name of the circuit, links, help [ & maybe an icon ? ^^ ] ( the fields are to be auto-generated from the said "specific patterns" ).  
A collection of circuits can be added, just by clicking the 'Add' button on the left pane: it 'll popup a prompt asking for a repo ( url[/path] ) that should host the said SVG & related json.
Once the circuit has been added ( or after editing it's json ), the list is refreshed to reflect the changes, and so does the right side view ( displaying the schematic & the fields / infos stuff ).  

Depending on how the js plugin used for zooming & panning the SVG works ( this one's not dev in-house .. not YET ? ;p ), it may be also usable on tablets ( my original goal, to be explicit: find a way to mimick the very handy "Adafruit Circuit Playground Circuit Calculators", & be able to use localStorage & web techs to do so* ).  

*no need for App store registration, installation done via "add to home screen" in Safari
 using localStorage means being able to save stuff from remote repos locally
 a cache file could as well be updated/editable to need no wifi connection while still being able to add/remove stuff easily
 ( .. )

=> I KNOW THE FORMULA DOESN'T CORRESPOND TO THE ONE ABOVE ! ^^
==> it's just a quick way to test "AsciiMath" lib to format some stuff in a Mathy way ( .. )

/!\ / Nb: some of the graphics used are property of 123DCircuits & may be removed if told to do so* ( .. )
*I'll mail them in few hours as well as others when the POC advances more, to see what can be done & by who* :)
** for the "how", I already got a pretty good idea ;P


REMINDER: 
local: Documents/interactiveSchematicSVG/circuitsCalculator_roughPOC.html  
hosted: [Github preview](http://htmlpreview.github.io/?https://raw.githubusercontent.com/stephaneAG/circuits-calculator/master/circuitsCalculator_roughPOC.html)


Early screenshots:
<img src="http://www.stephaneadamgarnier.com/circuitsCalculator/circuits-calculator_screen1.png" align="" height="" width="" >
<img src="http://www.stephaneadamgarnier.com/circuitsCalculator/circuits-calculator_screen2.png" align="" height="" width="" >
