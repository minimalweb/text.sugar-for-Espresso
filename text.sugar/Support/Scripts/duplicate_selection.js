// Duplicates the current selection or line

// exports.main is your primary function, run automatically by Spice
action.performWithContext = function(context) {
    
	// save the current cursor position for later
    var currentSelection = context.getSelectedRanges()[0];
	var currentPos = currentSelection.limit;
    
	//var currentSelection = textContext.getFirstSelection();
	//var currentPos = currentSelection.limit;
	var lineBreak = "";
	
    //var linerange = context.lineStorage.lineRangeForIndex(range.location);
	
	// check if nothing is selected
	if(currentSelection.length == 0) {
		var currentSelection = context.lineStorage.lineRangeForIndex(currentSelection.location);
		// If it is the last line, add linebreak between original and duplicate
		if(currentSelection.rangeValue.charCodeAt(currentSelection.string().length-1) != 10) {
				lineBreak = "\n";
		}
	}
	// copy the string to duplicate
	var selectionContent = currentSelection.string();
	// duplicate line
    var duplication = new CETextRecipe();
	if (context.applyTextRecipe(duplication.addReplacementString(selectionContent+lineBreak+selectionContent,currentSelection))) {
		// reset cursor positon
		//textContext.setSelection(new Range(currentPos, 0));
		return true;
	} else {
		return false;
	}
}