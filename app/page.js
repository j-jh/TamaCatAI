"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Register from "@/components/Register";
import Link from "next/link";

// npm run dev

// welcome page
export default function Home() {
  return (
    <div>
      <h1>welcome to TamaCatAI!</h1>
      <button><Link href="/login">login</Link> </button>
      <br />
      <button><Link href="/register">register</Link> </button>
      <br />
    </div>
  );
}
