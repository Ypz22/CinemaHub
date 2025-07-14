import ConectDB from "../config/db.js";

export const getAllMyList = async (idUser) => {
    try {
        const response = await ConectDB.query(`SELECT * FROM myList WHERE iduser = $1`, [idUser]);
        const myList = response.rows;
        return myList;
    } catch (error) {
        console.error('Error in controller:', error);
        throw error;
    }
};

export const getMyList = async (idUser, type) => {
    try {
        const response = await ConectDB.query(`SELECT * FROM myList WHERE iduser = $1 AND type = $2`, [idUser, type]);
        const myList = response.rows;
        return myList;
    } catch (error) {
        console.error('Error in controller:', error);
        throw error;
    }
};

export const getElementInMyList = async (idElement, idUser) => {
    try {
        const response = await ConectDB.query(`SELECT * FROM mylist WHERE idelement = $1 AND iduser = $2`, [idElement, idUser]);
        const myList = response.rows;
        return myList.length > 0 ? true : false;
    } catch (error) {
        console.error('Error in controller myList:', error);
        throw error;
    }
}

export const saveInMyList = async (idElement, idUser, type) => {
    try {
        const uniqueElement = await ConectDB.query(`SELECT * FROM mylist WHERE iduser = $1 AND idelement = $2 AND type = $3 LIMIT 1`, [idUser, idElement, type]);
        if (uniqueElement.rows.length > 0) {
            return false;
        }

        await ConectDB.query(
            `INSERT INTO mylist (idelement, iduser, type) VALUES ($1, $2, $3)`,
            [idElement, idUser, type]
        );

        return true;
    } catch (error) {
        console.error('Error saving in my list:', error);
        return false;
    }
};

export const deleteElementInMyList = async (idElement, idUser, type) => {
    try {
        const element = await ConectDB.query(`DELETE FROM mylist WHERE iduser = $1 AND idelement = $2 AND type = $3`, [idUser, idElement, type]);
        if (element.rowCount === 0) {
            return false
        }
        return true;
    } catch (error) {
        console.error('Error saving in my list:', error);
        return false;
    }
};

