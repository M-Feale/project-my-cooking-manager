import { useNavigate } from "react-router";
import { styled } from "styled-components";

import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes }) => {
	const navigate = useNavigate();
	return (
		<FlexWrapper>
			<Wrapper>
				<ButtonContainer>
					<AddRecipeButton onClick={() => navigate("/catalogue")}>
						Add a recipe
					</AddRecipeButton>
				</ButtonContainer>

				{recipes &&
					recipes.map((recipe) => {
						return (
							<RecipeCard key={recipe.recipeId} recipe={recipe} />
						);
					})}
			</Wrapper>
		</FlexWrapper>
	);
};

const FlexWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	width: 90vw;
	margin: 30px auto;
	display: grid;
	align-items: center;
	gap: 30px;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

const ButtonContainer = styled.div`
	background-color: rgba(225, 217, 217, 0.588);
	max-width: 400px;
	height: 500px;
	max-height: 500px;
	border: 1px solid black;
	border-radius: 10px;
	padding: 24px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
	transition: all ease 200ms;

	// Alternative Box shadow
	//0 4px 40px 0 rgba(0, 0, 0, 0.19), 0 6px 60px 0 rgba(0, 0, 0, 0.18), 0 8px 700px 0 rgba(0, 0, 0, 0.17);

	&:hover {
		cursor: pointer;
		scale: 1.008;
	}
`;

const AddRecipeButton = styled.button`
	width: 100%;
	height: 100%;
	border: none;
	background-color: transparent;
`;

export default RecipeGrid;
