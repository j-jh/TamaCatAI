/*
    Login.js
    ----- 
    Renders user login form with username, password, and buttons.

    Props/State:
    - user: string of current username input
    - pass: string of current password input
    - errors: object with error messages for validation, API errors
    - awaitAPI: boolean to store API call await status
    - showPass: boolean to toggle pass visibility

    Handlers and Behaviors:
    - loginUser()   
        Sends post request to /api/users/login with username, password
        Returns true on success, false if API error then updates error state
    - onLoginSubmit(e: event)
        Handles form submission and input validation
        Calls loginUser()
        Sets error, awaitAPI state
        Routes user to /dashboard on API success 
    - handleClear()
        Clears all input fields, error state

    Additional Notes:
    - 
*/

// TODO: STYLING
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [errors, setErrors] = useState({
        passLength: '',
        userLength: '',
        apiError: '',
    })
    const [showPass, setShowPass] = useState(false);
    const [awaitAPI, setAwaitAPI] = useState(false);

    // Sends post request to /api/users/login
    // Returns boolean for success/failure
    async function loginUser() {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: user,
                        password: pass,
                    }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setErrors(prev => (
                    {
                        ...prev,
                        apiError: data.message
                    }
                ));
                return false;
            }
            return true;
        } catch (error) {
            console.log("api err");
            setErrors(prev => (
                {
                    ...prev,
                    apiError: error.message
                }));
            return false;
        }
    }

    // Handles form submission and input validation
    async function onLoginSubmit(e) {
        let validForm = true;
        e.preventDefault();
        const newError = {
            passLength: '',
            userLength: '',
        }
        if (user.length === 0 || user.length < 3 || user.length > 10) {
            newError.userLength = "username must be 3-10 characters long";
            validForm = false;
        }
        if (pass.length === 0 || pass.length < 8 || pass.length > 32) {
            newError.passLength = "password must be 8-32 characters long";
            validForm = false;
        }
        setErrors(newError);
        if (!validForm) {
            return;
        }
        setAwaitAPI(true);
        // Wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        const successAPI = await loginUser();
        setAwaitAPI(false);
        if (!successAPI) {
            return;
        }
        // route to dashboard
        router.push("/dashboard");
    }

    // Clears user, pass, and error messages
    function handleClear() {
        setUser("");
        setPass("");
        setErrors({
            passLength: '',
            userLength: '',
        })
    }
    // Checks if any values in input fields to enable clear button
    const enableClear = (user.length > 0) || (pass.length > 0);

    // Checks if any values in pass field to enable show/hide toggle
    const enableShowHide = (pass.length > 0);

    return (
        <div>
            <h1>login</h1>
            <form onSubmit={(e) => onLoginSubmit(e)}>
                <input type="text" placeholder="username" aria-label="Username" value={user}
                    onChange={(e) => setUser(e.target.value)} />
                <br />
                {errors.userLength && <p style={{ color: 'red' }}>{errors.userLength}</p>}

                <input type={showPass ? "text" : "password"} placeholder="password" value={pass}
                    onChange={(e) => setPass(e.target.value)} />
                <button type="button" disabled={!enableShowHide}
                    onClick={() => setShowPass(!showPass)}>{!showPass ? 'show' : 'hide'}</button>
                <br />
                {errors.passLength && <p style={{ color: 'red' }}>{errors.passLength}</p>}
                {errors.apiError && <p style={{ color: 'red' }}>{errors.apiError}</p>}

                <button type="submit" disabled={awaitAPI}>
                    {awaitAPI? "waking up cat..." :  "take me to my cat!"}
                </button>
                <button type="button" disabled={!enableClear} onClick={handleClear}>clear</button>
            </form>
            <Link href="/"><button type="button">return...</button></Link>
        </div>
    )
}