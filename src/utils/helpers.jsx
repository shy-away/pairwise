/**
 * Create a new item.
 * @returns A new item object of shape `{ input: "", id: "id<randomized-id>", winRate: 0 }`.
 */
export function newInitializedItem() {
  return {
    input: "",
    id: "id" + Math.random().toString(16).slice(2),
    winRate: 0,
  };
}

/**
 * Create a 2D array based on the input array, consisting of randomized index pairs in a randomized order.
 * @param arr an array
 * @returns an array of unique pairs of indices of the original array, representing pairs to compare.
 */
export function createIndexPairs(arr) {
  const newLength = (arr.length * (arr.length - 1)) / 2;
  let result = Array(newLength).fill([]);

  // fill result with all possible pairs (random order)
  let k = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (j <= i) continue;
      // constant: j > i
      result[k] = Math.random() > 0.5 ? [i, j] : [j, i];
      k++;
    }
  }

  return shuffle(result);
}

/**
 * Uses the Knuth (Fisher-Yates) algorithm to shuffle any input array.
 * @param array
 * @returns a shuffled copy of the input array.
 * @link https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
