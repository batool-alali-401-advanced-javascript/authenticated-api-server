
# LAB - Class 15

## Project: Authentication

### Author: Batool Al-Ali

### Links and Resources

- [submission PR](https://github.com/batool-alali-401-advanced-javascript/authenticated-api-server/pull/1)
- [Swagger Doc](https://app.swaggerhub.com/apis/batoolalali/auth/0.1)
- [Heroku](https://api-auth-batool.herokuapp.com/)
- [jsdoc](https://api-auth-batool.herokuapp.com/docs/)
- [ci](https://github.com/batool-alali-401-advanced-javascript/authenticated-api-server/pull/2/checks?check_run_id=778011136)
### Setup
- .env => 
    - PORT
    - MONGODB_URI
    - SECRET
    - CLIENT_ID
    - CLIENT_SECRET
    - API_SERVER
    - TOKEN_SERVER

#### How to initialize/run your application 
- `$ npm init -y`
- `$nodemon`

#### Libraries:
- 'dotenv'
- 'express'
- 'supertest' 
- 'mongoose'
- "base-64"
- "bcryptjs"


#### tests:
- `$ npm test`
- `$npm run lint`


#### UML
![UML Diagram](UML.jpg)