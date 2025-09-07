import React from "react";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/listing">Listing</Link>
        <Link href="/cart">Cart</Link>
      </nav>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to My E-commerce Site</h1>
        <p>This is the home page.</p>
      </div>
    </div>
  );
}
