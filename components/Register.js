"use client";
import { useState } from "react";
import Link from "next/link";

// register page

/*
    user
    pass

    input validation
    user pass lenght req
    toggle pass visiblity
    null check
    clear buton
    error message tag

*/
export default function Register() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errors, setErrors] = useState({
        passMatch: '',
        passLength: '',
        userLength: '',
        // userTaken: ''
    })
    const [showPass, setShowPass] = useState(false);

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
        if (user.length === 0 || user.length < 3) {
            newError.userLength = "username must be 3-12 characters long";
            validForm = false;
        }
        if (pass.length === 0 || pass.length < 8) {
            newError.passLength = "password must be 8+ characters long";
            validForm = false;
        }
        setErrors(newError);
        if (!validForm) {
            return;
        }
        // otherwise if no errors, submit info
        console.log("user: ", user, "\npass: ", pass);
    }

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

    return (
        <div>
            <h1>register</h1>
            <form onSubmit={(e) => onRegisterSubmit(e)}>
                <input type="text" placeholder="username" aria-label="Username" value={user}
                    onChange={(e) => setUser(e.target.value)} />
                <br />
                {errors.userLength && <p>{errors.userLength}</p>}

                <input type={showPass ? "text" : "password"} placeholder="password" value={pass}
                    onChange={(e) => setPass(e.target.value)} />
                <br />
                {errors.passLength && <p>{errors.passLength}</p>}

                <input type={showPass ? "text" : "password"} placeholder="confirm password" value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)} />
                <br />
                {errors.passMatch && <p>{errors.passMatch}</p>}

                <button onClick={() => setShowPass(!showPass)}>{!showPass ? 'show' : 'hide'}</button>
                <br />
                <button type="submit">take me to my cat!</button>
                <button type="button" onClick={handleClear}>clear</button>
            </form>
            <button><Link href="/">return</Link></button>
        </div>
    )

}