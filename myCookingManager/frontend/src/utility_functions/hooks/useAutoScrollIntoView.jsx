import { useEffect, useRef } from "react";

const useAutoScrollIntoView = () => {
	const ref = useRef(null);

	const options = {
		behavior: "smooth",
		block: "start",
		inline: "nearest",
	};

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView(options); 
		}
	}, []);
	return ref;
};

export default useAutoScrollIntoView;
