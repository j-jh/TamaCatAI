// GET api endpoint to return all registered users from "users" table
import pool from '@/services/database';

/*
    API endpoint
    Connects to database with connection pool, and executes the select query
    Returns with JSON array of all users, or error if fails
*/
export async function GET() {
    // return Response.json("hello")
    console.log("get... ");
    try {
        const result = await pool.query('SELECT * FROM users');
        // Create 
        return Response.json(result.rows);
    } catch (error) {
        console.error("err: ", error);
        return Response.json(error);
    }
}