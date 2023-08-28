const RecipeGrid = ({ recipes }) => {
	return (
		<>
			<div>
				<button>Add a recipe</button>
			</div>

			{recipes &&
				recipes.map((recipe) => {
					return (
						<>
							<h1>RecipeCard component</h1>
						</>
					);
				})}
		</>
	);
};

export default RecipeGrid;
