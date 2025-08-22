/*
    Register.js
    ----- 
    Renders user registration form with username, password, pass confirmation, and buttons.

    Props/State:
    - user: string of current username input
    - pass: string of current password input
    - confirmPass: string of current password confirmation input
    - errors: object with error messages for validation, API errors
    - awaitAPI: boolean to store API call await status
    - showPass: boolean to toggle pass visibility\
    - focus ? 

    Handlers and Behaviors:
    - postUser()   
        Sends post request to /api/users/register with username, password
        Returns true on success, false if API error then updates error state
    - onRegisterSubmit(e: event)
        Handles form submission and input validation
        Calls postUser
        Sets error, awaitAPI state
        Routes user to /onboarding on API success 
    - handleClear()
        Clears all input fields, error state

    Additional Notes:
    - 
*/
// TODO: STYLING

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const router = useRouter();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errors, setErrors] = useState({
        passMatch: '',
        passLength: '',
        userLength: '',
        apiError: ''
    })
    const [focus, setFocus] = useState({
        user: false,
        pass: false,
    })
    const [awaitAPI, setAwaitAPI] = useState(false);
    const [showPass, setShowPass] = useState(false);

    // Sends post request to /api/users/register
    // Returns boolean for success/failure
    async function postUser() {
        try {
            const response = await fetch('/api/users/register', {
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

            if (!response.ok) {
                setErrors(prev => ({
                    ...prev,
                    apiError: data.message
                }));
                return false;
            }
            console.log(data);
            return true;
        } catch (error) {
            console.log(error);
            setErrors(prev => ({
                ...prev,
                apiError: error.message
            }));
            return false;
        }
    }
    
    // Handles form submission and input validation
    async function onRegisterSubmit(e) {
        let validForm = true;
        e.preventDefault();
        const newError = {
            passMatch: '',
            passLength: '',
            userLength: '',
        }
        if (pass !== confirmPass) {
            newError.passMatch = "passwords do not match";
            validForm = false;
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
        // Wait 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        const successAPI = await postUser();
        setAwaitAPI(false);
        if (!successAPI) {
            return;
        }
        router.push("/onboarding");
    }

    // Clears user, pass, pass confirm, and error messages
    function handleClear() {
        setUser("");
        setPass("");
        setConfirmPass("");
        setErrors({
            passMatch: '',
            passLength: '',
            userLength: '',
            apiError: '',
        })
    }
    // Checks if any values in input fields to enable clear button
    const enableClear = (user.length > 0) || (pass.length > 0) || (confirmPass.length > 0);

    // Checks if any values in pass fields to enable show/hide toggle
    const enableShowHide = (pass.length > 0) || (confirmPass.length > 0);

    return (
        <div>
            <h1>register</h1>
            <form onSubmit={(e) => onRegisterSubmit(e)}>
                <input type="text" placeholder="username" aria-label="Username" value={user}
                    onChange={(e) => setUser(e.target.value)} />
                <br />
                {errors.userLength && <p style={{ color: 'red' }}>{errors.userLength}</p>}

                <input type={showPass ? "text" : "password"} placeholder="password" value={pass}
                    onChange={(e) => setPass(e.target.value)} />
                <br />
                {errors.passLength && <p style={{ color: 'red' }}>{errors.passLength}</p>}

                <input type={showPass ? "text" : "password"} placeholder="confirm password" value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)} />
                <br />
                {errors.passMatch && <p style={{ color: 'red' }}>{errors.passMatch}</p>}

                {errors.apiError && <p style={{ color: 'red' }}>{errors.apiError}</p>}
                <button type="button" disabled={!enableShowHide}
                    onClick={() => setShowPass(!showPass)}>{!showPass ? 'show' : 'hide'}</button>
                <br />

                <button type="submit" disabled={awaitAPI}>
                    {awaitAPI ? "prepping cat..." : "meet my cat!"}
                </button>
                <button type="button" disabled={!enableClear} onClick={handleClear}>clear</button>
            </form>
            <Link href="/"><button type="button">return...</button></Link>
        </div>
    )
}