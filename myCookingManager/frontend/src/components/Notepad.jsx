import { useContext, useEffect, useState } from "react";
import { RecipeDetailsContext } from "./RecipeDetailsContext";
import { styled } from "styled-components";

const Notepad = () => {

	//temporary user id
	const userId = 1234;

	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	const [singleNote, setSingleNote] = useState("");
	const [notes, setNotes] = useState(currentRecipeDetails.notes);
	const [wereNotesEdited, setWereNotesEdited] = useState(false);

	useEffect(() => {
		if (wereNotesEdited) {

			fetch(`/api/user/${userId}/recipes/${currentRecipeDetails.recipeId}/update`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					info: { notes: notes },
				}),
			})
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// Decide if I want to add a success message for a successful ingredient list update
						console.log(parsedResponse);
						setCurrentRecipeDetails({...currentRecipeDetails, notes: notes})
						setWereNotesEdited(false)

					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}

		
	}, [wereNotesEdited]);

	// setCurrentRecipeDetails({...currentRecipeDetails, notes: notes})

	const handleClearInputAndAddNote = () => {
		setNotes([
			...notes,
			{ id: singleNote + notes.length, text: singleNote },
		]);
		setSingleNote("");
		setWereNotesEdited(true);
	};

	const handleDeleteNote = (deletedNote) => {
		setNotes((currentNotes) => {
			return currentNotes.filter((currentNote) => {
				return currentNote.id !== deletedNote.id;
			});
		});
		setWereNotesEdited(true);
	};

	return (
		<Wrapper>
			<h1>Cooking notes</h1>
			<ul>
				{currentRecipeDetails.notes?.map((note, index) => {
					return (
						<li key={note.id + index}>
							{note.text}
							{note.id && (
								<button onClick={() => handleDeleteNote(note)}>
									Delete
								</button>
							)}
						</li>
					);
				})}
			</ul>
			<input
				placeholder="Write your note here !"
				value={singleNote}
				onChange={(ev) => setSingleNote(ev.target.value)}
			/>
			<button onClick={() => handleClearInputAndAddNote()}>
				Add note
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px 0;
	padding: 20px;
	background-color: var(--secondary-color);
`;

export default Notepad;
