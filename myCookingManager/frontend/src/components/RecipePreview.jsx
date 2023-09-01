import { useContext } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import DialogueBox from "./DialogueBox";

const RecipePreview = () => {
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
							<RecipeName>
								<SectionTitle>Recipe name</SectionTitle>
								{catalogueFlow.recipeInfo.name}
							</RecipeName>
							<WebsiteName>
								<SectionTitle>Website name</SectionTitle>
								{catalogueFlow.recipeInfo.website}
							</WebsiteName>
							<RecipeDescription>
								<SectionTitle>Recipe description</SectionTitle>
								{catalogueFlow.recipeInfo.description}
							</RecipeDescription>
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
										// I want to make the input field in focus when "No" is clicked. As it is now, it just makes the whole RecipePreview disappear and it's pretty jarring.
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
					<ImagePreviewContainer>
						<SectionTitle>Preview Image</SectionTitle>
						{/* $url={catalogueFlow.recipeInfo.image} */}
						<ImageDiv>
							<Image src={catalogueFlow.recipeInfo.image} alt={catalogueFlow.recipeInfo.name} />
						</ImageDiv>
					</ImagePreviewContainer>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const TextAndDialogueBoxContainer = styled.div`
	flex-grow: 2;
	display: flex;
	flex-direction: column;
`;

const RecipeName = styled.p`
	text-align: justify;
`;

const SectionTitle = styled.span`
	display: block;
	font-weight: bold;
	font-size: 20px;
	margin: 10px 0;
`;

const WebsiteName = styled(RecipeName)``;

const RecipeDescription = styled.p``;

const TextContainer = styled.div`
	flex-grow: 3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const DialogueBoxContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
`;

const ImagePreviewContainer = styled.div`
	flex-grow: 1;
`;

const ImageDiv = styled.div`
	height: 450px;
	overflow: hidden;
	/* background-image: url(${(props) => props.$url}); */
`;

const Image = styled.img`
	/* max-width: 100%; */
	height: 100%;
	display: block;
	/* margin: 0 auto; */
`;

export default RecipePreview;
