# AuthenticationPractice

For this project I am setting up users on postegre hashing passwords with bycrypt. Using routes to pass passport module using passport local strategy to authenticate users upon req on login submissions. Using express-session to maintain a state between backend to keep users logged in.

Passport explanation: using Local strategy, I am using a callback function using arrow 

Run:
npm install express express-session pg passport passport-local ejs 
-- installs all in one go for express session password encryption

npm install express-validator -- for sanitation and validation
npm install dotenv -- for storing secure user data in env file   (put require('dotenv').config() in root file to enable access in .env file); 

npm install bcryptjs -- for serializing passwords
npm install connect-pg-simple -- session storage (connecting db to session storage)

Reference commits for implementation details for passport middleware authentication
Introduction to user authentication using passport.js middleware
