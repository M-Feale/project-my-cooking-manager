const fs = require("fs");
const path = require("path")

// -------------------------------------------------------------------------------------------- //
// This function formats the shopping list into a complete html file in the form of a string.
// The purpose of it is to comply with Send Grid API restrictions until the resource is
// further explored and understood.
// The function needs a path to an html file as a string and an shopping list as an array.
// It returns an html file as a string.
// -------------------------------------------------------------------------------------------- //

const ingredientListToHtml = (filePath, listArray) => {
    const ingredientListHtml = listArray.map((ingredient) => {
        return ` <li style="list-style-type: none;"><input id="ingredient" type="checkbox" style="width: 12px; height: 12px; position: relative; top: 1px; margin-right: 10px;"/><label for="ingredient" style="font-size: 16px;">${ingredient}</label></li>`
    }).join("")

    const myHtmlString = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8").replace("origin", ingredientListHtml)
    return myHtmlString
}

module.exports = {
    ingredientListToHtml,
}