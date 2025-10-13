TamaCatAI

npm run dev 

Environment:
- Next.js 15.3.4
- Node 20.14.0
- npm 10.7.0
- PostgreSQL 17.5
- pg 8.16.3
- React 19.1.0
- React DOM 19.1.0

wip...

RoadMap
=====
### Completed
- Static front end
- API requests for general features
  - Login and registration
  - Create, modify, get cat state
- Hash password upon registration with bcrypt
- Check password against hashed password upon login
- Create JWT upon sign in
- Verify JWT prior to cat API calls
- Save JWT for the local session

### In progress
- Update existing API comments and error codes
- Fetch backend API through front end for
  - Registration (done)
  - Login (done)
  - Onboarding (done)
  - Dashboard (in progress)

### Near goals
- Create basic interactions to update cat state stats
- Cat UI
- Add OpenAI API calls

### Future
- pgvector integration
- Simple AI memory loop
  - user text → embed → store → query → feed to prompt → respond

### Ultimate
- Dynamic cat memory system (vector similarity search)
  - Allow context-aware, evolving conversations with the user over time

## Lessons learned so far
- Creating reusable functions
- Standardizing error return codes with a function
- Consistent format for function comments
- Preventing SQL injection with error handling and sanitization
- Proper async/await usage for predictable calls
- Not exposing API to reveal all user passwords in plaintext (hashing)
- Store important keys in a `.env` file and ignore it in git
- Maintaining good discipline and formatting for version control
  - Task type (file): comment
- Reusable functions as utilities/services
- JWTs are unique to user sessions and generated upon login
  - Stored on the client front end, not backend DB
  - Server only validates token
  - Set expiration
  - Layer of security for user-specific API access
- Using JWT verification as a security checkpoint
- Prevent stale state. Do NOT call async function inside synchronous function.
    1. CALCULATE VALUES
    2. UPDATE STATE
    3. ASYNC LAST  