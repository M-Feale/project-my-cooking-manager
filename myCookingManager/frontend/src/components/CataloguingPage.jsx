import { useContext, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import UrlInput from "./UrlInput";
import RecipePreview from "./RecipePreview";
import DialogueBox from "./DialogueBox";
import CategorySelect from "./CategorySelect";

const CataloguingPage = () => {
	// Import context to control conditional rendering
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// Import navigate
	const navigate = useNavigate();

	useEffect(() => {
		if(catalogueFlow.isCategoryConfirmed){
		console.log("The category is confirmed! Time to do the put")
		}
		

	}, [catalogueFlow.isCategoryConfirmed])


	return (
		<Wrapper>
			<UrlInput />
			{catalogueFlow.isRecipeInput && <RecipePreview />}
			{catalogueFlow.isRecipePreviewCorrect && <CategorySelect />}
			{
				catalogueFlow.isRecipePreviewCorrect === false && (
					<DialogueBox
						title={"What do you want to do next ?"}
						buttonArray={[
							{
								text: "Try Again",
								function: () =>
									setCatalogueFlow({
										...catalogueFlow,
										isRecipeInput: false,
										isRecipePreviewCorrect: null,
									}),
							},
							{
								text: "Navigate to my Recipe Collection",
								function: () => navigate("/recipes"),
							},
						]}
					/>
				)
				// <h1>Dialogue box with try again or navigate to recipeCollection</h1>
			}
			{/* {when add is clicked in Url Input, the recipe preview appears} */}

			{/* when the dialogue box inside the recipe preview is "yes", the category select box appear
            when the dialogue box is no, the preview disappear and when are brought back to url input */}
			{/* <div>Dialogue box</div>
			<div>Category select</div> */}
			{/* when the category select is confirmed the recipe is added to the db and a success notification box appears
            after that, the dialogue box appears and ask if we want to add another recipe,
            navigate to the newly added recipe details or if we want to go page to recipe collection */}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px auto;
	width: 80vw;
`;

export default CataloguingPage;
