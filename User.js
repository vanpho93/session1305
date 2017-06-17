const { hash, compare } = require('bcrypt');
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
        const sql = 'SELECT * FROM "User" WHERE email = $1';
        return queryDB(sql, [this.email])
        .then(result => {
            if (!result.rows[0]) throw new Error('EMAIL_KHONG_TON_TAI');
            return compare(this.password, result.rows[0].password)
            .then(res => {
                if (!res) throw new Error('SAI_MAT_KHAU');
            });
        });
    }
}

// const pho = new User('vanpho01@gmail.com', '123');
// pho.signIn()
// .then(() => console.log('THANH_CONG'))
// .catch(err => console.log('THAT_BAI: ' + err));

module.exports = User;
