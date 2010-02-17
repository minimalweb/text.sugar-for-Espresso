// Duplicates the current line

var textContext = require('text_action_context').textContext;
var TextRecipe = require('text_recipe').TextRecipe;
var Range = require('range').Range;

// exports.main is your primary function, run automatically by Spice
exports.main = function() {
	// save the current cursor position for later
	var currentpos = textContext.getFirstSelection().location;
	// Grab the range of the current line
	var linerange = textContext.rangeForLine();
	// copy the line to duplicate
	var linecontent = linerange.string();
	// duplicate line
	if (new TextRecipe().replace(linecontent+linecontent,linerange).apply()) {
		// reset cursor positon
		textContext.setSelection(new Range(currentpos, 0));
		return true;
	} else {
		return false;
	}
}