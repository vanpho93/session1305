const express = require('express');
const session = require('express-session');
const parser = require('body-parser').urlencoded({ extended: false });
const cookieParser = require('cookie-parser');
const User = require('./User');

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
    res.render('home', { name: req.session.name });
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
        req.session.name = name; // eslint-disable-line
        res.send('DANG_NHAP_THANH_CONG');
    })
    .catch(() => res.send('DANG_NHAP_THAT_BAI'));
});

// app.get('/muave', (req, res) => {
//     req.session.daMuaVe = true; // eslint-disable-line
//     res.send('Da mua ve');
// });

// app.get('/vaorap', (req, res) => {
//     req.session.count = req.session.count ? ++req.session.count : 1;// eslint-disable-line
//     if (!req.session.daMuaVe) return res.send('Hay di mua ve');
//     res.send('Welcome');
// });

app.use((err, req, res, next) => res.send('LOI')); // eslint-disable-line
