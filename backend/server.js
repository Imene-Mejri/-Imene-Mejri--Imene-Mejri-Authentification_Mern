const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const { erreHandler } = require('./middleware/erreurMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
connectDB();
const app = express();
//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

//ALL ROUTES
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(erreHandler);
app.listen(port, () => console.log(`server started on ${port}`));
