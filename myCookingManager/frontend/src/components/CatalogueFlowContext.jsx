import { createContext, useState } from "react";

export const CatalogueFlowContext = createContext(null);

export const CatalogueFlowProvider = ({ children }) => {
	// State needed for the conditional rendering of the CataloguingPage
	const [catalogueFlow, setCatalogueFlow] = useState({
		isRecipeInput: false,
		isRecipePreviweCorrect: false,
		isCategoryConfirmed: false,
		isPutSuccessful: false,
        recipeInfo:  {
            recipeId: "", 
            name: "",
            website: "",
            recipe_url: "",
            image: "", 
            description:"",
            category: ""
        }
	});

	return (
		<CatalogueFlowContext.Provider
			value={{ catalogueFlow, setCatalogueFlow }}
		>
			{children}
		</CatalogueFlowContext.Provider>
	);
};
