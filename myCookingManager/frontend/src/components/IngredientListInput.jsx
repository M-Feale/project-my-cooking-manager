import { useContext, useEffect, useState } from "react";
import { RecipeDetailsContext } from "./RecipeDetailsContext";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const IngredientListInput = () => {
	// temporary userId
	const userId = 1234;

	// temporary recipeId (will be replaced by url params)
	const recipeId = "1a2b3c";

	// Import RecipeDetails context
	const { currentRecipeDetails } = useContext(RecipeDetailsContext);

	// Import User info from Auth0
	const { user } = useAuth0();

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
			// Transform the shopping list array from the db/context into one string separated by linebreaks for the textarea display.
			const listAsParagraph = currentRecipeDetails.shopping_list
				.toString()
				.replaceAll(",", "\n");

			setListTextarea({
				...listTextarea,
				list: listAsParagraph,
				isGenerated: true,
				isEditable: false,
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
		// Update the value of the shopping_list field in the database.
		fetch(`/api/user/${userId}/recipes/${recipeId}/update`, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ info: {shopping_list: ingredientsArray}}),
		})
			.then((response) => response.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					// Decide if I want to add a success message for a successful ingredient list update
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

	const handleEmail = () => {
		const ingredientsArray = listTextarea.list
			.split("\n")
			.filter((ingredient) => {
				return ingredient.trim().length > 0;
			});

		fetch(`/api/user/${userId}/recipes/${recipeId}/ingredient-list/email`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: user.email,
				shoppingList: ingredientsArray,
			}),
		})
			.then((response) => response.json())
			.then((parsedResponse) => {
				if (parsedResponse.status >= 200) {
					// Decide if I want to send a success message on 200 and error message on 204
					console.log(parsedResponse.message);
				} else {
					throw new Error(parsedResponse);
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});
	};

	return (
		<>
			<Wrapper>
				<Label htmlFor="ingredient-list">
					Create your ingredient list
				</Label>
				<textarea
					id="ingredient-list"
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

				<ButtonContainer>
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
						<button type="button" onClick={handleEmail}>
							Send as Email
						</button>
					)}
				</ButtonContainer>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	display: inline-block;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

export default IngredientListInput;
