import { PHASES } from "../utils/enums";
import LightDarkToggler from "./lightDarkToggler";

export default function Navbar({ setPhase }) {
  return (
    <div className="navbar navbar-expand-md">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => setPhase(PHASES.ABOUT)}
        >
          Pairwise
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarItems"
          aria-controls="navbarItems"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarItems" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={() => setPhase(PHASES.ABOUT)}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={() => setPhase(PHASES.INPUT)}
              >
                Start Ranking
              </a>
            </li>
            <li className="nav-item">
              <LightDarkToggler />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
