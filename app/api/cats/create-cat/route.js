/*
    route.js: Create Cat API
    =====
    Creates a cat for first time uers
    
    Database table reference:
    Cats
    ---------------------------------------------------------------------------
    id  | userid | name | hunger | money | affection | energy | exp | bday
    ---------------------------------------------------------------------------
    int | int    | char | int    | int   | int       | int    | int | timestamp
*/
import pool from "@/services/database";
import { apiError, apiSuccess } from "@/services/errorResponses";
import { verifyUser } from "@/services/authentication";

/*
    POST API
    /api/cats/create-cat

    Creates a new cat for the authenticated user

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 
    
    Expected JSON Request Body:
        {
            "catName": "string"
        }

    Expected HTTP Header:
    - Authorization: Bearer <JWT>

    Behaviors:
    - Validates JWT in Authorization Header
    - Extracts id from decoded JWT payload
    - Inserts cat with specified name into database
    - Returns a success message with the cat info on success
    - Returns an error if:
        - Missing, invalid JSON body
        - Missing user ID
        - Backend/DB error
        - Invalid, missing, or expired JWT
*/
export async function POST(req) {
    try {
        // Verify JWT from auth head, throws err if invalid
        const user = verifyUser(req);

        // Extract id from payload
        const { id } = user;
        const body = await req.json();
        const { catName } = body;
        // if (!id) {
        //     return apiError(
        //         "Missing parameter: ID",
        //         400
        //     )
        // }
        if (!catName) {
            return apiError(
                "Missing parameter: catName",
                400
            )
        }
        console.log(id, catName);
        const newCat = await pool.query(`INSERT INTO cats 
            (userid, name, hunger, money, affection, energy, exp) 
            VALUES ($1, $2, 0, 0, 0, 0, 0) RETURNING *`, [id, catName]);

        return apiSuccess(
            "Successfully submitted cat data",
            newCat.rows,
            200
        );
    } catch (error) {
        return apiError(
            "Failed to process POST request",
            500
        )
    }
}
