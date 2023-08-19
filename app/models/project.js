const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        project: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author:{
            type:String,
            required: true
        },
        project_type: {
            type: String,
            required: true
        },
        
        project_path: {
            type: String,
            required: true
        },
        
        readme_file: {
            type: Boolean,
            default: false
        },
        gitignore:{
            type: Boolean,
            default: false
        }

    },{
        timestamps: true
    }

);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;