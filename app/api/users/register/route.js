// POST api to insert new user information to "users" table
// route: /api/users/register
import pool from "@/services/database";

/*
    POST API endpoint
    Parameter of HTTPS request object with expected JSON body
    Queries post request with given username, password 
    Returns with JSON of the new user info on success
    Error if username already exists, or request fails

    Expected JSON body:
        {
            "username": "",
            "password": ""
        }
*/
export async function POST(req) {
    try {
        console.log("posting...");
        // Parses username, password contents from JSON object body
        const body = await req.json();
        // Input validation (length, password matching) checked in front end
        const {username, password} = body;
        // Checks if username unique
        console.log("Username: ", username);
        const uniqueUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        // console.log(uniqueUser);
        if (uniqueUser.rows.length !== 0) {
            return Response.json( {
                error: `Username '${username}' already taken`
            })
        }

        // Query to submit to db
        const register = await pool.query(`INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`,
            [username, password]
        ); 
        // To check if included in full users table
        const getAll = await pool.query(`SELECT * FROM users`);
        return Response.json({
            register: register.rows,
            getAll: getAll.rows
        });
    } catch (error) {
        return Response.json({error: "Failed to post: ", msg: error.message});
    }
}