const express = require("express");
const morgan = require("morgan");

const { getRecipes, getSingleRecipe, insertRecipe, searchRecipes, getCategories, getRecipesByCategory } = require("./handlers");
const {createShoppingList} = require("./extAPI_handlers")

const PORT = 4999;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
// Endpoints

// Test endpoint
app.get("/api", (req, res) => {
    res.status(200).json({ message: "Server is working!!!" })
});

// GET recipes for specified user (used in RecipeCollection for RecipeGrid)
app.get("/api/user/:userId/recipes", getRecipes)

// GET specific recipe for specified user (used for RecipeDetails)
app.get("/api/user/:userId/recipes/:recipeId", getSingleRecipe)

// GET recipes by searchTerms for specified user (used in RecipeCollection for SearchBar)
app.get("/api/user/:userId/recipes/search/:searchTerms", searchRecipes)

// GET distinct recipe categories for specified user (used in RecipeCollection for CategoryMenu)
app.get("/api/user/:userId/categories", getCategories)

// GET recipes by category for specified user (used in RecipeCollection for CategoryMenu)
app.get("/api/user/:userId/categories/:category", getRecipesByCategory)

app.get("/api/recipeList", createShoppingList)

// Temporary PUT, will need to be modified /// the way it works now, the FE will have to generate the random numbers for the recipeId
// app.put("/api/user/:userId/recipes/:recipeId", insertRecipe)


app.listen(PORT, () => {
    console.log(`Server is up and listenening at port: ${PORT}`)
});