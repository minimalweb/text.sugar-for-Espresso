// Deletes the current line

action.performWithContext = function(context) {

    // Grab the range of the current line
    var range = context.getSelectedRanges()[0];
    var linerange = context.lineStorage.lineRangeForIndex(range.location);

    // Run the actual removal
    var insertions = new CETextRecipe();
    insertions.addReplacementString('',linerange);
    var returnVal = context.applyTextRecipe(insertions);
    return returnVal;
}