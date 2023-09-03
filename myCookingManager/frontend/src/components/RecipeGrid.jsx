import { useNavigate } from "react-router";
import { styled } from "styled-components";

import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes }) => {
	const navigate = useNavigate();
	return (
		<Wrapper>
			<div>
				<button onClick={() => navigate("/catalogue")}>
					Add a recipe
				</button>
			</div>

			{recipes &&
				recipes.map((recipe) => {
					return <RecipeCard key={recipe.recipeId} recipe={recipe} />;
				})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 90vw;
	margin: 0 auto;
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
`;

export default RecipeGrid;
