const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const stream     = require('stream');

let users = [
    {id: 1, email: 'test@test.com', age: 18, gender: 'm'},
    {id: 2, email: 'test2@test.com', age: 28, gender: 'f'},
    {id: 3, email: 'test3@test.com', age: 25, gender: 't'},
];

app.use(bodyParser.json());

app.get('/users', async (req, res, next) => {
    const gender = req.query.gender;
    console.log(JSON.stringify(req.headers));

    if (gender) {
        return res.json(users.filter(user => user.gender === gender));
    }

    res.json(users);
});

app.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user   = users.filter(user => user.id.toString() === userId)[0];

    if (!user) {
        return res.sendStatus(404);
    }

    res.json(user);
});

app.post('/users', async (req, res, next) => {
    const {id, email, age, gender} = req.body;
    const user                     = users.filter(user => user.id === id)[0];
    if (!id || user) {
        res.sendStatus(400);
    }
    
    const newUser = {id, email, age, gender};
    users.push(newUser);
    try {
        res.json(newUser);    
    } catch (e) {
        next(e);
    }
    
});

app.put('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user   = users.filter(user => user.id.toString() === userId)[0];
    if (!user) {
        return res.sendStatus(404);
    }

    const {email, age, gender} = req.body;

    user.email  = email;
    user.age    = age;
    user.gender = gender;
    res.json(user);
});

app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user   = users.filter(user => user.id.toString() === userId);
    if (!user) {
        return res.sendStatus(404);
    }

    users = users.filter(user => user.id.toString() !== userId);
    res.sendStatus(200);
});

app.get('/users-batch', async (req, res) => {
    const streamUsers = stream.Readable.from(JSON.stringify(users));
    streamUsers.pipe(res);
});

app.listen(3000, () => {
    console.log('server start at port 3000'); //the server object listens on port 3000
});

// curl --request GET 'http://localhost:3000/users' --header 'Content-Type: application/json'

// curl --request GET 'http://localhost:3000/users?gender=m'

// curl --request POST 'http://localhost:3000/users' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//    "id": 6,
//    "email": "snewEmail@test.com",
//    "age": 30,
//    "gender": "m" 
// }'
//    curl --location --request DELETE 'http://localhost:3000/users/3' \
//    --header 'Content-Type: application/json' \
//    --data-raw '{
//    "id": 4,
//    "email": "snewEmail@test.com",
//    "age": 30,
//    "gender": "m"
//    }'
//    curl --location --request PUT 'http://localhost:3000/users/3' \
//    --header 'Content-Type: application/json' \
//    --data-raw '{
//    "email": "snewEmail@test.com",
//    "age": 32,
//    "gender": "m"
//    }'