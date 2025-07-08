// route.js
// Contains APIs for user account management
// Get all users
// Delete user
//

// route: /api/users
import pool from '@/services/database';

/*
    GET API endpoint
    Queries all user data from users table
    Returns JSON object array of all users
    Error if request failed
*/
export async function GET() {
    console.log("get... ");
    try {
        const result = await pool.query('SELECT * FROM users');
        // Create 
        return Response.json(result.rows);
    } catch (error) {
        console.error("err: ", error);
        return Response.json("Failed to get: ", error);
    }
}

/*
    DELETE API endpoint
    Parameter of HTTP request object with user ID as query 
    Queries delete user with matching ID from db
    Returns JSON object of deleted user if exists
    Error if ID does not exist, or request failed

    Expected query parameter:
        "id": value as integer
*/
export async function DELETE(req) {
    try {
        console.log("deleting...")
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const deleteUser = await pool.query('DELETE FROM users WHERE ID= $1 RETURNING *', [id]);
        console.log(id);
        if (deleteUser.rows.length === 0) {
            return Response.json({
                error: `User id ${id} does not exist`
            })
        }
        const allUsers = await pool.query('SELECT * FROM users');

        return Response.json({
            delete: deleteUser.rows,
            users: allUsers.rows
        })
    } catch (error) {
        return Response.json({
            error: `Failed to delete id: ${id}`,
            msg: error.message
        })
    }
}