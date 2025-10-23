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

/*
    Cat structure for reference:
    cat = {
        name: "",
        hunger: 0,
        money: 0,
        affection: 0,
        energy: 0,
        exp: 0
    }
*/
const catFrames = [
`
^  >
(o o)
 >  >
v  -
`,
`
^  ^
(o o)
>  <
v  v
`,
`
^  ^
(- -)
>  <
v  v
`,
`
<  ^
(o o)
<  <
-  v
`,
];

export default function Dashboard() {
    const router = useRouter();
    const [chat, setChat] = useState("");
    const { cat, setCat } = useCat();
    const [awaitAPI, setAwaitAPI] = useState(false);
    const [username, setUsername] = useState("");

    const [test, setTest] = useState(null);
    const [idFromJWT, setId] = useState();

    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % catFrames.length);
        }, 400);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            // Return to login
            router.push("/login");
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
    const [showMenu, setShowMenu] = useState(false);

    async function testRename() {
        setAwaitAPI(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // pass name as new.. 
        updateCatStat("name", newName);
        setShowRename(false);
        setAwaitAPI(false);
    }

    // DOCUMENT LATER
    // Generalized to update indivdiual stats
    // param: cat obj property, int val
    // State then server
    async function updateCatStat(trait, value) {
        // [] for param str to obj prop
        const currVal = cat[trait];   // from useCat
        let newVal;
        // replace value if name
        if (trait == "name") {
            newVal = value;
        } else {
            // append to prev value if other 
            newVal = value === 0 ? 0 : currVal + value;
        }
        setCat(prev => {
            // can reset prop
            const newStat = { ...prev, [trait]: newVal };
            console.log(newStat);
            return newStat;
        });
        try {
            await updateCat({ [trait]: newVal })
        } catch (error) {
            console.log(error.message);
            // Revert state
            setCat(prev => {
                return { ...prev, [trait]: currVal }
            })
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                fontFamily: "monospace",
                textAlign: "center",
                padding: "1rem 0",
                // height: "100vh", <-- remove this
            }}
        >
            <div style={{ marginBottom: "0.5rem" }}>
                🤖 {username} |
                {!showMenu ? (
                    <button onClick={() => setShowMenu(true)}>settings</button>
                ) : (
                    <button
                        onClick={() => {
                            setShowMenu(false);
                            setShowRename(false);
                        }}
                    >
                        return
                    </button>
                )}
                {showMenu && (
                    <>
                        {showRename && (
                            <input
                                onChange={(e) => setNewName(e.target.value)}
                                style={{ marginLeft: "0.5rem" }}
                            ></input>
                        )}
                        <br />
                        <button
                            onClick={() => setShowRename(!showRename)}
                            disabled={awaitAPI}
                        >
                            {!showRename ? "rename cat" : "cancel"}
                        </button>
                        {showRename && (
                            <button
                                onClick={testRename}
                                disabled={awaitAPI || newName.length < 4}
                            >
                                Rename
                            </button>
                        )}
                        <br />
                        <button onClick={handleLogOut} disabled={awaitAPI}>
                            {!awaitAPI ? "log out" : "logging out..."}
                        </button>
                        <br />
                    </>
                )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Table */}
                <table
                    style={{
                        borderCollapse: "collapse",
                        border: "1px solid gray",
                        marginTop: "0.5rem",
                        textAlign: "center",
                        width: "auto",
                    }}
                >
                    <thead>
                        <tr>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                📛{cat.name}
                            </td>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                ⭐{cat.exp}
                            </td>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                💰{cat.money}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                🍖{cat.hunger}
                            </td>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                ❤️{cat.affection}
                            </td>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                ⚡{cat.energy}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                <button onClick={() => updateCatStat("hunger", 10)}>feed</button>
                            </td>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                <button
                                    onClick={() => {
                                        updateCatStat("hunger", -10);
                                        updateCatStat("affection", 10);
                                        updateCatStat("energy", -10);
                                    }}
                                >
                                    play
                                </button>
                            </td>
                            <td style={{ border: "1px solid gray", padding: "2px 6px" }}>
                                <button
                                    onClick={() => {
                                        updateCatStat("hunger", -10);
                                        updateCatStat("energy", 10);
                                    }}
                                >
                                    rest
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Cat */}
                <pre
                    style={{
                        width: "20ch", // same width as table
                        textAlign: "center",
                        lineHeight: "1.1",
                        fontSize: "0.9rem",
                        border: "1px solid gray",
                        padding: "0.3rem 0.8rem",
                        margin: "0 auto",
                    }}
                >
                    {catFrames[frameIndex]}
                </pre>
            </div>
            {/* Chat */}
            <div style={{ marginTop: "0.5rem" }}>
                <textarea
                    placeholder="chat with cat"
                    onChange={(e) => setChat(e.target.value)}
                    value={chat}
                    style={{
                        width: "20ch",
                        height: "3rem",
                        resize: "none",
                        border: "1px solid gray",
                        verticalAlign: "middle",
                    }}
                ></textarea>
                <div>
                    <button
                        onClick={handleSend}
                        disabled={awaitAPI || !chat}
                        style={{ marginTop: "0.3rem" }}
                    >
                        {awaitAPI ? "sending..." : "send"}
                    </button>
                </div>
            </div>
        </div>
    );
}