/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and secred word.
 */

export const getLetterMatchCount = (guessedWord, secretWord) => {
  let count = [];

  secretWord.split("").forEach(letter => {
    guessedWord.split("").forEach(lett => {
      if (letter === lett && count.indexOf(letter) === -1) count.push(letter);
    });
  });

  return count.length;
};
