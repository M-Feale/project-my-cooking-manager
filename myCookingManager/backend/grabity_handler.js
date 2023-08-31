// Import grabity library
let grabity = require("grabity");

// uuid package requirements
const { v4: uuidv4 } = require("uuid");

// This handler returns the recipe preview provided by the grabity library
const createRecipePreview = async (req, res) => {
    // Extract the url sent through the req.params
    const { recipe_url } = req.body

    // Create a random number for the recipeId
    const recipeId = uuidv4();

    try {
        // Save the result from the method to a variable
        const previewResult = await grabity.grab(recipe_url);
        console.log(previewResult.description, "this is grabity preview result description")
        // If we get something back, include only the useful fields of the preview to the returned data
        if (Object.keys(previewResult)?.includes("title")){
            let data = {
                recipeId: recipeId,
                name: previewResult["og:title"],
                recipe_url: previewResult["og:url"],
                website: previewResult["og:site_name"],
                image: previewResult["og:image"],
                description: previewResult.description,
                category: ""
            };

            console.log(data, "this is the data we're sending back")

            // return res.status(200).json({status: 200, message: "Success!"})
        }
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ status: 500, message: "An error was caught in the corresponding handler function. Verify server console." });
    }
}

module.exports = {
    createRecipePreview
}