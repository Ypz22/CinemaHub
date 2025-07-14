import ConectDB from "../config/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SECRET = 'CINEMAHUB';

const saltRounds = 10;

export const getAllUser = async (req, res) => {
    try {
        const response = await ConectDB.query(`SELECT * FROM users`);
        const users = response.rows;
        return users;
    } catch (error) {
        console.error('Error in controller:', error);
        throw error;
    }
};

export const saveUser = async (fname, lname, email, password, phone) => {
    try {
        const emailConfirmation = await ConectDB.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (emailConfirmation.rows.length > 0) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await ConectDB.query(
            `INSERT INTO users(fname, lname, email, password, phone) VALUES ($1, $2, $3, $4, $5)`,
            [fname, lname, email, hashedPassword, phone]
        );

        return true;
    } catch (error) {
        console.error('Error saving user:', error);
        return false;
    }
};

export const login = async (email) => {
    try {
        const response = await ConectDB.query('SELECT * FROM users WHERE email = $1', [email]);
        return response.rows;
    } catch (error) {
        console.log("Error in get email: ", error);
        return false;
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};