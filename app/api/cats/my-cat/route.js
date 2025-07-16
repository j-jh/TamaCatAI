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

/*
    Method: PATCH
    /api/cats/my-cat

    Updates 1 or more properties of the cat associated to the user ID

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 

    Query Parameter:
    - userID: ID of the user whose cat info will be updated

    JSON Request Body (all properties are optional):
    - name: char to 10,
    - hunger: int,
    - money: int,
    - affection: int,
    - energy: int,
    - exp: int
    
    Example JSON body:
        {
            "hunger": 10,
            "money": 10000
        }

    Response:
    - 200 for success
    - 400 for invalid input
    - 500 for backend error 

    // Response.json(body, options);
    Response.json( 
        { error: "message here"}, // response body object, data to send back
        { status: int}  // options object with extra details (status, headers, text)
    )
*/

export async function PATCH(req) {
    try {
        console.log("patch api. ")
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get("userid");
        // userID
        const body = await req.json();
        // JSON object

        // Create SQL query based on number of object attributes
        const columns = Object.keys(body);
        // For db columns to update
        const values = Object.values(body);
        // Values of columns to update
        
        console.log("col: ", columns);
        console.log("val: ", values);

        // Join columns together with comma separation
        const joinColumns = columns.map((column, index) => 
            `${column} = $${index+1}`).join(", ");
        // col1 = val1, col2 = val2... 
        
        console.log("col + val: ", joinColumns);

        // UPDATE table SET col = val, col2 = val WHERE identifier = id;
        const sqlQuery = `UPDATE cats SET ${joinColumns} WHERE userid = ${userID} RETURNING *`;
        // Query to update cat from corresponding user ID
        const updateCat = await pool.query(sqlQuery, values);

        return Response.json(updateCat.rows);

    } catch (error) {
        return Response.json({
            error: "Failed to PATCH cat info",
            msg: error.message
        })
    }
}