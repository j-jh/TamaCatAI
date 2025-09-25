// Dashboard.js
"use client";
import { useState, useEffect } from "react"
import { useCat } from "@/context/CatContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// TODO: Functions that update cat state
// Add log out confirmation
// Fetch cat state from db -- 
// Fetch username from jwt


// Feed
// Sleep.. etc

export default function Dashboard() {
    const router = useRouter();
    const [chat, setChat] = useState("");
    const { cat, setCat } = useCat();
    const [awaitAPI, setAwaitAPI] = useState(false);
    const [username, setUsername] = useState("");

    const [test, setTest] = useState(null);
    const [idFromJWT, setId] = useState();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            // maybe return to login?
            return;
        }
        try {
            const { id, username } = jwtDecode(token);
            console.log(username);
            setUsername(username);
            setId(id)
            // fetchCat here?
            fetchCat(id);
            printData();

        } catch (error) {
            // invalid token, maybe return to login?
        }
    }, []);

    useEffect(() => {
        if (test) {
            console.log("Updated cat data:", test[0]);
            setCat(prev => ({
                ...prev,
                ...test[0]
            }));
        }
    }, [test]);

    useEffect(() => {
        console.log(cat);
    }, [cat])
    // Update later to not need to pass userID
    async function updateCat(changesObject) {
        try {
            const response = await fetch(`/api/cats/my-cat?userid=${idFromJWT}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(changesObject)
            })
            const data = await response.json();
            console.log(data);

        } catch (error) {

        }
    }
    function testFeed() {
        setCat(prev => {
            const newHunger = cat.hunger + 50;
            updateCat({hunger: newHunger});
            return { ...prev, hunger: newHunger}
        })
    }

    function testStarve() {
        setCat(prev => {
            const newHunger = 0;
            updateCat({hunger: newHunger});
            return { ...prev, hunger: newHunger}
        })
    }

    // Update to get userID from jwt
    async function fetchCat(userID) {
        try {
            const response = await fetch(`/api/cats/my-cat?userID=${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            const data = await response.json();
            console.log(data.data);
            setTest(data.data)
            console.log(52);
        } catch (error) {

        }
    }

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
        router.push("/")
    }

    const [showRename, setShowRename] = useState(false); 
    const [newName, setNewName] = useState("");

    function testRename() {
        setCat( prev => {
            const updateName = newName;
            updateCat({name: updateName});
            return {... prev, name: updateName}
        })
        setShowRename(false);
    }

    return (
        <div>
            dashboard
            <br />
            <br />
            {showRename && <input onChange={e => setNewName(e.target.value)}></input>}
            <button onClick={() => setShowRename(!showRename)}>
                {!showRename ? <>Rename cat</> : <>Exit</>}
            </button>
            <br/>
            {showRename && <button onClick={testRename}>Rename</button>}

            <p>{username} || <button onClick={handleLogOut} disabled={awaitAPI}>
                {!awaitAPI ? "log out" : "logging out..."}
            </button></p>
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
            <button onClick={testFeed}>test feed</button>
            <button onClick={testStarve}>test starve</button>
            <button>button3</button>
            <br />
            <br />
        </div>
    )
}