// Dashboard.js
"use client";
import Link from "next/link"
import { useState } from "react"
import { useCat } from "@/context/CatContext";

export default function Dashboard() {

    const [chat, setChat] = useState("");
    const { cat, setCat } = useCat();

    function handleSend() {
        console.log(chat);
        setChat("");
    }

    return (
        <div>
            dashboard
            <br />
            <br />
            <p>[ {cat.name} ] || [exp: __]</p>
            <p>[hunger:_|| affection:_ || energy:_ ]</p>
            <h1> =========</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1> =========</h1>
            <textarea placeholder="chat with cat"
                onChange={(e) => setChat(e.target.value)}></textarea>
            <button onClick={handleSend}>send</button>
            <br />
            <br />
            <button>button1</button>
            <button>button2</button>
            <button>button3</button>
            <br />
            <br />
            <Link href="/"><button type="button">log out...</button></Link>
        </div>
    )
}