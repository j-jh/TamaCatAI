/*
    response.js
    =====
    Provides two reusable helper functions for returning formatted API JSON reponse

    Contains:
    - Success response function
    - Error response function

    Usage:
        import { success, error } from "@/services/response";

    Convention:

    Response Statuses
    -----
    Success
        - 200 for data return success
        - 201 post success
    Error:
        - 400 for invalid input
        - 401 unauthorized
        - 404 not found
        - 500 for backend error 

    // Response.json(body, options);
    Response.json( 
        // response body object, data to send back
        { 
            success: boolean,
            message: string, 
            data (if success === true) [array of objects]
        },
        // options object with extra details (status, headers, text)
        {
            status: int 
        }
    )
*/

/*
    apiSuccess
    -----
    Returns a successful JSON API response with message, data, and status code

    Parameters:
    - message: String message to describe success
    - data: Data object from database query
    - status: Int status code
*/
export function apiSuccess(message = "Success!", data = null, status = 200) {
    return Response.json(
        {
            success: true,
            message,
            data
        },
        {
            status,
        }
    )
}

/*
    apiError
    -----
    Returns an unsuccessful JSON API response with message, and status code

    Parameters:
    - message: String message to describe error
    - status: Int status code
*/
export function apiError(message = "Error", status = 400) {
    return Response.json(
        {
            success: false,
            message,
        },
        {
            status,
        }
    )
}