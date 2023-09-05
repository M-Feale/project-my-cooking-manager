import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

const IngredientListInput = () => {
	//Import user object from auth0
	const { user } = useAuth0();

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
		// ------------------------------------------------------------------------------------- //
		// Separate the list from one big string to an array where each line is its own array
		//  element and filter out empty elements created by extra linebreaks during the input.
		// This allow for an easy storage inside the database.
		// ------------------------------------------------------------------------------------- //
		const ingredientsArray = listTextarea.list
			.split("\n")
			.filter((ingredient) => {
				return ingredient.trim().length > 0;
			});
		// Update the value of the shopping_list field in the database.
		fetch(
			`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`,
			{
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					info: { shopping_list: ingredientsArray },
				}),
			}
		)
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
		// ------------------------------------------------------------------------------------- //
		// Separate the list from one big string to an array where each line is its own array
		// element and filter out empty elements created by extra linebreaks during the input
		// This allow for the creation of the email to be easier.
		// ------------------------------------------------------------------------------------- //
		const ingredientsArray = listTextarea.list
			.split("\n")
			.filter((ingredient) => {
				return ingredient.trim().length > 0;
			});

		fetch(
			`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/ingredient-list/email`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: user.email,
					shoppingList: ingredientsArray,
				}),
			}
		)
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
				<Label htmlFor="ingredient-list">Shopping List</Label>
				<Textarea
					id="ingredient-list"
					name="ingredientList"
					placeholder="Paste the ingredient list of this recipe and be ready for your next grocery trip! Make sure each ingredient is on a separate line."
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
						<Button
							type="button"
							disabled={listTextarea.list ? false : true}
							onClick={handleGenerate}
						>
							Save List
						</Button>
					)}
					{listTextarea.isGenerated && !listTextarea.isEdited && (
						<Button type="button" onClick={handleEdit}>
							Edit
						</Button>
					)}
					{listTextarea.isEdited && (
						<Button type="button" onClick={handleGenerate}>
							Save Edits
						</Button>
					)}
					{listTextarea.isGenerated &&
						!listTextarea.isEditable &&
						listTextarea.list.length > 0 && (
							<Button type="button" onClick={handleEmail}>
								Send as Email
							</Button>
						)}
				</ButtonContainer>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px 20px;
	background-color: var(--secondary-color);
`;

const Label = styled.label`
	color: var(--primary-color);
	font-family: var(--heading-font-family);
	font-weight: bold;
	display: block;
	padding: 5px 0;
`;

const Textarea = styled.textarea`
	min-height: 160px; // 10 lines of 16px-high text
	border: 2px solid var(--secondary-color);
	resize: none;
	/* background-color: white; */
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	margin: 5px 0;
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	min-width: 105px;
	border-radius: 3px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default IngredientListInput;
