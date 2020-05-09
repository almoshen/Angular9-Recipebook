require('../../app_api/models/db');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const main = async () => {
    User.create({
        username: 'mauri',
        password: '1234',
        email: 'demo@email.com',
        firstname: 'Maurizio',
        lastname: 'Bella'
      },
      (err, user) => {
        if (err) {
          console.log(err);
          
        } else {
          console.log(user);
        }
      });
    User.create({
        username: 'demo2',
        password: '12345',
        email: 'demo2@email.com',
        firstname: 'firstName2',
        lastname: 'lastName2'
      },
      (err, user) => {
        if (err) {
          console.log(err);
          
        } else {
          console.log(user);
        }
      });  
};

main().catch(console.log);
