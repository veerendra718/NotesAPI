const express = require('express');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');
const { errorHandler } = require('./middleware/errorHandlerMiddleware');
const connectDb = require('./config/dbConnection');

dotenv.config();
const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/notes', notesRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})