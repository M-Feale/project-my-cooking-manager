export const lastDateCalculator = (arrayOfDateObjects) => {
    const arrayOfDateString = arrayOfDateObjects.map((dateObj) => {
		const string = dateObj.text;
		const indexOfDateEnd = string.indexOf(" at ");
		if (indexOfDateEnd > 0) {
			const newDate = string.slice(0, indexOfDateEnd);
			return Date.parse(newDate);
		} else {
			return Date.parse(string);
		}
	});
	const copyOfStringsArray = [...arrayOfDateString];
	copyOfStringsArray.sort(function (date1, date2) {
		return date1 - date2;
	});
	const mostRecent = copyOfStringsArray.at(copyOfStringsArray.length - 1);
	const lastTimeMade = new Date(mostRecent).toLocaleString("en-ca", {
		weekday: "long",
		month: "long",
		year: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	});
	const dayWithoutTime = lastTimeMade.slice(0, lastTimeMade.indexOf(" at "));

    return dayWithoutTime
}