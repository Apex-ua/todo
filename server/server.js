const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { getSecret } = require('./secrets');

const usersRoute = require('./routes/users');
const tasksRoute = require('./routes/tasks');

// DB
// const user = 'user_2';
// const pass = 'epTjZzcYEJD3V1cQ';
// const database = 'cats';

// mongoose.connect(`mongodb+srv://${user}:${pass}@node-test-vm17x.mongodb.net/${database}?retryWrites=true&w=majority`, 
//     {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connect(getSecret('dbUri'), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


mongoose
    .connect(
        getSecret('dbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(
        () => {
            console.log('Connected to mongoDB');
        },
        (err) => console.log('Error connecting to mongoDB', err)
    );
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('we\'re connected!');
// });

// APP
const app = express();
const port = 3000;

app.use("/", express.static('../front'));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', usersRoute);
app.use('/api/tasks', tasksRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = {
    app
};