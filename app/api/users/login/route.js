/* 
    route.js: Login API
    =====
    Contains function for user login:
    - Checks hashed password from database against plaintext password
    - POST request to log in users
*/
import pool from "@/services/database";
import { apiSuccess, apiError } from "@/services/response";

const bcrypt = require('bcrypt');

/*
    POST API
    /api/users/login

    Logs in a user if credentials match

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 
    
    Expected JSON Request Body:
        {
            "username": "string (max len 12)",
            "password": "string"
        }

    Behaviors:
    - Validates the JSON body, username, password fields 
    - Compares the plaintext password against the database's hashed password
    - Returns a success message with the user info on success
    - Returns an error if parameters, credentials, API call fails
*/
export async function POST(req) {
    try {
        console.log("Logging in...")
        let body;
        try {
            body = await req.json();
        } catch {
            return apiError(
                "Invalid JSON body",
                400
            )
        };

        // Parses username, password from JSON body
        const { username, password } = body;
        if (!username || !password) {
            return apiError(
                "JSON body missing username and/or password",
                400
            )
        };

        // Veryify if user exists
        const queryUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (queryUser.rows.length === 0) {
            return apiError(
                "Invalid login credentials",
                401
            )
        };
        const user = queryUser.rows[0];
        // Compare plaintext password with encrypted password in db
        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            return apiError(
                "Invalid login credentials",
                401
            )
        };
        
        return apiSuccess(
            "Login success",
            {
                id: user.id,
                username: user.username
            },
            200
        );

    } catch (error) {
        return apiError(
            "Failed to process POST request for LOGIN API",
            500
        )
    }
}