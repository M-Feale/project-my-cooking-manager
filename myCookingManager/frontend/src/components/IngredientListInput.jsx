const IngredientListInput = () => {
	const handleSubmit = (e) => {
		// Prevent the browser from reloading the page
		e.preventDefault();

		// Read the form data
		const form = e.target;
		const formData = new FormData(form);

		// console.log(formData, "this is formdata");

		// const requestBody = {
		// 	ingredientList: '1 cup potato, chopped\n1 cup parsley, minced\n230 grams cheese',
		// 	servings: 1,
		// 	includeNutrition: false
		// }

		// const searchParams = new URLSearchParams(requestBody)
		// console.log(searchParams.toString(), "this is search params")

		// Or you can work with it as a plain object:
		const formJson = Object.fromEntries(formData.entries());
		console.log(formJson, "this is formJson");
		// const searchParams = new URLSearchParams(formData)
		// console.log(searchParams, "might be uri encoded like I want ?")
		// console.log(searchParams.toString(), "is this it?")

		fetch("/api/ingredient-list", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formJson),
		})
			.then((response) => response.json())
			.then((parsedResponse) => {
				console.log(parsedResponse, "this is the response from the textinput fetch");
			});
	};

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				Edit your post:
				<textarea
					name="ingredientList"
					defaultValue=""
					rows={4}
					cols={40}
				/>
			</label>
			<hr />
			<button type="reset">Reset edits</button>
			<button type="submit">Save post</button>
		</form>
	);
};

export default IngredientListInput;
