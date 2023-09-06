// Mongo DB setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// Import constants
const { DB_NAME, RE_COLL } = require("../utilities/constants");


const getRecipes = async (req, res) => {
    // Extract userId from params
    const { userId } = req.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Find all recipes associated to the user in the database 
        const recipesResult = await db.collection(RE_COLL).findOne({ _id: userId }, { projection: { _id: 0, recipes: 1 } })

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

        // Find the specified recipe tied to the user 
        const singleRecipeResult = await db.collection(RE_COLL).aggregate([
            { $match: { _id: userId } },
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

        // Construct variables for the aggregation pipeline stages 
        const matchQuery = {
            $match: {
                _id: userId
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

        // Construct match query for the aggregation pipeline 
        const matchQuery = {
            $match: {
                _id: userId 
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
        // Find the specified recipe tied to the user 
        // Return every recipe in the recipes array that has a category matching the category provided in the req.params
        // -------------------------------------------------------------------------------------------------------------- //
        const recipesByCategoryResult = await db.collection(RE_COLL).aggregate([
            { $match: { _id: userId } },
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

module.exports = {
    getRecipes,
    getSingleRecipe,
    searchRecipes,
    getCategories,
    getRecipesByCategory,
}