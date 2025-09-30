import { useState } from "react";
import { newInitializedItem } from "./utils/helpers";
import InputItems from "./components/inputItems";
import Ranker from "./components/ranker";
import Results from "./components/results";

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
            {phase === 2 && <Results {...{ items, setPhase }} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
