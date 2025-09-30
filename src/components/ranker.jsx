import { useState, useRef } from "react";
import { createIndexPairs } from "../utils/helpers";

export default function Ranker({ items, setItems, rankThoughts, setPhase }) {
  const [currentPair, setCurrentPair] = useState(0);
  const indexPairs = useRef(null);

  if (indexPairs.current === null) {
    indexPairs.current = createIndexPairs(items);
  }

  const handlePick = (e) => {
    const selectedItemIndex = indexPairs.current[currentPair][e.target.value];

    setItems((prev) =>
      prev.map((item, i) => {
        if (i === selectedItemIndex)
          return { ...item, winRate: item.winRate + 1 };
        else return item;
      })
    );

    if (currentPair + 1 < indexPairs.current.length) {
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
