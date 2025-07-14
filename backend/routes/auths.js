import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { login, verifyToken } from '../controller/user.js';
const SECRET = 'CINEMAHUB';


const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const response = await login(email);
        if (response.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = response[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000
        });

        return res.json(user);

    } catch (error) {
        console.error("Error get user: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
});

router.get('/me', verifyToken, (req, res) => {
    res.json({ authenticated: true, user: req.user });
});



export default router;