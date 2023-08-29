const RecipeGrid = ({ recipes }) => {
	return (
		<>
			<div>
				<button>Add a recipe</button>
			</div>

			{recipes &&
				recipes.map((recipe) => {
					return (
						<div key={recipe.recipeId}>
                            <h1>{recipe.name}</h1>
                            <img src={recipe.image} style={{width: "200px"}} />
                            <p>{recipe.recipeId}</p>
                            <p>{recipe.category}</p>

                        </div>
					);
				})}
		</>
	);
};

export default RecipeGrid;
