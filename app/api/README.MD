# API documentation template

TODO: Fix all API files to follow below format

/* Cat Properties:
    cat object: {
        name: "",
        hunger: 0,
        money: 0,
        affection: 0,
        energy: 0,
        exp: 0
    }
*/

---
/* 
    file.js
    -----
    Contains
    - 1
    - 2
*/
// imports 


/*
    Method type
    Path

    Purpose

    Function Parameter:
    - params

    Query Parameter:
    - params

    JSON Request Body (all properties are optional):
    - a: char to 10,
    - b: int
    
    Example JSON body:
        {
            "a": 10,
            "b": 10000
        }

    Response:
    - 200 for success get
    - 201 success post 
    - 400 for invalid input
    - 401 unauthorized
    - 404 not found
    - 500 for backend error 

    // Response.json(body, options);
    Response.json( 
        { 
            success: boolean,
            message: "message here", // response body object, data to send back
        },
        {
            status: int  // options object with extra details (status, headers, text)
        }
    )
*/
// function code