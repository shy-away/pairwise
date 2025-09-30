import { newInitializedItem } from "../utils/helpers";

export default function InputItems({
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
