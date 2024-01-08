//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
 try {
   const { userName, email, password } = req.body;
   const data = {
     userName,
     email,
     password: await bcrypt.hash(password, 10),
   };

   const usernameExists = await User.findOne({ where: { userName } });
   const emailExists = await User.findOne({ where: { email } });

   if (usernameExists) {
       return res.status(409).json({ error: 'Username already taken' });
   }

   if (emailExists) {
       return res.status(409).json({ error: 'Email already exists' });
   }

   //saving the user
   const user = await User.create(data);

   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);

     return res.status(201).json({ message: 'User registered successfully' });
   } else {
     return res.status(409).json({ error: 'Registration failed' });
   }
 } catch (error) {
     console.log(error);
 }
};


//login authentication

const login = async (req, res) => {
 try {
const { email, password } = req.body;

   //find a user by their email
   const user = await User.findOne({
     where: {
     email: email
   } 
     
   });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
     //generate token with the user's id and the secretKey in the env file
     if (isSame) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
 
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      //if password matches wit the one in the database
      console.log("Login successful for user:", user.email);
      return res.status(200).json({ message: "Login successful", user });
     } else {
       return res.status(401).json( {error: "Authentication failed"});
     }
   } else {
     return res.status(401).json({error: "Authentication failed"});
   } 
 } catch (error) {
   console.log(error);
   return res.status(500).json({ error: 'Server error' });
 }
};

module.exports = {
 signup,
 login,
};