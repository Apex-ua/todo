const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const { getSecret } = require('./secrets');


const app = express();
const port = 3000;
app.use(bodyParser.json());


// const user = 'user_2';
// const pass = 'epTjZzcYEJD3V1cQ';
// const database = 'cats';
// mongoose.connect(`mongodb+srv://${user}:${pass}@node-test-vm17x.mongodb.net/${database}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(getSecret(dbUri), {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we\'re connected!');
});

let userSchema = new mongoose.Schema({
    name: String,
    password: String
  });

let User = mongoose.model('User', userSchema);

// let silence = new Kitten({ name: 'test' });

// silence.save(function (err) {
//     if (err) return console.error(err);
//   });

//   Kitten.find({ name: /^test/ }, function (err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
//   })


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/register', (req, res) => {
    console.log(req.body);
    const  name  =  req.body.name;
    const  password  =  req.body.password;
    let newUser = new User({ name, password })
    newUser.save();
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


