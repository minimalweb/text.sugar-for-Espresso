// Duplicates the current line

var textContext = require('text_action_context').textContext;
var TextRecipe = require('text_recipe').TextRecipe;
var Range = require('range').Range;

// exports.main is your primary function, run automatically by Spice
exports.main = function() {
	// save the current cursor position for later
	var currentSelection = textContext.getFirstSelection();
	var currentPos = currentSelection.limit;
	// check if nothing is selected
	if(currentSelection.length == 0) {
		var currentSelection = textContext.rangeForLine();
	}
	// copy the string to duplicate
	var selectionContent = currentSelection.string();
	// duplicate line
	if (new TextRecipe().replace(selectionContent+selectionContent,currentSelection).apply()) {
		// reset cursor positon
		textContext.setSelection(new Range(currentPos, 0));
		return true;
	} else {
		return false;
	}
}