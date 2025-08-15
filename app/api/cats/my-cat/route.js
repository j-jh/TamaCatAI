/* 
    route.js
    =====
    Contains APIs for individual user cat management
    - Get cat info
    - Update cat info
*/

/*
    GET API
    /api/cats/my-cat

    Gets information from cat associated with given user ID

    Function Parameters:
    - req: HTTP request object containing method, URL, query params, body 

    Expected HTTP Header:
    - Authorization: Bearer <JWT>

    Query Parameters:
    - userID: ID of the user whose cat info will be returned

    Behaviors: 
    - Verifies authorization header's extracted JWT with verifyUser()
    - Validates userID field
    - Returns cat data corresponding to userID on success
    - Returns error if:
        - Missing, invalid, or expired JWT
        - Missing, invalid userID
        - Cat not found
        - Backend/DB error
*/
import pool from "@/services/database";
import { apiSuccess, apiError } from "@/services/errorResponses";
import { verifyUser } from "@/services/authentication";

export async function GET(req) {
    try {
        let authUser;
        try {
            authUser = verifyUser(req);
        } catch (error) {
            return apiError(
                error.message,
                401
            );
        }

        console.log("get cat by ID")
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get('userID');

        if (!userID) {
            return apiError(
                "Missing parameter ID",
                400
            )
        }

        console.log("id: ", userID);

        const getCat = await pool.query(`SELECT * FROM cats WHERE userID = $1`, [userID]);

        if (getCat.rows.length === 0) {
            return apiError(
                "Cat not found",
                404
            )
        }

        return apiSuccess(
            "Successfully retrieved cat data",
            getCat.rows,
            200
        );

    } catch (error) {
        console.log(error.message);
        return apiError(
            "Failed to call GET request " + error.message,
            500
        );
    }
}

/*
    Method: PATCH
    /api/cats/my-cat

    Updates 1 or more properties of the cat associated to the user ID

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 

    Expected HTTP Header:
    - Authorization: Bearer <JWT>

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

    Behaviors: 
    - Verifies authorization header's extracted JWT with verifyUser()
    - Validates userID field
    - Updates specified cat data fields for the cat corresponding to userID
    - Returns updated cat information on success
    - Returns error if:
        - Missing, invalid, or expired JWT
        - Missing, invalid userID
        - Missing, invalid JSON body
        - Column, value mismatch or invalid
        - Backend/DB error
*/

export async function PATCH(req) {
    try {
        let authUser;
        try {
            authUser = verifyUser(req);
        } catch (error) {
            return apiError(
                error.message,
                401
            );
        }
        console.log("patch api. ")
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get("userid");

        console.log(userID);

        if (!userID) {
            return apiError(
                "Missing parameter: ID",
                400
            )
        }

        // Expected JSON object
        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            // return error no json body
            return apiError(
                "Missing parameter: JSON",
                400
            )
        }

        // Parse JSON keys as columns
        const columns = Object.keys(body);
        // Parse JSON values as values
        const values = Object.values(body);

        if (columns.includes(null) || values.includes(null)) {
            // return null field
            return apiError(
                "Missing parameter: null column(s) and/or value(s)",
                400
            )
        }

        if (columns.length !== values.length) {
            // return error mismatch 
            return apiError(
                "Columns and values count mismatch",
                400
            )
        }

        // if column doesn't exist..   

        // if type mismatch for values?


        console.log("col: ", columns);
        console.log("val: ", values);

        // Join columns together with comma separation to build sql column list
        // (column1, column2, column...)
        const joinColumns = columns.map((column, index) =>
            `${column} = $${index + 1}`).join(", ");
        // col1 = val1, col2 = val2... 

        console.log("col + val: ", joinColumns);

        // Format: UPDATE table SET col = val, col2 = val WHERE identifier = id;

        // fix sql injection 
        const sqlQuery = `UPDATE cats SET ${joinColumns} WHERE userid = ${userID} RETURNING *`;

        // Send SQL query to db with values
        const updateCat = await pool.query(sqlQuery, values);

        return apiSuccess(
            "Successfully updated cat data",
            updateCat.rows,
            200
        );

    } catch (error) {
        return apiError(
            "Failed to process PATCH request " + error.message,
            500
        )
    }
}

