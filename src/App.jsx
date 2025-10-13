import { newInitializedItem } from "./utils/helpers";
import InputItems from "./components/inputItems";
import Ranker from "./components/ranker";
import Results from "./components/results";
import About from "./components/about";
import { PHASES } from "./utils/enums";
import Navbar from "./components/navbar";
import { useLocalStorage } from "usehooks-ts";

// TODO: Create footer

function App() {
  const [phase, setPhase] = useLocalStorage("phase", PHASES.ABOUT);
  const [items, setItems] = useLocalStorage("items", [newInitializedItem()]);
  const [rankThoughts, setRankThoughts] = useLocalStorage("rankThoughts", "");

  return (
    <>
      <Navbar {...{ setPhase }} />
      <div className="container-md p-3">
        <div className="row align-items-center justify-content-center">
          <div className="col col-md-10">
            {phase === PHASES.ABOUT && <About {...{ setPhase }} />}
            {phase === PHASES.INPUT && (
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
            {phase === PHASES.RANK && (
              <Ranker {...{ items, setItems, rankThoughts, setPhase }} />
            )}
            {phase === PHASES.RESULTS && <Results {...{ items, setPhase }} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
