export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "grey",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1>Wild socks</h1>
        <h2>the best socks in town</h2>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Catalog</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
