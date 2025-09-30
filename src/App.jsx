import { useRef, useState } from "react";

function App() {
  const [phase, setPhase] = useState(0);
  const [items, setItems] = useState([newInitializedItem()]);
  const [rankThoughts, setRankThoughts] = useState("");

  return (
    <>
      {
        // TODO: delete border later
      }
      <div className="container-md p-3 border">
        <div className="row align-items-center justify-content-center">
          <div className="col col-md-10">
            {phase === 0 && (
              <InputItems
                {...{
                  items,
                  setItems,
                  rankThoughts,
                  setRankThoughts,
                  setPhase,
                }}
              />
            )}
            {phase === 1 && (
              <Ranker {...{ items, setItems, rankThoughts, setPhase }} />
            )}
            {phase === 2 && <Results items={items} />}
          </div>
        </div>
      </div>
    </>
  );
}

function InputItems({
  items,
  setItems,
  rankThoughts,
  setRankThoughts,
  setPhase,
}) {
  const handleAddItem = () => {
    setItems((prev) => [...prev, newInitializedItem()]);
  };

  const handleInputChange = (event, id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id)
          return {
            ...item,
            input: event.target.value,
          };
        else return item;
      })
    );
  };

  const handleNext = () => {
    if (items.length >= 2) setPhase(1);
    else alert(`Please input at least 2 items to compare.`);
    {
      // TODO: replace above alert with proper Bootstrap modal?
    }
  };

  return (
    <div id="input-items" className="text-center">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <h2 className="my-4">Enter your items below</h2>
            <button className="btn btn-primary" onClick={handleAddItem}>
              Add an item
            </button>
            {items.length === 0 ? (
              <div className="text-body-secondary my-4">
                Click the Add Items button
              </div>
            ) : (
              <ul className="my-4 p-0">
                {items.map((item) => (
                  <li key={item.id} id={item.id} className="d-block m-3">
                    <input
                      type="text"
                      value={item.input}
                      onChange={(e) => handleInputChange(e, item.id)}
                      className="m-2"
                    />
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        setItems((prev) => prev.filter((e) => e.id !== item.id))
                      }
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-12 col-md-5 mb-3">
            <h2 className="my-4">
              Ranking Question{" "}
              <em className="text-body-secondary">(optional)</em>
            </h2>
            <textarea
              id="rankThoughts"
              onChange={(e) => setRankThoughts(e.target.value)}
              placeholder="Which task should I do first?"
              style={{
                width: "70%",
                minHeight: "15vh",
              }}
              value={rankThoughts}
            ></textarea>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

function Ranker({ items, setItems, rankThoughts, setPhase }) {
  const [currentPair, setCurrentPair] = useState(0);
  const indexPairs = useRef(null);

  if (indexPairs.current === null) {
    indexPairs.current = createIndexPairs(items);
  }

  const handlePick = (e) => {
      const selectedItemIndex = indexPairs.current[currentPair][e.target.value];

    // if the next index isn't out of bounds, update items and advance the index
    if (currentPair + 1 < indexPairs.current.length) {
      // console.log(selectedItem);

      setItems((prev) =>
        prev.map((item, i) => {
          if (i === selectedItemIndex)
            return { ...item, winRate: item.winRate + 1 };
          else return item;
        })
      );

      setCurrentPair((prev) => prev + 1);
    }
    // otherwise, move to next phase
    else setPhase(2);
  };

  return (
    <div id="ranker" className="container-fluid text-center">
      <div className="row justify-content-between">
        <div className="col-12">
          <h2>{rankThoughts ? rankThoughts : "Pick one..."}</h2>
        </div>

        {indexPairs.current[currentPair].map((itemIndex, i) => (
          <button
            key={i}
            value={i}
            className="h2 col-12 col-md-5 my-4"
            onClick={handlePick}
          >
            {items[itemIndex].input}
          </button>
        ))}

        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setPhase(0)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

function Results({ items }) {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
  }

  return (
    <div>
      {items
        .toSorted((a, b) =>
          a.winRate > b.winRate ? -1 : b.winRate > a.winRate ? 1 : 0
        )
        .map((item, i) => (
          <div key={i}>{item.input}</div>
        ))}
    </div>
  );
}

/**
 * Create a new item.
 * @returns A new item object of shape `{ input: "", id: "id<randomized-id>", winRate: 0 }`.
 */
function newInitializedItem() {
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
function createIndexPairs(arr) {
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

export default App;
