const express = require("express");
const morgan = require("morgan");

const { getRecipes, getSingleRecipe, searchRecipes, getCategories, getRecipesByCategory } = require("./handlers/get_handlers");
const { updateRecipeField, insertRecipe, createNewUser } = require("./handlers/p_handlers");
const { sendShoppingListEmail } = require("./handlers/sendgrid_handlers");
const { createRecipePreview } = require("./handlers/grabity_handler");

const PORT = 4999;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
// Endpoints

// GET recipes for specified user (used in RecipeCollection for RecipeGrid)
app.get("/api/user/:userId/recipes", getRecipes)

// GET specific recipe for specified user (used for RecipeDetails)
app.get("/api/user/:userId/recipes/:recipeId", getSingleRecipe)

// GET recipes by searchTerms for specified user (used in RecipeCollection for SearchBar)
app.get("/api/user/:userId/recipes/search/:searchTerms", searchRecipes)

// ---------------------------------------------------------------------------------------------------- //
// GET distinct recipe categories for specified user (used in RecipeCollection for CategoryMenu and in 
// RecipeDetails / CataloguingPage for their respective CategorySelect components)
// ---------------------------------------------------------------------------------------------------- //
app.get("/api/user/:userId/categories", getCategories)

// GET recipes by category for specified user (used in RecipeCollection for CategoryMenu)
app.get("/api/user/:userId/categories/:category", getRecipesByCategory)

// ----------------------------------------------------------------------------------------------------------- //
// PATCH to update any field of the specified recipe for the specified user in the database (used in 
// RecipeDetailsCategorySelect, Notepad, IngredientListInput, MakeAgain, DateTracker on the RecipeDetails page)
// ----------------------------------------------------------------------------------------------------------- //
app.patch("/api/user/:userId/recipes/:recipeId/update", updateRecipeField)

// PUT a new recipe inside the user associated document in the database (used in CataloguingPage)
app.put("/api/user/:userId/recipes", insertRecipe)

// POST a new user to the database with an empty recipes array (used in Home)
app.post("/api/user", createNewUser)

// POST recipe website to retrieve preview information of the specified url
app.post("/api/user/:userId/catalogue", createRecipePreview)

// POST an email of a shopping list to the user's email address (used in IngredientListInput on RecipeDetails page)
app.post("/api/user/:userId/recipes/:recipeId/ingredient-list/email", sendShoppingListEmail)

app.listen(PORT, () => {
    console.log(`Server is up and listenening at port: ${PORT}`)
});