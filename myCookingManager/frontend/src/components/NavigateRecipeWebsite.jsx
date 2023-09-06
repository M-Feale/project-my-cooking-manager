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
	text-decoration: none;
	cursor: pointer;
	margin-bottom: 20px;
`;

const Wrapper = styled.div`
	width: 100%;
	background-color: var(--primary-color);
	padding: 15px 10px;
	border: none;
	border-radius: 5px;

	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const LinkText = styled.p`
	color: var(--secondary-color);
	font-size: 18px;
	font-weight: 700;
`;

export default NavigateRecipeWebsite;
