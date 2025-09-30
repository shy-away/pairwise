export default function Results({ items }) {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
  }

  return (
    <div>
      {items
        .toSorted((a, b) =>
          a.winRate > b.winRate ? -1 : b.winRate > a.winRate ? 1 : 0
        )
        .map((item, i) => (
          <div key={i}>{item.input}</div>
        ))}
    </div>
  );
}
