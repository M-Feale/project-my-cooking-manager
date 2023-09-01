import { useContext } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import UrlInput from "./UrlInput";
import RecipePreview from "./RecipePreview";

const CataloguingPage = () => {
    // Import context to control conditional rendering
	const { catalogueFlow } = useContext(CatalogueFlowContext);

	return (
		<Wrapper>
			<UrlInput />
			{catalogueFlow.isRecipeInput && (
				<RecipePreview />
			)}
			{/* {when add is clicked in Url Input, the recipe preview appears} */}

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
