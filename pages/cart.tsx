import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState(["Item 1", "Item 2"]);

  const removeItem = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

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
        <h1>Cart Page</h1>
        {cartItems.length === 0 ? <p>Your cart is empty</p> : null}
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
