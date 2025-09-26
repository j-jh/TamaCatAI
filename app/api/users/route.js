/* 
    route.js
    -----
    Contains APIs for user accounts management
    - Get all accounts
    - Delete account
*/

// route: /api/users

/*
    Table: users
    ----------
    id (integer) | username (char 12) | password (text)

*/
import pool from '@/services/database';
import { apiError, apiSuccess } from '@/services/errorResponses';
import { verifyUser } from '@/services/authentication';

/*
    GET
    /api/users

    Gets account information for all users

    Parameters:
    - none

    Behavior:
    - Gets all user data from the database
    - Returns a JSON object containing rows of all users if successful
    - Returns an error if GET fails
*/
export async function GET() {
    console.log("get... ");
    try {
        const result = await pool.query('SELECT * FROM users');

        return apiSuccess(
            "Successfully fetched all user data",
            result.rows,
            200
        )
    } catch (error) {
        return apiError(
            "Failed to process GET request: " + error.message,
            500
        )
    }
}

/*
    DELETE
    /api/users?id={id}

    Deletes account with matching user ID

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 

    Query Parameter:
    - id: ID of the user whose account will be deleted

    Behavior:
    - Deletes the user with matching ID from the database
    - Returns the deleted user's account data if successful
    - Returns an error if the user does not exist or if DELETE fails
*/
export async function DELETE(req) {
    try {
        console.log("deleting...")
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return apiError(
                "Missing parameter ID",
                400
            )
        }
        const deleteUser = await pool.query('DELETE FROM users WHERE ID= $1 RETURNING *', [id]);
        console.log(id);
        if (deleteUser.rows.length === 0) {
            return apiError(
                `User ${id} does not exist`,
                404
            )
        }
        return apiSuccess(
            "Successfully deleted user data",
            deleteUser.rows,
            200
        )
    } catch (error) {
        return apiError(
            "Failed to process DELETE request: " + error.message,
            500
        )
    }
}

/*
    PATCH

    Rename user account

    {
        "newName": "string (max len __ )"
    }
*/

export async function PATCH(req) {
    try {
        console.log("changing username...")
        // let authUser;
        // try {
        //     authUser = verifyUser(req);
        // } catch (error) {
        //     return apiError(
        //         error.message,
        //         401
        //     );
        // }
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get("id");

        if (!userID) {
            return apiError(
                "Missing parameter: ID",
                400
            )
        }
        const body = await req.json();
        console.log(body);

        if (!body) {
            return apiError(
                "Missing parameter: JSON",
                400
            )
        }
        const {newName} = body;
        // Code to update username in db
        const sqlQuery = await pool.query(`UPDATE users SET username = $1 WHERE id = $2 RETURNING *`, [newName, userID])
        // UPDATE users SET username = $1 WHERE id = $2 RETURNING *;

        return apiSuccess(
            "Successfully updated username",
            sqlQuery.rows[0],
            200
        );

    } catch (error) {
        return apiError(
            "Failed to process PATCH request: "+ error.message,
            500
        )
    }
}