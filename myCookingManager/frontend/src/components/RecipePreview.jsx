import { useContext, useEffect, useRef } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";
import useAutoScrollIntoView from "../utility_functions/hooks/useAutoScrollIntoView";

import DialogueBox from "./DialogueBox";

const RecipePreview = () => {
	// Import context to control conditional rendering
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// Import a custom useRef hook that outputs a scrolled into view ref
	const viewPreview = useAutoScrollIntoView();
	
	return (
		<Wrapper ref={viewPreview} >
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
						<DialogueBoxContainer
							$isVisible={!catalogueFlow.isRecipePreviewCorrect}
							$isDisplayed={!catalogueFlow.isPutSuccessful}
						>
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
						<DialogueBoxContainer $isDisplayed={catalogueFlow.isPutSuccessful} $isVisible={catalogueFlow.isPutSuccessful} >
							<DialogueBox title={"Success!"} buttonArray={[]} />
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
	width: 100%;

	margin: 20px 0;
	padding: 30px 20px 20px;
	border-radius: 5px;
	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
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
	color: var(--tertiary-color);
	font-weight: bold;
	display: block;
	font-size: 22px;
	margin: 5px 0;
`;

const RecipePreviewCopy = styled.p`
	text-align: justify;
	font-size: 18px;
	line-height: 115%;
	margin: 5px 0;
`;

const DialogueBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	width: 30vw;
	visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
	display: ${(props) => (props.$isDisplayed ? "flex" : "none")};
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
	padding: 20px 0;
`;

const Image = styled.img`
	display: block;
	width: 30vw;
`;

export default RecipePreview;
