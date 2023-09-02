import { useNavigate } from "react-router";

const RecipeGrid = ({ recipes }) => {
	const navigate = useNavigate()
	return (
		<>
			<div>
				<button onClick={() => navigate("/catalogue")}>Add a recipe</button>
			</div>

			{recipes &&
				recipes.map((recipe) => {
					return (
						<div key={recipe.recipeId} onClick={() => navigate(`/recipes/${recipe.recipeId}`)}>
                            <h1>{recipe.name}</h1>
                            <img src={recipe.image} style={{width: "200px"}} alt={recipe.name} />
                            <p>{recipe.category}</p>

                        </div>
					);
				})}
		</>
	);
};

export default RecipeGrid;
