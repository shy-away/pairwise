import { useState } from "react";

function App() {
  const [phase, setPhase] = useState(0);

  return (
    <>
      {phase === 0 && <InputItems setPhase={setPhase} />}
    </>
  );
}

function InputItems({ setPhase }) {
  const [items, setItems] = useState([{ input: "", id: generateNewID() }]);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { input: "", id: generateNewID() }]);
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
      }
    )
    );
  };

  return (
    <div id="input-items" className="container m-4 p-3 border rounded">
      <h2>Enter your items below.</h2>
      <button className="btn btn-primary" onClick={handleAddItem}>
        Add an item
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="d-block m-3">
            <input
              type="text"
              value={item.input}
              onChange={(e) => handleInputChange(e, item.id)}
            />
            <button
              className="btn btn-danger"
              onClick={() =>
                setItems((prev) => prev.filter((e) => e.id !== item.id))
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => setPhase(1)}
      >
        Next
      </button>
    </div>
  );
}

function generateNewID() {
  return "id" + Math.random().toString(16).slice(2);
}

export default App;
