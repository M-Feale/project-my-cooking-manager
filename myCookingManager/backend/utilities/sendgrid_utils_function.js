const fs = require("fs");

// -------------------------------------------------------------------------------------------- //
// This function formats the shopping list into a complete html file in the form of a string.
// The purpose of it is to comply with Send Grid API restrictions.
// The function needs a path to an html file as a string and an shopping list as an array.
// It returns an html file as a string
// -------------------------------------------------------------------------------------------- //

const ingredientListToHtml = (path, listArray) => {
    const ingredientListHtml = listArray.map((ingredient) => {
        return ` <li style="list-style-type: none;"><input id="ingredient" type="checkbox" style="width: 12px; height: 12px; position: relative; vertical-align: middle; margin-right: 10px;"/><label for="ingredient" style="font-size: 16px;">${ingredient}</label></li>`
    }).join("")

    const myHtmlString = fs.readFileSync(path, "utf-8").replace("origin", ingredientListHtml)
    return myHtmlString
}

module.exports = {
    ingredientListToHtml,
}