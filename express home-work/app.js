const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5555;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET-маршрут
app.get('/hello', (req, res) => {
    res.send('GET запрос: Привет, Express!');
});

// POST-маршрут
app.post('/hello', (req, res) => {
    res.send('POST запрос: Привет, Express!');
});

// PUT-маршрут
app.put('/hello', (req, res) => {
    res.send('PUT запрос: Привет, Express!');
});

// DELETE-маршрут
app.delete('/hello', (req, res) => {
    res.send('DELETE запрос: Привет, Express!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
});

// Пример вызова middleware с ошибкой
app.get('/error', (req, res, next) => {
    next(new Error('Произошла ошибка!'));
});


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Маршрут для отображения данных на странице
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.render('greeting', { name });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

// Папка, где хранятся статические файлы
app.use(express.static('public'));

// Доступ к файлам в папке 'public' будет доступен по URL '/public'
// Например, файл 'styles.css' будет доступен по '/public/styles.css'


// Middleware для проверки аутентификации
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Пользователь аутентифицирован, продолжаем выполнение запроса
    }
    res.redirect('/login'); // Пользователь не аутентифицирован, переадресация на страницу входа
}

// Применение middleware к маршруту, требующему аутентификации
app.get('/profile', isAuthenticated, (req, res) => {
    res.send('Добро пожаловать в ваш профиль!');
});
