export const filterSpecialCharacter = (url) => {
    // ------------------------------------------------------------------------------------------ //
    // Special characters break the link preview library (grabity) or return nothing.
    // Common special characters found in recipe urls are # and ?. Since grabity autocompletes 
    // the rest of the url, I slice the url to keep everything before those 2 special characters.
    // ------------------------------------------------------------------------------------------ //

    const foundIndexOfHash = url.indexOf("#")
    if (foundIndexOfHash > 0) {
        const newUrl = url.slice(0, foundIndexOfHash)
        return newUrl
    }
    else {
        const foundIndexOfQuest = url.indexOf("?")
        if (foundIndexOfQuest > 0) {
            const newUrl = url.slice(0, foundIndexOfQuest)
            return newUrl
        } else {
            return url
        }
    }
}