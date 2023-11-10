const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Простой GET-маршрут
app.get('/hello', (req, res) => {
    res.send('Привет, Express!');
});

// Маршрут с параметром из URL
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Привет, ${name}!`);
});

// Маршрут для обработки POST-запроса
app.post('/save', (req, res) => {
    const data = req.body;
    // Здесь вы можете сохранить переданные данные или выполнить другие действия
    res.send('Данные сохранены!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


