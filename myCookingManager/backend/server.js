const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const { getRecipes, getSingleRecipe, insertRecipe, searchRecipes, getCategories, getRecipesByCategory } = require("./handlers");

const PORT = 4999;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
// Endpoints

// Test endpoint
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is working!!!" })
});

// GET recipes for specified user (used in RecipeCollection for RecipeGrid)
app.get("/user/:userId/recipes", getRecipes)

// GET specific recipe for specified user (used for RecipeDetails)
app.get("/user/:userId/recipes/:recipeId", getSingleRecipe)

// GET recipes by searchTerms for specified user (used in RecipeCollection for SearchBar)
app.get("/user/:userId/recipes/search/:searchTerms", searchRecipes)

// GET distinct recipe categories for specified user (used in RecipeCollection for CategoryMenu)
app.get("/user/:userId/categories", getCategories)

// GET recipes by category for specified user (used in RecipeCollection for CategoryMenu)
app.get("/user/:userId/categories/:category", getRecipesByCategory)



// Temporary PUT, will need to be modified /// the way it works now, the FE will have to generate the random numbers for the recipeId
// app.put("/user/:userId/recipes/:recipeId", insertRecipe)


app.listen(PORT, () => {
    console.log(`Server is up and listenening at port: ${PORT}`)
});