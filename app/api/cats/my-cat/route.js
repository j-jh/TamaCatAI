/* 
    route.js
    =====
    Contains APIs for individual user cat management
    - Get cat info
    - Update cat info
*/


// TODO: get cat info, update cat info

/*
    Method: GET
    /api/cats/my-cat

    Gets information from cat associated with given user ID

    Function Parameters:
    - req: HTTP request object containing method, URL, query params, body 

    Query Parameters:
    - userID: ID of the user whose cat info will be returned

    Response:
    
*/
import pool from "@/services/database";

export async function GET(req) {
    try {
        console.log("get cat by ID")
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get('userID');
        console.log("id: ",userID);

        const getCat = await pool.query(`SELECT * FROM cats WHERE userID = $1`, [userID]);

        return Response.json(
            getCat.rows
        );

    } catch (error) {
        return Response.json({
            error: "Failed to GET cat by ID",
            msg: error.message
        })
    }
}
