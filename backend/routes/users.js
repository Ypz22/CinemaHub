import express from 'express';
import { getAllUser, saveUser, login } from './../controller/user.js';
import jwt from 'jsonwebtoken';


const router = express.Router();


router.get('/allUsers', async (req, res) => {
    try {
        const users = await getAllUser();
        res.json(users);
    } catch (error) {
        console.error('Error getting users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/saveUser', async (req, res) => {
    try {
        const { fname, lname, email, password, phone } = req.body;
        const users = await saveUser(fname, lname, email, password, phone);
        res.send(users ? true : false);
    } catch (error) {
        console.error('Error saving user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const SECRET = 'CINEMAHUB';

router.get('/profile', (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: 'No autenticado' });

    try {
        const user = jwt.verify(token, SECRET);
        res.json({ user });
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
});


export default router;