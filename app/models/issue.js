const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        labels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Label',
                required: true
            }
        ],
        author: {
            type: String,
            required: true
        }

    }, {
        timestamps: true
    }
);

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;