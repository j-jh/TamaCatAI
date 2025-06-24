// Register.js
// Renders form component with username, password, pass confirmation, and input validation
// Toggle show password, return to home screen, submit registration, clear buttons

// TODO: SUBMIT TO DATABASE
// TODO: STYLING

"use client";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    // Stores error messages 
    const [errors, setErrors] = useState({
        passMatch: '',
        passLength: '',
        userLength: '',
        // userTaken: ''
    })
    // Toggles pass visibility 
    const [showPass, setShowPass] = useState(false);

    /*
    Handles input validation upon form submission. Checks...
        - Username, password length
        - Password, pass confirmation match
        - Sets errors to new error object
        - Confirms if valid from errors before submitting
    */
    function onRegisterSubmit(e) {
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
        // otherwise if no errors, submit info
        console.log("user: ", user, "\npass: ", pass);
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
        })
    }
    // Checks if any values in input fields to enable clear button
    const enableClear = (user.length > 0) || (pass.length > 0) || (confirmPass.length > 0);

    // Checks if all input fields are valid to enable submit button
    const enableSubmit = (pass === confirmPass) && 
    (pass.length >= 8 && pass.length <= 32) && 
    (user.length >= 3 && user.length <= 10);

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

                <button type="button" disabled={!enableShowHide} 
                onClick={() => setShowPass(!showPass)}>{!showPass ? 'show' : 'hide'}</button>
                <br />

                {/* disable buttons until valid*/}
                <button type="submit" disabled={!enableSubmit}>take me to my cat!</button>
                <button type="button" disabled={!enableClear} onClick={handleClear}>clear</button>
            </form>
            <Link href="/"><button type = "button">return...</button></Link>
        </div>
    ) 
}