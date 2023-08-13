const Project = require("../../models/project");
const Issue = require("../../models/issue");
const Label = require("../../models/label");

module.exports = {
    index: async (request,response) => {
        try{
            const projects = await Project.find({});
            return response.render('projects/index',{
                title: 'Create Project',
                data: projects
            });
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    },

    create: (request, response) => {
        return response.render('projects/create',{
            title: 'Create Project'
        });
    },

    store: async (request, response) => {
        try{
            // console.log('before creating ',request.body);
            const project = await Project.create({
                project: request.body.project,
                description: request.body.description,
                author: request.body.author
            });
            const issue_url = `/project/${project._id}`;
            return response.redirect(issue_url);
        }catch(e){
            console.error('error when creating project',e);
        }
    },

    issue: async (request, response) => {
        try {
            const project = await Project.findById(request.params._id);
            if(project.isEmpty){
                return response.redirect('back');
            }

            const labels = await Label.find({});
            const issues = await Issue.find({ project: project.id }).populate('labels');
            
            return response.render('issues/create', {
                title: 'Create Issues',
                project: project,
                data: issues,
                labels: labels
            });
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    }
}