function getInitials(text) {
  // Split the text into words
  const words = text.split(" ");

  // Extract the first letter of each word
  const capArr = words.map((word) => {
    // Check if the word is defined and is a string
    if (word && typeof word === "string" && word.length > 0) {
      return word[0].toUpperCase();
    }
    // Return an empty string if the word is not valid
    return "";
  });

  // Join the initials and limit the result to two letters
  return capArr.join("").substring(0, 2);
}

module.exports = getInitials;
