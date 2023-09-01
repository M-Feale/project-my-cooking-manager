import { useContext } from "react";
import { styled } from "styled-components";
import { CatalogueFlowContext } from "./CatalogueFlowContext";
import UrlInput from "./UrlInput";

const CataloguingPage = () => {
	const { catalogueFlow } = useContext(CatalogueFlowContext);

	// State needed for this conditional rendering
	// isRecipeInput : true/false
	// isRecipePreviewCorrect: true/false
	// isCategoryConfirmed: true/false // when true this will put the recipe in the database
	// isPutSuccessful: true/false // when true, the success message will appear and the context will be reset.

	return (
		<Wrapper>
			<UrlInput />
			{/* {when add is clicked in Url Input, the recipe preview appears} */}
			<div>
				Recipe Preview with "maybe" one dialogue box component within
			</div>
			{/* when the dialogue box inside the recipe preview is "yes", the category select box appear
            when the dialogue box is no, the preview disappear and when are brought back to url input */}
			<div>Dialogue box</div>
			<div>Category select</div>
			{/* when the category select is confirmed the recipe is added to the db and a success notification box appears
            after that, the dialogue box appears and ask if we want to add another recipe,
            navigate to the newly added recipe details or if we want to go page to recipe collection */}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px auto;
	width: 80vw;
`;

export default CataloguingPage;
