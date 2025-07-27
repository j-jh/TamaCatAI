// POST API to verify login credentials to user in "users" table
// route: /api/users/login
import pool from "@/services/database";
import { apiSuccess, apiError } from "@/services/response";

/*
    POST API endpoint
    Parameter of HTTPS request object with expected JSON body
    Queries post request with given username, password 
    Returns with JSON object of matching user object upon success
    Error if credentials mismatch, req fails

    Expected JSON body:
        {
            "username": "",
            "password": ""
        }
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

        // Query to db
        const login = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

        if (login.rows.length === 0) {
            return apiError(
                "Invalid login credentials",
                401
            )
        };
        return apiSuccess(
            "Login success",
            login.rows,
            200
        );

    } catch (error) {
        return apiError(
            "Failed to process POST request for LOGIN API",
            500
        )
    }
}