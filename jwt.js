const jwt = require('jsonwebtoken');

const SECRET_KEY = 'o83rfdhqh2e8238482dbdchdn';

jwt.sign({ email: 'vanpho93@gmail.com' }, SECRET_KEY, { expiresIn: 10 }, (err, token) => {
    console.log(token);
});

jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbnBobzkzQGdtYWlsLmNvbSIsImlhdCI6MTQ5NzY4ODg4NSwiZXhwIjoxNDk3Njg4ODk1fQ.AAl6In4rqiD_1XbxNARZcHqXGtGWNJSxNE_xkHoP5lU', SECRET_KEY, (err, obj) => {
    console.log(err.toString());
});
