// Mongo DB setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// Import database constants
const { DB_NAME, RE_COLL } = require("./constants");

// Send Grid setup
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Import Send Grid utilities
const { ingredientListToHtml } = require("./sendgrid_utils_function")

const sendShoppingListEmail = async (req, res) => {
    // Extract userId and recipeId from the req.params
    const { userId, recipeId } = req.params;

    // Extract email and shopping list from the body
    const { email, shoppingList } = req.body;

    // Create Mongo Client to connect to the database
    const client = new MongoClient(MONGO_URI, options);
    try {
        // Retrieve the recipe name associated with the provided recipeId in Mongo DB
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("connected");

        // Find the specified recipe tied to the user and extract the recipe name
        const specificRecipeResult = await db.collection(RE_COLL).aggregate([
            { $match: { _id: userId * 1 } },
            { $project: { recipes: { $filter: { input: "$recipes", as: "recipe", cond: { $eq: ["$$recipe.recipeId", recipeId] }, limit: 1 } } } }
        ]).toArray();
        const recipeName = specificRecipeResult[0].recipes[0].name

        // Transform the shopping list into the right format for the API
        const emailHtmlBody = ingredientListToHtml("./html_email_list.html", shoppingList)

        // Format the email message as per the API documentation
        const msg = {
            to: `${email}`,
            from: {
                email: 'mycookingmanager@gmail.com',
                name: 'My Cooking Manager'
            },
            subject: `Your shopping list for ${recipeName} is here!`, // Incorporate string interpolation here
            html: emailHtmlBody
        }

        // Send the email
        const emailExpeditionResult = await sgMail.send(msg)
        // If the Send Grid API answer is successful, sent a success message. If not, send 204 and let FE create an error message for an unsuccessful email expedition.
        if (emailExpeditionResult[0].statusCode === 202) {
            return res.status(200).json({ status: 200, email, message: "Your shopping list was successfully sent to the email associated with your My Cooking Manage account" })
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

module.exports = {
    sendShoppingListEmail,
}