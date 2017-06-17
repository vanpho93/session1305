const express = require('express');
const session = require('express-session');
const parser = require('body-parser').urlencoded({ extended: false });
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./User');

const SECKET_KEY = 'kwqeb812hawfh8qfqw';
const app = express();
app.listen(process.env.PORT || 3000, () => console.log('Server started'));
app.use(express.static('public'));
app.use(session({
    secret: 'ksajdh7823dsh',
    cookie: {
        maxAge: 10000
    },
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    if (!req.cookies.TOKEN) return res.render('home', { name: undefined });
    jwt.verify(req.cookies.TOKEN, SECKET_KEY, (err, obj) => {
        if (err) return res.render('home', { name: undefined });
        res.render('home', obj);
    });
});

app.get('/signUp', (req, res) => res.render('signUp'));
app.get('/signIn', (req, res) => res.render('signIn'));

app.post('/signUp', parser, (req, res) => {
    const { email, name, phone, password } = req.body;
    const user = new User(email, password, name, phone);
    user.signUp()
    .then(() => res.send('DANG_KY_THANH_CONG'))
    .catch(() => res.send('DANG_KY_THAT_BAI'));
});

app.post('/signIn', parser, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn()
    .then((name) => {
        jwt.sign({ name }, SECKET_KEY, (err, token) => {
            res.cookie('TOKEN', token);
            res.send('DANG_NHAP_THANH_CONG');
        });
    })
    .catch(() => res.send('DANG_NHAP_THAT_BAI'));
});

// app.get('/muave', (req, res) => {
//     jwt.sign({ daMuaVe: true }, SECKET_KEY, (err, token) => {
//         res.cookie('TOKEN', token);
//         res.send('Da mua ve');
//     });
// });

// app.get('/vaorap', (req, res) => {
//     if (!req.cookies.TOKEN) return res.send('BAN PHAI MUA VE');
//     jwt.verify(req.cookies.TOKEN, SECKET_KEY, (err, obj) => {
//         if (err) return res.send('BAN PHAI MUA VE');
//         res.send('WELCOME');
//     });
// });

app.use((err, req, res, next) => res.send('LOI')); // eslint-disable-line
