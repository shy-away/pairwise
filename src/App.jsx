import { useState } from "react";
import { newInitializedItem } from "./utils/helpers";
import InputItems from "./components/inputItems";
import Ranker from "./components/ranker";
import Results from "./components/results";
import About from "./components/about";
import { PHASES } from "./utils/enums";
import Navbar from "./components/navbar";

// TODO: Create footer
// TODO: Implement dark mode using data-bs-theme="dark" on <html> element https://getbootstrap.com/docs/5.3/customize/color-modes/#dark-mode

function App() {
  const [phase, setPhase] = useState(PHASES.ABOUT);
  const [items, setItems] = useState([newInitializedItem()]);
  const [rankThoughts, setRankThoughts] = useState("");

  return (
    <>
      <Navbar {...{ setPhase }}/>
      {
        // TODO: delete border later?
      }
      <div className="container-md p-3 border">
        <div className="row align-items-center justify-content-center">
          <div className="col col-md-10">
            {phase === PHASES.ABOUT && <About {...{ setPhase }}/>}
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
