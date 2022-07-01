const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { erreHandler}= require('./middleware/erreurMiddleware')
const app = express();
//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use(erreHandler)
app.listen(port, () => console.log(`server started on ${port}`));
