const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Session = require('../models/session');

const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

const initSession = async (userId) => {
    const token = await Session.generateToken();
    const session = new Session({ token, userId });
    await session.save();
    return session;
};

const isEmail = (email) => {
    if (typeof email !== 'string') {
        return false;
    }
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return emailRegex.test(email);
}

router.post('/register', async (req, res) => {
    if(req) {
        console.log(req.body);
    }
    try {
        const { email, password } = req.body;
        if (!isEmail(email)) {
            throw new Error('Email must be a valid email adress.');
        }
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }
        const user = new User({ email, password });
        const persistedUser = await user.save();

        const userId = persistedUser._id;
        const session = await initSession(userId);

        res.cookie('token', session.token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 1209600000, //2 weeks
        })
        .status(201).json({
            title: 'User registration succesful',
            detail: 'Registered new user'
        });
    } catch (err) {
        res.status(400).json({
            errors: [
                {
                    title: 'Registration Error',
                    detail: 'Something goes wrong during registration process.',
                    errorMessage: err.message,
                }
            ]
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!isEmail(email)) {
            return res.status(400).json({
                errors: [
                    {
                        title: 'Dad request',
                        detail: 'Email must be a valid email adress'
                    },
                ],
            });
        }
        if (typeof password !== 'string') {
            return res.status(400).json({
                errors: [
                    {
                        title: 'Bad request',
                        details: 'Password must be a string'
                    },
                ],
            })
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error();
        }

        const userId = user._id;

        const passwordValidated = await bcrypt.compare(password, user.password);
        if (!passwordValidated) {
            throw new Error();
        }

        const session = await initSession(userId);

        res.cookie('token', session.token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 1209600000, //2 weeks
        })
        .json({
            title: 'Login Successful',
            detail: 'Successfully validated user credentials',
        });

    } catch (err) {
        res.status(401).json({
            errors: [
                {
                    title: 'Invalid Credentials',
                    detail: 'Check email and password combination',
                    errorMessage: err.message,
                }
            ]
        })
    }
});

router.get('/me', authenticate, async (req, res) => {
    try {
        const { userId } = req.session;
 
        const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });
        
        res.json({
            title: 'Authentication successful',
            detail: 'Successfully authenticated user',
            user,
        });
    } catch (err) {
        res.status(401).json({
            errors: [
                {
                    title: 'Unauthorized',
                    detail: 'Not authorized to access this route',
                    errorMessage: err.message,
                },
            ],
        });
    }
});

module.exports = router;


// export function create(req, res) {
//     const id = auth.getUserId(req);
//     User.findOne({ _id: id }, (error, user) => {
//         if (error && !user) {
//             return res.status(500).json();
//         }
//         const task = new Task(req.body.task);
//         task.author = user._id;
//         task.dueDate = moment(task.dueDate);

//         task.save(error => {
//             if (error) {
//                 return res.status(500).json();
//             }
//             return res.status(201).json();
//         });
//     });
// }