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
        // Save the result of the method to a variable
        const previewResult = await grabity.grab(recipe_url);

        // ----------------------------------------------------------------------- //
        // If we get a preview back and the data includes the recipe_url 
        // that we used to get the preview, include only the useful fields of the 
        // preview to the returned data.
        // ----------------------------------------------------------------------- //
        if (Object.values(previewResult)?.includes(recipe_url)){
            let data = {
                recipeId: recipeId,
                name: previewResult["og:title"],
                recipe_url: previewResult["og:url"],
                website: previewResult["og:site_name"],
                image: previewResult["og:image"],
                description: previewResult.description,
                category: ""
            };
            return res.status(200).json({status: 200, message: "Success!", data: data})
        } // If we get an error or a preview that doesn't match, send 204 and let FE create an unsuccessful message for the preview
        else {
            return res.status(204).json({ status: 204 }) 
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