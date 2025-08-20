/* 
    route.js
    -----
    Contains API endpoint to test verifyUser() function
*/

import { verifyUser } from "@/services/authentication";
import { apiError, apiSuccess } from "@/services/errorResponses";
/*
    GET API
    /api/users/verify-user

    Checks whether JSON Web Token from HTTP request header matches user's

    Function Parameter:
    - req: HTTP request object containing method, URL, query params, body 

    Expected HTTP Header:
    - Authorization: Bearer <JWT>

    Behaviors:
    - Extracts JWT from request's authorization header 
    - Verifies extracted token with verifyUser()
    - Returns decoded token info about user on success
    - Error if token missing/invalid/expired
*/
export async function GET(req) {
  try {
    const user = verifyUser(req);
    return apiSuccess(
        "Successful JWT match", 
        user, 
        200
    );
  } catch (error) {
    return apiError(
        error.message, 
        401
    );
  }
}

