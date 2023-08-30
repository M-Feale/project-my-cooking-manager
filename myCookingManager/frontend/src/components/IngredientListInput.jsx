import { useContext, useEffect, useState } from "react";
import { RecipeDetailsContext } from "./RecipeDetailsContext";

const IngredientListInput = () => {
	// temporary userId
	const userId = 1234;

	// temporary recipeId (will be replaced by url params)
	const recipeId = "1a2b3c";

	// Import RecipeDetails context
	const { currentRecipeDetails } = useContext(RecipeDetailsContext);

	// State used to store the TextArea interactions/information
	const [listTextarea, setListTextarea] = useState({
		list: "",
		isGenerated: false,
		isEditable: true,
		isEdited: false,
	});

	// On mount, display the shopping list present in the context, if any.
	useEffect(() => {
		if (currentRecipeDetails.shopping_list.length > 0) {
			
			// This is the transformation I'll have to do when I GET an existing shopping list from the database
			const listAsParagraph = currentRecipeDetails.shopping_list.toString().replaceAll(",", "\n")

			setListTextarea({
				...listTextarea,
				list: listAsParagraph,
				isGenerated: true,
				isEditable: false
			});
		}
	}, [currentRecipeDetails]);

	const handleGenerate = () => {
		// Separate the list from one big string to an array where each line is its own array element and filter out empty elements created by extra linebreaks during the input
		const ingredientsArray = listTextarea.list
			.split("\n")
			.filter((ingredient) => {
				return ingredient.trim().length > 0;
			});
		// Ingredients array is what I will send to the BE for the shopping list field in my recipes array.
		fetch(`/api/user/${userId}/recipes/${recipeId}/ingredient-list`, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ shoppingList: ingredientsArray }),
		})
			.then((response) => response.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					console.log(parsedResponse.message);
				} else {
					throw new Error(parsedResponse);
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});

		setListTextarea({
			...listTextarea,
			isGenerated: true,
			isEditable: false,
			isEdited: false,
		});
	};

	const handleEdit = () => {
		setListTextarea({ ...listTextarea, isEditable: true, isEdited: true });
	};

	return (
		<>
			<form>
				<label>
					Create your ingredient list
					<textarea
						name="ingredientList"
						placeholder="Paste your ingredient list with a carriage return (Pressing 'Enter') between each ingredient"
						rows="12"
						cols="80"
						value={listTextarea.list}
						disabled={!listTextarea.isEditable}
						onChange={(e) => {
							setListTextarea({
								...listTextarea,
								list: e.target.value,
							});
						}}
					/>
				</label>

				{}
				{!listTextarea.isGenerated && (
					<button
						type="button"
						disabled={listTextarea.list ? false : true}
						onClick={handleGenerate}
					>
						Save List
					</button>
				)}
				{listTextarea.isGenerated && !listTextarea.isEdited && (
					<button type="button" onClick={handleEdit}>
						Edit
					</button>
				)}
				{listTextarea.isEdited && (
					<button type="button" onClick={handleGenerate}>
						Save Edits
					</button>
				)}
				{listTextarea.isGenerated && !listTextarea.isEditable && (
					<button type="button">Send as Email</button>
				)}
			</form>
		</>
	);
};

export default IngredientListInput;
