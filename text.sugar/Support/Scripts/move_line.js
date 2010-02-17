// move_line
// Moves the current line up or down

// require() allows you easy modular access to Spice's helper classes
// These particular modules are documented here:
//    http://onecrayon.com/spice/docs/text_action_context-js/
//    http://onecrayon.com/spice/docs/text_recipe-js/
var textContext = require('text_action_context').textContext;
var TextRecipe = require('text_recipe').TextRecipe;

// exports.main is your primary function
// You could do without a function, but you couldn't return false to have Espresso beep
exports.main = function(direction) {
    // Make sure that there's a direction parameter passed
    if (!$chk(direction)) {
        log('move_line requires a single string parameter ("up" or "down" are valid)');
        return false;
    }
    // Grab our current and target line numbers
    var current = textContext.lineNumber();
    var target;
    if (direction.toLowerCase() == 'up')
        target = current - 1;
    else
        target = current + 1;
    // Grab the ranges for the current and target line numbers
    current = textContext.rangeForLine(current);
    next = textContext.rangeForLine(target);
    // Make sure the target line is inside document bounds
    if (next !== false) {
        // Create a new text recipe
        var recipe = new TextRecipe();
        
        // Swap linebreaks to make sure that things work at the doc's end
        var currentText = current.string();
        var curBreak = currentText.replace(/^.*([\n\r]*)$/, '$1');
        var nextText = next.string();
        var nextBreak = nextText.replace(/^.*([\n\r]*)$/, '$1');
        currentText = currentText.replace(/^(.*)[\n\r]*$/, '$1' + nextBreak);
        nextText = nextText.replace(/^(.*)[\n\r]*$/, '$1' + curBreak);
        
        // For some reason the order you specify the replacements matters; not sure why
        if (direction.toLowerCase() == 'up')
            recipe.replace(currentText, next).replace(nextText, current).apply();
        else
            recipe.replace(nextText, current).replace(currentText, next).apply();
        // Now that the line's moved, select it
        textContext.setSelection(textContext.rangeForLine(target));
        return true;
    } else {
        return false;
    }
} 