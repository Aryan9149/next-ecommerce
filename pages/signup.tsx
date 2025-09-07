export default function Signup() {
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
        <h1>Signup Page</h1>
        <form>
          <input type="text" placeholder="Name" /><br />
          <input type="email" placeholder="Email" /><br />
          <input type="password" placeholder="Password" /><br />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
