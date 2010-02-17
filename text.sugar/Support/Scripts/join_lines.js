// Join the current with the following line

var textContext = require('text_action_context').textContext;
var TextRecipe = require('text_recipe').TextRecipe;
var Range = require('range').Range;

// exports.main is your primary function, run automatically by Spice
exports.main = function() {
	// save the current cursor position for later
	var currentpos = textContext.getFirstSelection().location;
	// Find end of line
	var endofline = (textContext.rangeForLine().limit)-1;
	// Remove all whitespace
	while(((new Range(endofline,1)).string().search(/\s/)) != -1) {
		new TextRecipe().remove(new Range(endofline,1)).apply();
	}
	// reset cursor position
	textContext.setSelection(new Range(endofline, 0));
	return true;
}