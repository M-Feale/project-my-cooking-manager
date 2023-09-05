import { useEffect, useRef } from "react";

const useAutoScrollIntoView = () => {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "end",
			});
		}
	}, []);
	return ref;
};

export default useAutoScrollIntoView;
