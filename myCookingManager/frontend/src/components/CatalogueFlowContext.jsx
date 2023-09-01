import { createContext, useState } from "react";

export const CatalogueFlowContext = createContext(null);

export const CatalogueFlowProvider = ({ children }) => {
	// State needed for the CataloguingPage components
	const [catalogueFlow, setCatalogueFlow] = useState({
		isRecipeInput: false,
		isRecipePreviewCorrect: null,
		isCategoryConfirmed: null,
		isPutSuccessful: null,
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
