// ----------------------------------------------------------------------------------------- //
// This function takes in an array of date objects. These objects have an id key used
// for deletion and, more importantly here, a text key containing a string representing
// a date. This function returns a parsed and well-formatted date. In this version,
// the function relies on a well-inputed date from the user. In the future, this 
// function will return the date string at the last index of the array if it can't be 
// parsed as a date object or a well-formatted date in the case a date object.
// As of now, this function return "Invalid Dat" if the user's input was anything else
// but the specified format or a date with weekdays or months not in English.
// ----------------------------------------------------------------------------------------- //

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