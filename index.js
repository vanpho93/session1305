const express = require('express');
const session = require('express-session');

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
app.set('view engine', 'ejs');
app.set('views', './views');

let viewCount = 0;

app.get('/', (req, res) => {
    res.render('home', { viewCount: ++viewCount });
});

app.get('/signUp', (req, res) => res.render('signUp'));
app.get('/signIn', (req, res) => res.render('signIn'));

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
