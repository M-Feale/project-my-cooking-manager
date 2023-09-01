import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

const MakeAgain = () => {
	// temporary userId
	const userId = 1234;

	// temporary recipeId (will be replaced by url params)
	const recipeId = "1a2b3c";

	// Import RecipeDetails context
	const { currentRecipeDetails } = useContext(RecipeDetailsContext);

	// State used to track Radio Button interactions
	const [radioInput, setRadioInput] = useState(null);

	// If the context has anything in it, set the radio input state to the value present in the context.
	useEffect(() => {
		if (currentRecipeDetails.recipeId) {
			setRadioInput(currentRecipeDetails.make_again);
		}
	}, []);

	// Function that handles the value of the radio input with the state
	const handleCheckboxChange = (ev) => {

        // Initialize a temporary value that will reflect the value of the radioInput state.
		let valueUserHasClickedOn;
		if (ev.target.id === "yes") {
			valueUserHasClickedOn = true;
			setRadioInput(true);
		} else {
			valueUserHasClickedOn = false;
			setRadioInput(false);
		}

		if (currentRecipeDetails.make_again !== valueUserHasClickedOn) {
			// Update the value of the make_again field in the database.
			fetch(`/api/user/${userId}/recipes/${recipeId}/update`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					info: { make_again: valueUserHasClickedOn },
				}),
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
		}
	};

	return (
		<Wrapper>
			<ComponentTitle>Would make recipe again?</ComponentTitle>
			<InteractionContainer>
				<LabelContainer>
					<Label htmlFor="yes">Yes</Label>
					<Label htmlFor="no">No</Label>
				</LabelContainer>

				<InputContainer>
					<Input
						id="yes"
						type="radio"
						name="make-again"
						checked={radioInput === true ? true : false}
						onChange={handleCheckboxChange}
					/>
					<Input
						id="no"
						type="radio"
						name="make-again"
						checked={radioInput === false ? true : false}
						onChange={handleCheckboxChange}
					/>
				</InputContainer>
			</InteractionContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 20vw;
`;
const ComponentTitle = styled.h1``;

const InteractionContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
`;

const Label = styled.label`
	margin: 10px;
`;

const Input = styled.input`
	width: 16px; // same as input font-size
	height: 16px; // same as input font-size
	margin: 10px;
`;

export default MakeAgain;