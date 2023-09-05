import { useContext } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import DialogueBox from "./DialogueBox";

const RecipePreview = () => {
	// Import context to control conditional rendering
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	return (
		<Wrapper>
			{!catalogueFlow.recipeInfo.image ? (
				<h1>Loading...</h1>
			) : (
				<>
					<TextAndDialogueBoxContainer>
						<TextContainer>
							<div>
								<SectionTitle>Recipe name</SectionTitle>
								<RecipePreviewCopy>
									{catalogueFlow.recipeInfo.name}
								</RecipePreviewCopy>
							</div>
							<div>
								<SectionTitle>Website name</SectionTitle>
								<RecipePreviewCopy>
									{catalogueFlow.recipeInfo.website}
								</RecipePreviewCopy>
							</div>
							<div>
								<SectionTitle>Recipe description</SectionTitle>
								<RecipePreviewCopy>
									{catalogueFlow.recipeInfo.description}
								</RecipePreviewCopy>
							</div>
						</TextContainer>
						<DialogueBoxContainer>
							<DialogueBox
								title={
									"Is this the recipe you were looking to add to your collection ?"
								}
								buttonArray={[
									{
										text: "Yes",
										function: () =>
											setCatalogueFlow({
												...catalogueFlow,
												isRecipePreviewCorrect: true,
											}),
									},
									{
										text: "No",
										function: () =>
											setCatalogueFlow({
												...catalogueFlow,
												isRecipePreviewCorrect: false,
											}),
									},
								]}
							/>
						</DialogueBoxContainer>
					</TextAndDialogueBoxContainer>
					<ImageDiv>
						<Image
							src={catalogueFlow.recipeInfo.image}
							alt={catalogueFlow.recipeInfo.name}
						/>
					</ImageDiv>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 20px 0;
	width: 100%;
`;

const TextAndDialogueBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 80%;
`;

const TextContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 80%;
`;

const SectionTitle = styled.h2`
	color: var(--primary-color);
	font-family: var(--heading-font-family);
	font-weight: bold;
	display: block;
	font-size: 20px;
	margin: 5px 0;
`;

const RecipePreviewCopy = styled.p`
	text-align: justify;
	font-size: 16px;
	line-height: 115%;
	margin: 5px 0 5px 5px;
`;

const DialogueBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30vw;
`;

const ImageDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	max-height: 70vh;
	max-width: 50%;
	min-height: 300px;
`;

const Image = styled.img`
	display: block;
	width: 30vw;
`;

export default RecipePreview;
