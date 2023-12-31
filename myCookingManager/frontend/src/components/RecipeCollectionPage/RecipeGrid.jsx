import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { FaPlus } from "react-icons/fa6";

import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes }) => {
	return (
		<Wrapper>
			<AddRecipeLink to={"/catalogue"}>
				<LinkContainer>
					<TextDiv>
						<LinkText>Click to add a recipe</LinkText>
					</TextDiv>
					<IconDiv>
						<PlusIcon />
					</IconDiv>
				</LinkContainer>
			</AddRecipeLink>

			{recipes &&
				recipes.map((recipe) => {
					return <RecipeCard key={recipe.recipeId} recipe={recipe} />;
				})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 90vw;
	margin: 30px auto;
	display: grid;
	place-items: center; // Magical grid property!
	gap: 30px;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

const LinkContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 400px;
	height: 500px;
	max-height: 500px;
	border-radius: 10px;
	padding: 24px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
	transition: all ease 200ms;

	&:hover {
		scale: 1.008;
	}
`;

const AddRecipeLink = styled(Link)`
	text-decoration: none;
`;

const TextDiv = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const LinkText = styled.span`
	font-size: 42px;
	max-width: 50%;
	margin: 19px;
	color: var(--primary-color);
	font-weight: 700;
`;

const IconDiv = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const PlusIcon = styled(FaPlus)`
	width: 200px;
	height: 200px;
	color: rgba(39, 84, 12, 0.588);
`;

export default RecipeGrid;
