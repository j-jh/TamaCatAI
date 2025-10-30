TamaCatAI

npm run dev 

Environment:
- Node.js 20.x
- Next.js 15.x
- PostgreSQL 17.x
- OpenAI API 6.7.x
- npm or yarn

wip...

Run refresh token, any time backend route is pinged that needs auth, if user token expires, refresh token

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
- Fetch backend API through front end for
  - Registration (done)
  - Login (done)
  - Onboarding (done)
  - Dashboard (done)
- Basic idle cat animation!
- Basic ascii/retro styling
- Integrate OpenAI API call for chat functionality

### In progress
- Update existing API comments and error codes
- Create interactions to update cat state beyond button press
- Dynamic personality, perhaps pass current state stats to chat prompt

### Near goals
- Additional animations for different types of interactions
  - Play
  - Feed.. etc

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
- <pre> tag accounts for literal white space... 
- Animating with ascii symbols is not fun