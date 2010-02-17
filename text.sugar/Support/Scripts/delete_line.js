// Deletes the current line

// require() allows you easy modular access to Spice's helper classes
var textContext = require('text_action_context').textContext;
var TextRecipe = require('text_recipe').TextRecipe;
var Range = require('range').Range;

// exports.main is your primary function, run automatically by Spice
exports.main = function() {
    // Grab the range of the current line
    var linerange = textContext.rangeForLine();
    // If on the last line of the doc, remove the line break prior to the line
    // This isn't strictly necessary, but it's nice to have
    if (textContext.lineNumber() != 1 && textContext.rangeForLine(textContext.lineNumber() + 1) === false) {
        linerange = new Range(linerange.location - 1, linerange.length + 1);
    }
    // Run the actual removal
    return new TextRecipe().remove(linerange).apply();
}