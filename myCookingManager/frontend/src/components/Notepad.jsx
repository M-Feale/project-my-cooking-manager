import { useState } from "react";

const Notepad = () => {
	const [singleNote, setSingleNote] = useState("");
	const [notes, setNotes] = useState([]);

	const handleClearInputAndAddNote = () => {
		setNotes([
			...notes,
			{ id: singleNote + notes.length, text: singleNote },
		]);
		setSingleNote("");
	};

	const handleDeleteNote = (deletedNote) => {
		setNotes((currentNotes) => {
			return currentNotes.filter((currentNote) => {
				return currentNote.id !== deletedNote.id;
			});
		});
	};

	return (
		<div>
			<h1>Cooking notes</h1>
			<ul>
				{notes?.map((note, index) => {
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
		</div>
	);
};

export default Notepad;
