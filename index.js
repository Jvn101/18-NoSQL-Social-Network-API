const express = require('express');
// const mongoose = require('mongoose');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(express.static('public'));
app.use(require('./routes'));

// db.connect(process.env.MONGODB_URI || 'mongodb://localhost/18-NoSQL-Social-Network-API', {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Use this to log mongo queries being executed!
// db.set('debug', true);

db.once(
  'open', () => {
    app.listen(PORT, () => {console.log(`🌍 Connected on localhost:${PORT}`);
  });
})


// const express = require('express');
// const db = require('./config/connection');
// const routes = require('./routes');

// const cwd = process.cwd();

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes('01-Activities')
//   ? cwd.split('/01-Activities/')[1]
//   : cwd;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server for ${activity} running on port ${PORT}!`);
//   });
// });
