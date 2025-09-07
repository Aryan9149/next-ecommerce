import { useState } from "react";

export default function Listing() {
  const [items] = useState(["Item 1", "Item 2", "Item 3"]);

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
        <h1>Item Listing</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item} <button>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
