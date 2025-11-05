"use client";
import styles from "./page.module.css";
import Link from "next/link";

// npm run dev

// welcome page
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem", 
        textAlign: "center",
      }}
    >
      <h1>welcome to</h1>
      <h1>tamacatai! </h1>
      <Link href="/login">login</Link>
      <Link href="/register">sign up</Link>
      <Link href="">demo</Link>
      <Link href="/about">about</Link>
      <Link href="/contact">contact</Link>
    </div>
  );
}
