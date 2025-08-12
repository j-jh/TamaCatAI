Completed:
- Hash password upon registration with bcrypt
- Check pass against hashed password upon login
- Create JWT upon sign in



Near goals:
- Update existing API comments and error codes
- Verify JWT prior to API calls -
- Fetch backend API through front end
- Basic interactions to update cat state stats
- cat UI?

Future:
- pg vector integration
- Simple memory loop
    - user text -> embed -> store -> query -> feed to prompt -> respond

Ultimate:
- Dynamic cat memory system (vector similarity search)
    - allow context awareness, evolving confersations with the user over time


Lessons learned so far:
* Standardizing error return codes with a function
* Consistent format for function comments
* Preventing SQL injection with error handling and sanitization 
* Proper async and await to make calls run predictably 
* Not exposing API to reveal all user passwords in plaintext format lol (hashing)
* Store important keys in a .env file, and ignore it during git pushes
* Maintaining good discipline and formatting for version control
    - task type (file): comment
* Reusable functions as utilities/services
