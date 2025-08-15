Completed:
- Static front end
- API requests for general features
    - Login and registration
    - Create, modify, get cat state
- Hash password upon registration with bcrypt
- Check pass against hashed password upon login
- Create JWT upon sign in
- Verify JWT prior to cat API calls

Near goals:
- Update existing API comments and error codes
- Fetch backend API through front end
- Create basic interactions to update cat state stats
- cat UI?
- Add OpenAi API calls

Future:
- pg vector integration
- Simple memory loop
    - user text -> embed -> store -> query -> feed to prompt -> respond

Ultimate:
- Dynamic cat memory system (vector similarity search)
    - allow context awareness, evolving confersations with the user over time


Lessons learned so far:
* Creating reusable functions in general!
* Standardizing error return codes with a function
* Consistent format for function comments
* Preventing SQL injection with error handling and sanitization 
* Proper async and await to make calls run predictably 
* Not exposing API to reveal all user passwords in plaintext format lol (hashing)
* Store important keys in a .env file, and ignore it during git pushes
* Maintaining good discipline and formatting for version control
    - task type (file): comment
* Reusable functions as utilities/services
* JWT's are unique to user sessions and generated upon login. 
    - Stored on the client front end, not backend DB
    - Server doesn't need to "remember" token, only validates 
    - Set expiration 
    - Layer of security for user specific API access
* Using JWT verification as a security checkpoint 
