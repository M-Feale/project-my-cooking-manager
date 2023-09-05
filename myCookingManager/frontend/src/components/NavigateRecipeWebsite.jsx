import { useContext } from "react";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

const NavigateRecipeWebsite = () => {
	// Import RecipeDetails context
	const { currentRecipeDetails } = useContext(RecipeDetailsContext);

	return (
		<AnchorTag href={currentRecipeDetails.recipe_url} target="_blank">
			<Wrapper>
				<LinkText>Open recipe in a new tab </LinkText>
			</Wrapper>
		</AnchorTag>
	);
};

const AnchorTag = styled.a`
	color: black;
	text-decoration: none;
	cursor: pointer;
`;

const Wrapper = styled.div`
	width: 40vw;
	background-color: var(--tertiary-color);
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
	margin: 20px 0;
`;

const LinkText = styled.p`
	color: black;
	font-family: var(--link-font-family);
`;

export default NavigateRecipeWebsite;
