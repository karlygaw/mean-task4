const express = require('express');
const app = express(); // Создайте экземпляр Express приложения
const router = express.Router();
const userController = require('../src/user/userController');
const User = require('../src/user/userModel');
const bookController = require('../src/book/bookController');
const Book = require('../src/book/bookModel');
const authorController = require('../src/author/authorController');
const Author = require('../src/author/authorModel');


// После этого вы можете использовать userController
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/book/create').post(bookController.createBookControllerFn);
router.route('/author/create').post(authorController.createAuthorControllerFn);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ищем пользователя по имейлу в базе данных
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }

        // Сравниваем введенный пароль с хэшированным паролем из базы данных
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.json({ message: 'Вход выполнен успешно' });
        } else {
            return res.status(401).json({ message: 'Неверный пароль' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});
//router.route('/user/register').post(userController.createUserControllerFn);

router.get('/user-list', async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


router.get('/author-list', async (req, res) => {
    try {
        const authors = await Author.find({}).exec();
        res.json(authors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.get('/book-list', async (req, res) => {
    try {
        const books = await Book.find({}).exec();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

//Маршрут для получения данных пользователя по id
router.get('/user/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        // 
        const user = await User.findOne({ _id }).exec();
        res.json(user);
        console.log('Durys')
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


router.get('/author/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        // 
        const author = await Author.findOne({ _id }).exec();
        res.json(author);
        console.log('Durys')
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

//Маршрут для получения данных пользователя по id
router.get('/book/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        // 
        const book = await Book.findOne({ _id }).exec();
        res.json(book);
        console.log('Durys')
    } catch (error) {
        console.error('Ошибка при получении данных о книге:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

//Используйте app.put() для настройки маршрута PUT-запроса
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        const user = await User.findOneAndUpdate({ id }, userData, { new: true });
        res.json(user);
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
    }
});

router.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const bookData = req.body;

    try {
        const book = await Book.findOneAndUpdate({ id }, bookData, { new: true });
        res.json(book);
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
    }
});

router.put('/author/:id', async (req, res) => {
    const { id } = req.params;
    const authorData = req.body;

    try {
        const author = await Author.findOneAndUpdate({ id }, authorData, { new: true });
        res.json(author);
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
    }
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndDelete({ _id: id });

        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

router.delete('/book/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findOneAndDelete({ _id: id });

        if (book) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Error deleting book' });
    }
});

router.delete('/author/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findOneAndDelete({ _id: id });

        if (author) {
            res.status(200).json({ message: 'Author deleted successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting aauthor:', error);
        res.status(500).json({ error: 'Error deleting book' });
    }
});



module.exports = router;
