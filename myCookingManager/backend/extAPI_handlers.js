const { SPOON_KEY } = process.env;
require("dotenv").config();

const fetch = require("node-fetch")

const createShoppingList = async (req, res) => {

    const { ingredientList } = req.body;
    console.log(ingredientList, "this is ingredient list")

    const requestBody = {
        ingredientList: ingredientList,
        servings: 1,
        includeNutrition: false
    }

    const searchParams = new URLSearchParams(requestBody)
    const parsingQuery = searchParams.toString();
    console.log(parsingQuery, "parsing query")

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${SPOON_KEY}`, {
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: parsingQuery
        })
        console.log(response.headers, "these are the headers")
        const data = await response.json()
        console.log(data, "this is parsed body")
        if (data.length > 0) {
            return res.status(200).json({status: 200, message: "Succes", data: data})
        }
    }

    catch (err) {
        console.log("Error:", err)
    }
}

module.exports = {
    createShoppingList
}