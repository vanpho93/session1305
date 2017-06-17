const { hash, compare } = require('bcrypt');

const round = 8;

hash('khoapham', round)
.then(encrypted => console.log(encrypted));

compare('khoapham', '$2a$08$Or2Qx1aPyH72yEr9ESPEfuOOo5DNLd5YnuSkiTdSAnRiOEvi1KMKi')
.then(res => console.log(res));
