# API documentation template

TODO: Fix all API files to follow below format

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
// function code