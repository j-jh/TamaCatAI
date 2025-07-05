// Onboard.js
// Welcome screen for first time users to set cat name

// TODO: Connect to db
// TODO: Styling 

"use client";
import { useState } from "react";
import { useCat } from "@/context/CatContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Onboarding() {
    const router = useRouter();
    const { cat, setCat } = useCat();
    const [name, setName] = useState("");
    const [focus, setFocus] = useState(false);
    // Boolean to track if name set
    const [hasName, setHasName] = useState(false);

    // Error object for storing messages
    const [errors, setErrors] = useState({
        nameLen: '',
        nameSet: '',
    })

    // Checks name length validation before setting name
    function handleSubmitName() {
        // Check name length, return error if req not met
        if (name.length <= 2 || name.length > 8) {
            setErrors(prevErrors => ({...prevErrors, nameLen: 'name must be 3-8 characters'}));
            return;
        }
        setCat({
            ...cat, name: name
        })
        setHasName(true);
        setErrors({
            nameLen: '',
            nameSet: '',
        });
    }
    
    // Checks name set before routing to dashboard
    function handleBegin() {
        // Return error if name not set
        if (!hasName) {
            setErrors(prevErrors => ({...prevErrors, nameSet: 'name must be first set'}))
            return;
        }
        // Route to dashboard
        router.push("/dashboard");
    }

    // Disables clear button when input null
    const enableSubmit = name.length > 0;

    function handleClear() {
        setName("");
        setErrors({
            nameLen: '',
            nameSet: '',
        });
    }
    
    return (
        <div>
            <h1>test</h1>
            <h1>{cat.name}</h1>
            <input value={name} 
                onFocus={() => setFocus(!focus)}
                onChange={(e) => setName(e.target.value)}
                placeholder="gimme a good name"/>
            <button type="button" onClick={handleSubmitName}>set name</button>
            <button type="button" onClick={handleClear} disabled={!enableSubmit}>clear</button>
            {errors.nameLen ? <p style={{ color: 'red' }}>{errors.nameLen}</p> : <><br/> <br/></>}
            {errors.nameSet ? <p style={{ color: 'red' }}>{errors.nameSet}</p> : <><br/></>}
            <button type="button" onClick={handleBegin}>let's begin!</button>
        </div>
    )
}