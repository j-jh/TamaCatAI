/* 
    authentication.js
    -----
    Contains
    - createToken: to create JWT
    - checkToken: to verify JWT
    - verifyUser: to verify user's JWT from HTTP req

*/

import jwt from 'jsonwebtoken';
// Reads key from .env file
const JWT_SECRET = process.env.JWT_SECRET;

/*
    createToken
    
    Creates a new JSON Web Token

    Function Parameter:
    - payload: object containing user data 
        {
            id: "",
            username: ""
        }

    Behaviors:
    - Calls sign function with
        - payload/user info
        - secret key
        - token duration
    - Returns a signed token
*/
export function createToken(payload) {
    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );
}
/*
    createDemoToken

    JSON web token created for 15 minute long demo session

*/
export function createDemoToken() {
    return jwt.sign(
        {
            id: -1, // On API calls, return demo cat if ID -1
            username: "guest"
        },
        JWT_SECRET,
        {
            expiresIn: '15m'
        }
    )
}
/*
    checkToken
    
    Verifies a JSON Web Token and returns its decoded form

    Function Parameter:
    - token: JWT as string

    Behaviors:
    - Calls verify function with
        - token to check
        - secret key
    - Returns the decoded token if success
    - Returns an error if invalid
*/

export function checkToken(token) {
    return jwt.verify(
        token,
        JWT_SECRET
    );
}

/*
    verifyUser

    Verifies user's JSON web token from their HTTP request header

    Function Parameter:
    - req: HTTP request object to extract Authorization Header from

    Behaviors: 
    - Verifies if the authorization header is present and starts with 'Bearer'
    - Extracts token from authorization header
    - Attempts to decode token with checkToken()
    - Returns the decoded token payload on success
    - Throws an error if invalid, missing, or expired
*/
export function verifyUser(req) {
    const authHead = req.headers.get('authorization');
    // Null or doesn't start with 'Bearer '
    if (!authHead || !authHead.startsWith('Bearer ')) {
        throw new Error("Missing or invalid token");
    }
    // Extract token from auth head. [0] is bearer, [1] is token
    const token = authHead.split(' ')[1];

    try {
        const decoded = checkToken(token);
        return decoded;
    } catch {
        throw new Error("Invalid or expired token");
    }
}


