const express = require('express');
const app = express();

app.get('/contact', (req, res, next) => {
    console.log('asdsa');
    next(null);
    //res.send('<h2>contact us page<h2>');
});

app.get('/contact', (req, res) => {
    res.type('json'); //res.type('html')
    res.send('<h1>contact us page<h1>');
});

app.get('/user/:userId/friend/:friendId', (req, res) => {
    res.json({id: req.params.userId});
});

app.all('*', (req, res) => {
    res.type('html');
    res.send('<h1>Hello World!<h1>');
});

app.listen(3000, () => {
    console.log('server start at port 3000'); //the server object listens on port 3000
});