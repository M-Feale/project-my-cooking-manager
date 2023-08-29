const { SPOON_KEY } = process.env;
require("dotenv").config();

const fetch = require("node-fetch")


    const requestBody = {
        ingredientList: '1 cup potato, chopped\n1 tsp parsley, minced\n230 grams cheese, grated',
        servings: 1,
        includeNutrition: false
    }

    const searchParams = new URLSearchParams(requestBody)

    // console.log(searchParams.toString(), "this is url searParams")
    const parsingQuery = searchParams.toString();
    console.log(parsingQuery, "parsing query")

const createShoppingList = async (req, res) => {

    try {
        // const response = await fetch(`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${SPOON_KEY}`, {
        //     method: "POST",
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: parsingQuery
        // })
        // console.log(response.headers, "these are the headers")
        // const data = await response.json()
        // console.log(data, "this is parsed body")
    }

    catch (err) {
        console.log("Error:", err)
    }
}

module.exports = {
    createShoppingList
}