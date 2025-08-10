/* 
    route.js: Register API
    =====
    Contains functions for user registration
    - Hash password
    - POST API to register user
*/

import pool from "@/services/database";
import { apiError, apiSuccess } from "@/services/errorResponses";

const bcrypt = require('bcrypt');

/*
    hashPassword

    Hashes plain text password using bcrypt

    Function Parameter:
    - password as plain text

    Returns:
    - hashed password

*/
async function hashPassword(plainPass) {
    const saltRounds = 10;
    // 10 rounds of hashing
    const hashedPass = await bcrypt.hash(plainPass, saltRounds);
    // console.log(hashedPass);
    return hashedPass;
}

/*
    POST API
    /api/users/register

    Registers a new user into the database

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 
    
    Expected JSON Request Body:
        {
            "username": "string (max len 12)",
            "password": "string"
        }

    Behaviors:
    - Validates the JSON body, username uniqueness
    - Posts the username and encrypted password into the database 
    - Returns a success message with the user info on success
    - Returns an error if parameters, username uniqueness, API call fails
*/
export async function POST(req) {
    try {
        console.log("posting...");

        let body;
        try {
            body = await req.json();
        } catch {
            return apiError(
                "Invalid JSON body",
                400
            )
        };
        // Input validation (length, password matching) checked in front end
        const {username, password} = body;
        if (!username || !password) {
            return apiError(
                "JSON body missing username and/or password",
                400
            )
        };
        // Checks if username unique
        console.log("Username: ", username);
        const uniqueUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        // console.log(uniqueUser);
        if (uniqueUser.rows.length !== 0) {
            return apiError(
                `Username ${username} already taken`,
                400
            )
        };
        // Hash password
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);

        // Query to submit to db
        const register = await pool.query(`INSERT INTO users (username, password) VALUES ($1,$2) RETURNING id, username`,
            [username, hashedPassword]
        ); 

        return apiSuccess(
            "Registration success",
            register.rows,
            200
        );
    } catch (error) {
        return apiError(
            "Failed to process POST request for REGISTER API",
            500
        )
    }
}