const db = require('./');
const User = require('./models/User.js');

// seed the users
const seedUsers = () => db.Promise.map([
  { name: 'Sam Wheeler', email: 'swheeler111@gmail.com', password: '1234' },
  { name: 'test', email: 'test@test.com', password: 'test' },
], user => db.model('user').create(user));

// sync the database
db.sync({ force: true })
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());

