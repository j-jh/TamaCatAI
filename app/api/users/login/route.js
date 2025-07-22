// POST API to verify login credentials to user in "users" table
// route: /api/users/login
import pool from "@/services/database";

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
        const body = await req.json();
        // Parses username, password from JSON body
        const { username, password } = body;
        // Query to db
        const login = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

        if (login.rows.length === 0) {
            return Response.json(`No matching credentials for: ${username}`);
        }
        return Response.json({
            message: `Success! Logged in as: ${username}`,
            user: login.rows
        });

    } catch (error) {
        return Response.json({
            error: "Failed to req login",
            msg: error.message
        })
    }
}