const IngredientListInput = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		// Read the form data
		const form = e.target;
		const formData = new FormData(form);
		// Convert it to an object with ingredientList as a key and the value of the textarea as a value
		const ingredientObject = Object.fromEntries(formData.entries());

		fetch("/api/ingredient-list", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(ingredientObject),
		})
			.then((response) => response.json())
			.then((parsedResponse) => {
				console.log(
					parsedResponse,
					"this is the response from the textinput fetch"
				);
			});
	};

	return (
		<>
			<form method="post" onSubmit={handleSubmit}>
				<label>
					Create your ingredient list
					<textarea
						name="ingredientList"
						placeholder="Paste your ingredient list with a carriage return (Pressing 'Enter') between each ingredient"
						rows={12}
						cols={80}
					/>
				</label>
				<button type="reset">Reset</button>
				<button type="submit">Save List</button>
			</form>
		</>
	);
};

export default IngredientListInput;
