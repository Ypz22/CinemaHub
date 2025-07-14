import express from 'express';
import cors from 'cors';
import movies from './routes/movies.js';
import tvShows from './routes/tvShows.js';
import users from './routes/users.js';
import dotenv from 'dotenv';
import ConectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import auths from "./routes/auths.js"
import myList from './routes/myList.js'

const app = express();
dotenv.config();

ConectDB.connect();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/movies', movies);
app.use('/api/tv-shows', tvShows);
app.use('/users', users);
app.use('/auth', auths);
app.use('/myList', myList);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
