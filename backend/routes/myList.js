import express from 'express';
import { getMyList, saveInMyList, getElementInMyList, deleteElementInMyList, getAllMyList } from './../controller/myListController.js';

const router = express.Router();

router.get('/getAllMyMList', async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const myList = await getAllMyList(idUser);
        return res.json(myList);
    } catch (error) {
        console.error('Error getting users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getMyMList', async (req, res) => {
    try {
        const idUser = req.query.idUser;
        const type = req.query.type;
        const myList = await getMyList(idUser, type);
        return res.json(myList);
    } catch (error) {
        console.error('Error getting users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getElementMyList', async (req, res) => {
    try {
        const idElement = req.query.idElement;
        const idUser = req.query.idUser;
        const myList = await getElementInMyList(idElement, idUser);
        return res.send(myList ? true : false)
    } catch (error) {
        console.error('Error getting users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/saveMyList', async (req, res) => {
    try {
        const { idElement, idUser, typeElement } = req.body;
        const myList = await saveInMyList(idElement, idUser, typeElement);
        res.send(myList ? true : false);
    } catch (error) {
        console.error('Error getting users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/deleteMyList', async (req, res) => {
    try {
        const { idElement, idUser, typeElement } = req.body;
        const myList = await deleteElementInMyList(idElement, idUser, typeElement);
        res.send(myList ? true : false);
    } catch (error) {
        console.error('Error getting users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

