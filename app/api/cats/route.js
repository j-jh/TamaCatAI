// route: /api/cats

// TODO: cat API

/*
    cat object: {
        name: "",
        hunger: 0,
        money: 0,
        affection: 0,
        energy: 0,
        exp: 0
    }

    Table: cats 
    ---------- 
    id  | userid | name | hunger | money | affection | energy | exp | bday
    int | int    | char | int    | int   | int       | int    | int | timestamp

*/
import pool from "@/services/database";

/*
    GET API endpoint
    Queries all cat data from catgs table
    Returns JSON object array of all cats
    Error if request failed
*/

export async function GET() {
    try {
        const getAll = await pool.query(`SELECT * FROM cats`);
        return Response.json(getAll.rows);
        
    } catch (error) {
        return Response.json({
            error: "Failed to GET",
            msg: error.message
        })
    }
}
/*
    DELETE API endpoint
    Parameter of HTTP request object with user ID as query 
    Queries delete cat with matching user ID from db
    Returns JSON object of deleted cat if exists
    Error if ID does not exist, or request failed

    Expected query parameter:
        "userid": value as integer
*/
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(requestAnimationFrame.url);
        const userid = searchParams.get('userid');
        const deleteCat = await pool.query('DELETE FROM cats WHERE userid=$1 RETURNING *', [userid]);

        return Response.json(
            deleteCat.rows
        );

    } catch (error) {
        return Response.json({
            error: "Failed to DELETE cat",
            msg: error.message
        });
    }
}
