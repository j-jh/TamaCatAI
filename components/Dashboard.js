// Dashboard.js
"use client";
import { useState } from "react"
import { useCat } from "@/context/CatContext";
import { useRouter } from "next/navigation";

// TODO: Functions that update cat state
// Add log out confirmation
// Fetch cat state from db

// Feed
// Sleep.. etc

export default function Dashboard() {
    const router = useRouter();
    const [chat, setChat] = useState("");
    const { cat, setCat } = useCat();
    const [awaitAPI, setAwaitAPI] = useState(false);

    async function handleSend() {
        console.log(chat);
        setAwaitAPI(true);
        // Wait 
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChat("");
        setAwaitAPI(false);
    }

    async function handleLogOut() {
        setAwaitAPI(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAwaitAPI(false);
        router.push("/login")
    }

    return (
        <div>
            dashboard
            <br />
            <br />
            <p>[ {cat.name} ] || [exp: {cat.exp}] [$ {cat.money}]</p>
            <p>[hunger: {cat.hunger} || affection: {cat.affection} || energy: {cat.energy} ]</p>
            <h1> =========</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1>||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||</h1>
            <h1> =========</h1>
            <textarea placeholder="chat with cat"
                onChange={(e) => setChat(e.target.value)}
                value={chat}></textarea>
            <button onClick={handleSend} disabled={awaitAPI || !chat}>
                {awaitAPI ? "sending..." : "send"}
            </button>
            <br />
            <br />
            <button>button1</button>
            <button>button2</button>
            <button>button3</button>
            <br />
            <br />
            <button onClick={handleLogOut} disabled={awaitAPI}>
                {!awaitAPI ? "log out" : "logging out..."}
            </button>
        </div>
    )
}