const express = require('express');

const User = require('../models/user');
const Task = require('../models/tasks');

const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.post('/add', authenticate, async (req, res) => {
    console.log('add task works')
    const { userId } = req.session;
    console.log(req.session);
    User.findOne({ _id: userId }, (error, user) => {
        if (error && !user) {
            return res.status(500).json();
        }
        const task = new Task(req.body.task);
        task.author = user._id;

        task.save(error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
})


router.get('/all', authenticate, async (req, res) => {
    // FIND ALL TASKS
    Task.find({}, (error, tasks) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ tasks: tasks });
    })
    // .populate('author', 'username', 'user');
    // Populate will find the author that created the task and add it to the task (username only)
})



module.exports = router;
