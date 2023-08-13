const Project = require("../../models/project");
const Issue = require("../../models/issue");

const labelController = require("./labelController");

module.exports = {
    /**
     * this is index method of issues which load only projects
     * so that first user select the project then see all the issue of specific project
     */

    index: async (request, response) => {
        try {
            const project = await Project.find({});
            return response.render('issues/index', {
                title: 'Issues',
                data: project
            });
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    },

    store: async (request, response) => {
        try {
            const project = await Project.findById(request.body.project_id);
            
            if (project.isEmpty) {
                console.log('project not found', request.body);
                return response.redirect('back');
            }

            // check if label is already exists then return label id otherwise create and return label id 
            const labelIds = await labelController.checkLabelId(request.body.label.toLowerCase());
            // console.log('labelid',labelIds);

            const issue = await Issue.create({
                project: project._id,
                title: request.body.title,
                description: request.body.description,
                labels: labelIds,
                author: request.body.author
            });

            // console.log('after create issue', issue)
            return response.redirect('back');
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    }
}