/*
    Onboarding.js
    ----- 
    Welcome page for first time users to set cat name

    Props/State:
    - cat: Global cat state for cat data
    = name: string of cat name
    - hasName: boolean for name existence 
    - errors: object with error messages for validation, API errors
    - awaitAPI: boolean to store API call await status
    - focus: 

    Handlers and Behaviors:
    - handleSubmitName()
        Ensures cat name length is valid
        Updates cat state with new name, clears errors 
    - handleClear()
        Clears name, errors state
    - createCat()
        Fetches post request to /api/cats/create-cat with JWT, catName
        Returns cat data on success, null on failure or API error, updates error state
    - handleBegin()
        Checks hasName state to confirm if name set
        Calls createCat() 
        Routes user to dashboard on success

    Additional notes:
    -
*/

"use client";
import { useState } from "react";
import { useCat } from "@/context/CatContext";
import { useRouter } from "next/navigation";

export default function Onboarding() {
    const router = useRouter();
    const { cat, setCat } = useCat();
    const [name, setName] = useState("");
    const [focus, setFocus] = useState(false);
    const [hasName, setHasName] = useState(false);
    const [awaitAPI, setAwaitAPI] = useState(false);
    // Error object for storing messages
    const [errors, setErrors] = useState({
        nameLen: '',
        nameSet: '',
        apiError: '',
    })

    // Checks name length validation before setting name
    function handleSubmitName() {
        if (name.length <= 2 || name.length > 8) {
            setErrors(prevErrors => ({ ...prevErrors, nameLen: 'name must be 3-8 characters' }));
            return;
        }
        setCat({
            ...cat, name: name
        })
        setHasName(true);
        setErrors({
            nameLen: '',
            nameSet: '',
            apiError: '',
        });


    }
    // Fetches cat api, passes user ID as JWT payload and catName as JSON
    async function createCat() {
        try {
            const response = await fetch('/api/cats/create-cat', {
                method: "POST",
                body: JSON.stringify(
                    {
                        catName: name,
                    }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setErrors(prev => ({
                    ...prev,
                    apiError: data.message,
                }))
                return null;

            }
            return data;

        } catch (error) {
            console.log("api err");
            console.log(errors.apiError);
            setErrors(prev => (
                {
                    ...prev,
                    apiError: error.message
                }));
            return null;
        }
    }

    // Checks name set, calls createCat(), routes to dashboard if successful
    async function handleBegin() {
        // Return error if name not set
        if (!hasName) {
            setErrors(prevErrors => ({ ...prevErrors, nameSet: 'name must be first set' }))
            return;
        }
        setAwaitAPI(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const newCatSuccess = await createCat();
        setAwaitAPI(false);
        if (!newCatSuccess) {
            // Set error
            return;
        }
        // Route to dashboard
        router.push("/dashboard");
    }

    // Disables clear button when input null
    const enableSubmit = name.length > 0;

    // Clears errors, name field
    function handleClear() {
        setName("");
        setErrors({
            nameLen: '',
            nameSet: '',
            apiError: '',
        });
    }

    return (
        <div>
            <h1>test</h1>
            <h1>{cat.name}</h1>
            <input value={name}
                onFocus={() => setFocus(!focus)}
                onChange={(e) => setName(e.target.value)}
                placeholder="gimme a good name" />
            <button type="button" onClick={handleSubmitName}>set name</button>
            <button type="button" onClick={handleClear} disabled={!enableSubmit}>clear</button>
            {errors.nameLen ? <p style={{ color: 'red' }}>{errors.nameLen}</p> : <><br /> <br /></>}
            {errors.nameSet ? <p style={{ color: 'red' }}>{errors.nameSet}</p> : <><br /></>}
            {errors.apiError ? <p style={{ color: 'red' }}>{errors.nameSet}</p> : <><br /></>}
            <button type="button" onClick={handleBegin} disabled={awaitAPI}>
                {!awaitAPI ? "let's begin!" : "making cat..."}
            </button>
        </div>
    )
}