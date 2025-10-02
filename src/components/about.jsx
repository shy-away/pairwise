import { PHASES } from "../utils/enums";

export default function About({ setPhase }) {
  return (
    <div className="container-fluid text-center text-lg-start">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="my-4">Rank Anything, One Pair at a Time</h1>
          <p>
            This app allows you to rank any set of items using{" "}
            <a href="https://en.wikipedia.org/wiki/Pairwise_comparison">
              pairwise comparison<i className="bi bi-link-45deg"></i>
            </a>
            . This ranking method is very versatile, and can be used for
            anything you can imagine.
          </p>
          <p>
            For example, you might have multiple tasks you need to do, and you
            need help prioritizing them. You could also use this app to rank
            colors, TV shows, food, dog breeds, music genres, or really any
            other group of things that you could have an opinion about.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setPhase(PHASES.INPUT)}
          >
            Start Ranking
          </button>
          <h3 className="mt-5 mb-3">How it Works</h3>
          <p>
            <div className="fw-medium d-inline">
              Start by entering your the items you want to rank.
            </div>{" "}
            For example, if you want to rank colors, you could enter "Red" for
            one item, "Orange" for the next, etc. You can add as many items as
            you like using the "Add Item" button. If you add too many items, you
            can delete items using the trash button next to the item you want to
            delete.
          </p>
          <p>
            Optionally, you can use a custom{" "}
            <div className="fw-medium d-inline">Ranking Question</div>. This is
            basically a reminder to yourself about how you want to rank your
            items. For example, if you want to rank songs by how much you think
            one of your friends might like them, you could enter a custom
            question of, "Which song do I think my friend would like?" and the
            app will show you that question when you're ranking those songs. If
            you don't set a custom Ranking Question, the app will show a default
            message of "Pick One..." when you're ranking items.
          </p>
          <p>
            <d className="fw-medium d-inline">
              Next -- the fun part -- rank your items!
            </d>{" "}
            You'll be presented each <em>pair</em> of items once, and you'll
            pick whichever of those two items aligns better, in your opinion,
            with how you want to rank them. Another example: If you're ranking
            plants by how cool you think they are, and you're presented with
            "Hibiscus" or "Venus Flytrap," you'll pick the Venus Flytrap because
            those things are cool. :P
          </p>
          <p>
            <div className="fw-medium d-inline">
              Finally, you'll see the results,
            </div>{" "}
            where all your items will be ranked based on how often you chose
            each item. If you were ranking aspects of a car that you'd consider
            when bying one (like price, brand, mileage, etc.), you might
            discover that the price of a car is more important to you than
            anything else, even the mileage.
          </p>
          <h4 className="my-3">
            Give it a try:{" "}
            <button
              className="btn btn-primary"
              onClick={() => setPhase(PHASES.INPUT)}
            >
              Start Ranking
            </button>
          </h4>
        </div>
      </div>
    </div>
  );
}
