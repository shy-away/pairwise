import { useState } from "react";

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
            {phase === 1 && <Ranker {...{ items, rankThoughts, setPhase }} />}
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
      prev.map((e) => {
        if (e.id === id)
          return {
            input: event.target.value,
            id: e.id,
          };
        else return e;
      })
    );
  };

  return (
    <div id="input-items" className="text-center">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col col-lg-5">
            <h2 className="my-4">Enter your items below.</h2>
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
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col col-lg-5">
            <h2>
              How do you want to rank your items?{" "}
              <em className="text-body-secondary">Optional.</em>
            </h2>
            <textarea
              id="rankThoughts"
              onChange={(e) => setRankThoughts(e.target.value)}
              placeholder="Which task should I do first?"
              style={{
                width: "70%",
                minHeight: "15vh",
              }}
            >
              {rankThoughts}
            </textarea>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => setPhase(1)}>
        Next
      </button>
    </div>
  );
}

function Ranker({ items, rankThoughts, setPhase }) {
  return (
    <div id="ranker">
      <h2>Inputs:</h2>
      <ul>
        {items.map((e) => (
          <li key={e.id}>{e.input}</li>
        ))}
      </ul>
      <div>
        {rankThoughts}
      </div>
      <button className="btn btn-primary" onClick={() => setPhase(0)}>
        Back
      </button>
    </div>
  );
}

/**
 * Create a new item.
 * @returns A new item object of shape `{ input: "", id: "id<randomized-id>" }`.
 */
function newInitializedItem() {
  return {
    input: "",
    id: "id" + Math.random().toString(16).slice(2),
  };
}

export default App;
