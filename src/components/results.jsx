import { PHASES } from "../utils/enums";

export default function Results({ items, setPhase }) {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 text-center">
          <h2 className="my-4">
            Results <i className="bi bi-list-check"></i>
          </h2>
        </div>

        <div className="col-12 col-lg-6">
          <ul className="text-align-start">
            {
              // TODO: consider showing tied items differently? or showing winrate somehow?
            items
              .toSorted((a, b) =>
                a.winRate > b.winRate ? -1 : b.winRate > a.winRate ? 1 : 0
              )
              .map((item, i) => (
                <li key={i}>{item.input}</li>
              ))}
          </ul>
        </div>

        <div className="col-12 text-center">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setPhase(PHASES.INPUT)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
