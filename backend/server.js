//importing modules
const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./models');
const userRoutes = require ('./routes/userRoutes');
//assigning the variable app to express
const app = express();
 

const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
});

app.use(express.static(path.join(__dirname, '..','frontend')));

//routes for the user API
app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));