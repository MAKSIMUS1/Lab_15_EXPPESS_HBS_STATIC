const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    extname: '.handlebars',
    helpers: { 
        refuse: () => "window.location.href = '/'" 
    }
});

const routes = require('./routes/phonebookRoute')();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
