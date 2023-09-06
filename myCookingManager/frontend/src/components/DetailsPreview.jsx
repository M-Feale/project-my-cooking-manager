import { useContext } from "react";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./contexts/RecipeDetailsContext";

const DetailsPreview = () => {
	// Import the context that provides information about the current recipe
	const { currentRecipeDetails } = useContext(RecipeDetailsContext);

	return (
		<Wrapper>
			<RecipeTextContainer>
				<RecipeTitle>{currentRecipeDetails.name}</RecipeTitle>
				<RecipeAuthor>by {currentRecipeDetails.website}</RecipeAuthor>
				<RecipeDescription>
					{currentRecipeDetails.description}
				</RecipeDescription>
			</RecipeTextContainer>
			<RecipeImageContainer>
				<RecipeImage
					src={currentRecipeDetails.image}
					alt={currentRecipeDetails.name}
				/>
			</RecipeImageContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 40vw;
	padding: 20px 20px 40px 20px;
	border-radius: 10px;
	box-shadow:
	0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const RecipeTextContainer = styled.div``;

const RecipeTitle = styled.h1`
	display: block;
	padding: 0 0 10px;
	font-size: 26px;
	color: var(--tertiary-color);
`;

const RecipeAuthor = styled.p`
	font-style: italic;
`;

const RecipeDescription = styled.p`
	text-align: justify;
	margin: 10px 0;
	font-size: 17px;
`;

const RecipeImageContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	flex-grow: 1;
	max-height: 70vh;
`;

const RecipeImage = styled.img`
	display: block;
	width: 100%;
`;

export default DetailsPreview;
