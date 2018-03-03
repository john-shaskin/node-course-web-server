const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to write to server.log');
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/Public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('fuck', () => {
  return 'fuck!'
})
hbs.registerHelper('moronType', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'This is some shit right here~'
  })
  // res.send('<h1>hello express, you are great!</h1>');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About!',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'You did some bad shit'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
