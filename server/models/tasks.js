const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    body: String,
    completed: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});
taskSchema.set('timestamps', true); // Adds create_at and updated_at timestamps

module.exports = mongoose.model('task', taskSchema);


