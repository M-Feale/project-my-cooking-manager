import { useContext } from "react";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

const DetailsPreview = () => {
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
	justify-content: center;
	align-items: start;
	width: 40vw;
`;

const RecipeTextContainer = styled.div``;

const RecipeTitle = styled.h1`
	display: block;
	padding: 5px 0;
	font-size: 24px;
`;

const RecipeAuthor = styled.p`
	font-style: italic;
`;

const RecipeDescription = styled.p`
	text-align: justify;
	margin: 10px 0;
	font-size: 18px;
`;

const RecipeImageContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	max-height: 60vh;
	overflow: hidden;
`;

const RecipeImage = styled.img`
	display: block;
	width: 100%;
`;

export default DetailsPreview;
