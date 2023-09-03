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

const createNewUser = async (req, res) => {
    // Extract the info from the req.body
    const { userId } = req.body
    console.log(userId)

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Check if a document with an _id matching the userId exists in the database
        const matchResult = await db.collection(RE_COLL).findOne({ _id: userId })
        console.log(matchResult, "db response")
        // If the document exists, return a 200 with no data to notify FE
        if (matchResult) {
            return res.status(200).json({ status: 200, message: "Welcome back, user!" })
        }
        // If no document exists, create a new document in the database with userId as _id
        else {
            const newDocument = {
                _id: userId,
                recipes: []
            }
            const createUserResult = await db.collection(RE_COLL).insertOne(newDocument)
            console.log(createUserResult, "this is db answer")
            // If the database answers with the same insertedId we sent, send a 201 to the FE.
            if (createUserResult.insertedId === userId) {
                return res.status(201).json({ status: 201, message: "Nice to meet you, user!" })
            }
            // Else, send a 400 to notify FE of a problem.
            else {
                return res.status(400).json({ status: 400, userId, message: "The provided info didn't allow for a proper update of the resource." })
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
    updateRecipeField,
    insertRecipe,
    createNewUser,
}