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
`;

const RecipeAuthor = styled.p`
	font-style: italic;
`;

const RecipeDescription = styled.p`
	text-align: justify;
`;

const RecipeImageContainer = styled.div`
	width: 100%;
`;

const RecipeImage = styled.img`
    // This will have to be played with for it to be cropped in some way and not take the whole height of the page.
	width: 300px;
`;

export default DetailsPreview;
