import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { FaTimes } from "react-icons/fa";

import { RecipeDetailsContext } from "../contexts/RecipeDetailsContext";

const Notepad = () => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Import the context that provides information about the current recipe
	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// States that store input onChange, notes in the array of notes and a flag to trigger the fetch
	const [singleNote, setSingleNote] = useState("");
	const [notes, setNotes] = useState(currentRecipeDetails.notes);
	const [wereNotesEdited, setWereNotesEdited] = useState(false);

	useEffect(() => {
		if (wereNotesEdited) {
			fetch(
				`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						info: { notes: notes },
					}),
				}
			)
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// This is where I would have a modal with a success message.
						setCurrentRecipeDetails({
							...currentRecipeDetails,
							notes: notes,
						});
						setWereNotesEdited(false);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, [wereNotesEdited]);

	const handleClearInputAndAddNote = () => {
		if (singleNote.length > 0) {
			setNotes([
				...notes,
				{ id: singleNote + notes.length, text: singleNote },
			]);
			setSingleNote("");
			setWereNotesEdited(true);
		}
	};

	// ------------------------------------------------------------ //
	// Remove a note from the notes array by keeping all the ones
	// that don't match the id of the one we want to delete.
	// ------------------------------------------------------------ //
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
			<Label htmlFor="note">Cooking notes</Label>
			<ul>
				{currentRecipeDetails.notes?.map((note, index) => {
					return (
						<li key={note.id + index}>
							<NoteDiv>
								<NoteText>{note.text}</NoteText>
								{note.id && (
									<DeleteButton
										onClick={() => handleDeleteNote(note)}
									>
										<DeleteIcon />
									</DeleteButton>
								)}
							</NoteDiv>
						</li>
					);
				})}
			</ul>
			<InputAndButtonDiv>
				<Input
					id="note"
					type="text"
					name="note"
					placeholder="Write your note here !"
					value={singleNote}
					onChange={(ev) => setSingleNote(ev.target.value)}
				/>
				<Button
					disabled={!singleNote.length}
					onClick={() => handleClearInputAndAddNote()}
				>
					Add note
				</Button>
			</InputAndButtonDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px 0;
	padding: 5px 20px 10px;
	border-radius: 5px;
	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const Label = styled.label`
	color: var(--primary-color);
	display: block;
	padding: 5px 0;
	font-size: 18px;
	font-weight: 700;
`;

const Input = styled.input`
	padding: 6px;
	width: 80%;
	border: 2px solid var(--input-bg-color);
	background-color: var(--input-bg-color);
	font-family: var(--input-font-family);
	font-size: 15px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const InputAndButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	border: 2px solid var(--tertiary-color);
	font-weight: 500;
	font-size: 15px;
	color: black;
	padding: 5px;
	min-width: 80px;
	border-radius: 3px;
	margin-top: 1px; // To be aligned with the input
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const DeleteButton = styled.button`
	background-color: transparent;
	border: 2px solid var(--secondary-color); // Same color as background of div
	height: 25.2px; // To be a perfect square according to dev tools.

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const DeleteIcon = styled(FaTimes)`
	width: 20px;
	height: 20px;
	opacity: 0.5;
	margin-top: 1px;
`;

const NoteDiv = styled.div`
	padding: 2px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-left: 7px;
	width: calc(
		80% + (2 * 6px) + (2 * 2px)
	); // To be the same length as the input field
`;

const NoteText = styled.span`
	margin-right: 10px;
	font-size: 15px;
`;

export default Notepad;
