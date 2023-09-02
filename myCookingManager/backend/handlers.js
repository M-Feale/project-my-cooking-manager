// Mongo DB setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// Import constants
const { DB_NAME, RE_COLL } = require("./constants");


const getRecipes = async (req, res) => {
    // Extract userId from params
    const { userId } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Find all recipes associated to the user in the database (userId is multiplied by 1 to convert it from a string to a number)
        const recipesResult = await db.collection(RE_COLL).findOne({ _id: userId * 1 }, { projection: { _id: 0, recipes: 1 } })

        // Return success when results exist. If not return 404
        if (recipesResult && Object.keys(recipesResult).length > 0) {
            return res.status(200).json({ status: 200, message: "Success", data: recipesResult.recipes })
        } else {
            return res.status(404).json({ status: 404, userId, message: "The provided userId didn't point to any data." })
        }
    }

    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

const getSingleRecipe = async (req, res) => {
    // Extract userId and recipeId from the params
    const { userId, recipeId } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Find the specified recipe tied to the user (userId is multiplied by 1 to convert it from a string to a number)
        const singleRecipeResult = await db.collection(RE_COLL).aggregate([
            { $match: { _id: userId * 1 } },
            { $project: { recipes: { $filter: { input: "$recipes", as: "recipe", cond: { $eq: ["$$recipe.recipeId", recipeId] }, limit: 1 } } } }
        ]).toArray()

        // Return success when results exist. If not return 404
        if (singleRecipeResult[0]?.recipes.length > 0) {
            return res.status(200).json({ status: 200, message: "Success", data: singleRecipeResult[0].recipes[0] })
        } else {
            return res.status(404).json({ status: 404, userId, recipeId, message: "The provided userId or recipeId didn't point to any data." })
        }
    }

    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

const searchRecipes = async (req, res) => {
    // Extract userId and recipeId from the params
    const { userId, searchTerms } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Construct variables for the aggregation pipeline stages (userId is multiplied by 1 to convert it from a string to a number)
        const matchQuery = {
            $match: {
                _id: userId * 1
            }
        }
        // ----------------------------------------------------------------------------------------------- //
        // This projection returns all array objects (individual recipe object) that contain the provided 
        // (case-insensitive) searchTerms in the name, category or website field.
        // ----------------------------------------------------------------------------------------------- //
        const projection = {
            $project: { recipes: { $filter: { input: "$recipes", as: "recipe", cond: { $or: [{ $regexMatch: { input: "$$recipe.name", regex: searchTerms, options: "i" } }, { $regexMatch: { input: "$$recipe.website", regex: searchTerms, options: "i" } }, { $regexMatch: { input: "$$recipe.category", regex: searchTerms, options: "i" } }] } } } }
        }

        // Look for the document that matches the userId and filter the recipes array to only contain the recipes that match the projection.
        const searchTermsResult = await db.collection(RE_COLL).aggregate([matchQuery, projection]).toArray();

        // ----------------------------------------------------------------------------------------------- //
        // If the recipes array in the document contains a recipe object, send back the array of recipes. 
        // If not, send 204 and let FE create an error message for an unsuccessful searchTerm
        // ----------------------------------------------------------------------------------------------- //
        if (searchTermsResult[0]?.recipes.length > 0) {
            return res.status(200).json({ status: 200, message: "Success!", data: searchTermsResult[0].recipes })
        } else {
            return res.status(204).json({ status: 204 })
        }
    }

    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

const getCategories = async (req, res) => {
    // Extract userId and recipeId from the params
    const { userId } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Construct match query for the aggregation pipeline (userId is multiplied by 1 to convert it from a string to a number)
        const matchQuery = {
            $match: {
                _id: userId * 1
            }
        }
        // ---------------------------------------------------------------------------------------------------- //
        // Find the specific document that matches the userId, separate every object in the array into a 
        // single document and group every single document under an _id corresponding to the "recipes.category" 
        // value. Because each _id is unique, this creates a document for every *distinct* category. This 
        // aggregation pipeline then returns an array of objects with an _id key and a value matching the distinct 
        // categories. 
        // ---------------------------------------------------------------------------------------------------- //
        const distinctCategoriesResult = await db.collection(RE_COLL).aggregate([matchQuery,
            { $unwind: "$recipes" }, { $group: { _id: "$recipes.category" } }]).toArray()

        // ----------------------------------------------------------------------------------------------- //
        // Map through the array to return only an array of category strings instead of an array of objects 
        // with _id key and a value corresponding to the category string.
        // ----------------------------------------------------------------------------------------------- //
        const categories = distinctCategoriesResult.map((category) => {
            return category._id
        })

        // Return the array of categories, can be empty if the user has no recipe in their Recipe Collection.
        return res.status(200).json({ status: 200, message: "Success", data: categories })
    }

    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

const getRecipesByCategory = async (req, res) => {
    // Extract userId and recipeId from the params
    const { userId, category } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // -------------------------------------------------------------------------------------------------------------- //
        // Find the specified recipe tied to the user (userId is multiplied by 1 to convert it from a string to a number)
        // Return every recipe in the recipes array that has a category matching the category provided in the req.params
        // -------------------------------------------------------------------------------------------------------------- //
        const recipesByCategoryResult = await db.collection(RE_COLL).aggregate([
            { $match: { _id: userId * 1 } },
            { $project: { recipes: { $filter: { input: "$recipes", as: "recipe", cond: { $eq: ["$$recipe.category", category] } } } } }
        ]).toArray();

        // ------------------------------------------------------------------------------------------------------------------ //
        // Return the recipes array if the database matched with any userId (can be an empty array if the user has no recipes). 
        // If not, return a 404 for the userId
        // ------------------------------------------------------------------------------------------------------------------ //
        if (recipesByCategoryResult.length > 0) {
            return res.status(200).json({ status: 200, message: "Success", data: recipesByCategoryResult[0].recipes })
        }
        else {
            return res.status(404).json({ status: 404, userId, category, message: "The provided userId didn't point to any user in the database" })
        }

    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

const updateRecipeField = async (req, res) => {
    // Extract userId and recipeId from the req.params
    const { userId, recipeId } = req.params;

    // Extract the new field information from the req.body
    const { info } = req.body

    // Format the field info into the format Mongo DB requires
    let fieldName;
    fieldName = Object.keys(info)
    let fieldValue;
    fieldValue = Object.values(info)
    let matchingField = {}
    matchingField[`recipes.$.${fieldName}`] = fieldValue[0]

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Create query matching the user (multiplied by one to convert it to a number ) with the document and the specific recipe in the recipes array
        const updateQuery = {
            _id: userId * 1, "recipes.recipeId": recipeId
        }

        // // Specify update transaction
        const updateTransaction = {
            $set: matchingField
        }

        // Update the shopping_list field of the recipe matching the recipeId
        const updateRecipeFieldResult = await db.collection(RE_COLL).updateOne(updateQuery, updateTransaction)

        // If the field was found and updated (or not), send a success message to the FE. Else, send a 400 to notify FE of a problem.
        if (updateRecipeFieldResult.matchedCount && (updateRecipeFieldResult.modifiedCount || !updateRecipeFieldResult.modifiedCount)) {
            return res.status(200).json({ status: 200, message: "Success!" })
        } else {
            return res.status(400).json({ status: 400, userId, recipeId, message: "The provided info didn't allow for a proper update of the resource." })
        }
    }

    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

const insertRecipe = async (req, res) => {
    // Extract userId from the params
    const { userId } = req.params;

    // Extract the recipe info from the PUT body
    const { newRecipe } = req.body

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Create variables to make database interaction cleaneré
        const match = { $match: { _id: userId * 1 } }
        // We're filtering our recipes array to only contain a recipe matching the information given by the grabity link preview.
        const projection = {
            $project: {
                recipes:
                {
                    $filter:
                    {
                        input: "$recipes", as: "recipe",
                        cond: {
                            $and: [{ $eq: ["$$recipe.website", newRecipe.website] },
                            { $eq: ["$$recipe.name", newRecipe.name] },
                            { $eq: ["$$recipe.description", newRecipe.description] },
                            { $eq: ["$$recipe.recipe_url", newRecipe.recipe_url] },
                            { $eq: ["$$recipe.image", newRecipe.image] }]
                        }
                    }
                }
            }
        }
        // --------------------------------------------------------------------------------------------------- //
        // Find if the recipe already exists in the database for that user.
        // If the aggregation pipeline returns a recipes array containing something, it means that the "new" 
        // recipe matched with an already existing recipe and we don't want to add it.
        // --------------------------------------------------------------------------------------------------- //
        const findDuplicatesResult = await db.collection(RE_COLL).aggregate([match, projection]).toArray()

        // If the recipe is found, return a 204 to allow FE to create a unsuccessful message.
        if (findDuplicatesResult[0].recipes.length > 0) {
            return res.status(204).json({ status: 204 })
        }
        else {
            // ------------------------------------------------------------------------ //
            // If it's actually new, add the missing fields to the received newRecipe
            // and update the database with the complete object.
            // ------------------------------------------------------------------------ //
            const completeRecipeObject = {
                ...newRecipe, shopping_list: [], dates_created: [], notes: [], make_again: null, ratings: [
                    { label: "Overall", rating: 0 },
                    { label: "Time Accuracy", rating: 0 },
                    { label: "Easy Cleanup", rating: 0 },
                    { label: "Taste", rating: 0 },
                ]
            }

            const insertRecipeResult = await db.collection(RE_COLL).updateOne({
                _id: userId * 1
            },
                { $push: { recipes: completeRecipeObject } })

            if (insertRecipeResult.modifiedCount) {
                return res.status(200).json({ status: 200, message: "New recipe successfully added!" })
            }
        }
    }

    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }

    finally {
        client.close();
        console.log("disconnected")
    }
}

module.exports = {
    getRecipes,
    getSingleRecipe,
    searchRecipes,
    getCategories,
    getRecipesByCategory,
    updateRecipeField,
    insertRecipe
}