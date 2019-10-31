require('dotenv').config();

let express = require('express');
let app = express();
let dog = require('./controllers/dogcontroller');
let sequelize = require('./db');
let Bars = require('./controllers/barscontroller');

app.use(express.json());

sequelize.sync();

app.use(require('./middleware/headers'));

app.use('/bars', Bars)

app.use('/dog', dog)

app.use('/api/test', function(req, res) {
    res.send("This is data from the /api/test endpoint. It's from the server.");
})


app.listen(3000, function(){
    console.log('App is listening on 3000.')
});

