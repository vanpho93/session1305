const { hash } = require('bcrypt');
const queryDB = require('./db');

class User {
    constructor(email, password, name, phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
    }

    signUp() {
        const sql = `INSERT INTO public."User"(email, password, name, phone)
        VALUES ($1, $2, $3, $4);`;
        return hash(this.password, 8)
        .then(encrypted => queryDB(sql, [this.email, encrypted, this.name, this.phone]));
    }

    signIn() {

    }
}

// const pho = new User('vanpho01@gmail.com', '123', 'Pho', '09267362232');
// pho.signUp()
// .then(() => console.log('THANH_CONG'))
// .catch(() => console.log('THAT_BAI'));

module.exports = User;
