const express = require('express');
const app     = express();

const myLogger = (req, res, next) => {
    console.log(`LOGGED: ${req.originalUrl}`);
    next();
};

app.use(myLogger);

app.get('/contact', async (req, res, next) => {
    res.type('html');
    res.send('<h1>contact us page<h1>');
});

app.get('/user/:userId', (req, res) => {
    res.json({id: req.params.userId});
});

app.get('/error', (req, res, next) => {
    next(new Error('Smth bad happened'))
});

app.all('*', (req, res) => {
    res.type('html');
    res.send('<h1>Hello World!<h1>');
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.listen(3000, () => {
    console.log('server start at port 3000'); //the server object listens on port 3000
});