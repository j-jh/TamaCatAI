import pool from '@/services/database';


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