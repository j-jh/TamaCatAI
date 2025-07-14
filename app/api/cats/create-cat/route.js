// route: /api/cats/create-cat
// Creates a cat for first time uers
import pool from "@/services/database";

// TODO: for this method call, pass in the user ID directly instead of finding it from request
// temp keep as http req query for testing 

/*
    POST API endpoint
    Parameter of HTTP request object with user ID as query 
    Queries to add cat row to db with matching user ID
    Returns
    Error

    need to input based on what user enters as name, and user ID
    for ref:
        Table: cats 
    ---------- 
    id  | userid | name | hunger | money | affection | energy | exp | bday
    int | int    | char | int    | int   | int       | int    | int | timestamp
*/
export async function POST(req) {
    try {
        console.log("createing new cat...")
        const { searchParams } = new URL(req.url, "http://localhost"); // base url
        console.log("line 26");
        const userID = searchParams.get('userid');
        const catName = searchParams.get('catname')
        console.log(userID, catName);
        const newCat = await pool.query(`INSERT INTO cats 
            (userid, name, hunger, money, affection, energy, exp) 
            VALUES ($1, $2, 0, 0, 0, 0, 0) RETURNING *`, [userID, catName]);
        return Response.json(newCat.rows);

    } catch (error) {
        return Response.json({
            msg: "Failed to create cat",
            msg: error.message
        });
    }
}
