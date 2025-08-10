/* 
    route.js
    -----
    Contains APIs for all cats management
    - Get all cats
    - Delete cat
*/

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
import { apiError, apiSuccess } from "@/services/errorResponses";

/*
    GET API endpoint
    Queries all cat data from catgs table
    Returns JSON object array of all cats
    Error if request failed
*/

export async function GET() {
    try {
        const getAllCats = await pool.query(`SELECT * FROM cats`);
        return apiSuccess(
            "Successfully fetched all cat data",
            getAllCats.rows,
            200
        );
    } catch (error) {
        return apiError(
            "Failed to process GET request",
            500
        )
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
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get('userid');
        if (!userID) {
            return apiError(
                "Missing parameter: ID",
                400
            )
        };
        const deleteCat = await pool.query('DELETE FROM cats WHERE userid=$1 RETURNING *', [userID]);

        return apiSuccess(
            "Successfully deleted cat data",
            deleteCat.rows,
            200
        );

    } catch (error) {
        return apiError(
            "Failed to process DELETE request",
            500
        );
    }
}
