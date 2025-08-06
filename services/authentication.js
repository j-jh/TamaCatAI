/* 
    authentication.js
    -----
    Contains
    - createToken: to create JWT
    - checkToken: to verify JWT
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


