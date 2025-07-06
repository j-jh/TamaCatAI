"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Register from "@/components/Register";
import Link from "next/link";
import { CatProvider } from "@/context/CatContext";

// npm run dev

// welcome page
export default function Home() {
  return (
    <div>
      <h1>welcome to TamaCatAI!</h1>
      <Link href="/login"><button type = "button">login</button></Link>
      <br />
      <Link href="/register"><button type = "button">sign up</button></Link>
      <br />
      <Link href="/about">about</Link>
      <Link href="/contact">contact</Link>
    </div>
  );
}
