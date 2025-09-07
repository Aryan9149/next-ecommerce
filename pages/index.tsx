export default function Home() {
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
        <a href="/listing">Listing</a>
        <a href="/cart">Cart</a>
      </nav>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to My E-commerce Site</h1>
        <p>This is the home page.</p>
      </div>
    </div>
  );
}
