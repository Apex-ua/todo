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
});

router.put('/update', authenticate, (req, res) => {
    const { userId } = req.session;

    User.findOne({ _id: userId }, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        const task = new Task(req.body.task);
        task.author = user._id;
        Task.findByIdAndUpdate({ _id: task._id }, task, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
});

router.get('/all', authenticate, async (req, res) => {
    // FIND ALL TASKS
    const { userId } = req.session;
    Task.find({ author: userId }, (error, tasks) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ tasks: tasks });
    })
});

router.post('/create', authenticate, (req, res) => {
    const { userId } = req.session;
    User.findOne({
        _id: userId
    }, (error, user) => {
        if (error && !user) {
            return res.status(500).json();
        }
        const task = new Task(req.body.task);
        task.author = user._id;

        task.save(error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json({
                title: 'Task creating succesful',
                detail: 'New task added'
            });
        });
    });
});

router.get('/:id', authenticate, async (req, res) => {
    Task.findOne({ _id: req.params.id }, (error, task) => {
        if (error) {
            return res.status(500).json();
        }
        if (!task) {
            return res.status(404).json();
        }
        return res.status(200).json({ task: task });
    });
});


router.delete('/:id', authenticate, async (req, res) => {
    const { userId } = req.session;
    Task.findOne({ _id: req.params.id }, (error, task) => {
        if (error) {
            return res.status(500).json();
        }
        if (!task) {
            return res.status(404).json();
        }
        console.log(`aadfsafsafasfsf ${task.author}`);
        // if (task.author.toString() !== userId) {
        //     return res.status(403).json({ message: 'Not allowed to delete another user\'s task' });
        // }
        Task.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
});

module.exports = router;
