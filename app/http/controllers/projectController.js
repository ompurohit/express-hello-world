const Project = require("../../models/project");
const Issue = require("../../models/issue");
const Label = require("../../models/label");
const FileSystemController = require('./fileSystemController');

module.exports = {
    index: async (request,response) => {
        try{
            const projects = await Project.find({});
            
            return response.render('projects/index',{
                title: 'Projects',
                icon: 'library-books',
                message: 'hello',
                data: projects
            });
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    },

    create: (request, response) => {
        return response.render('projects/create',{
            title: 'Create Project',
            icon: 'library-books',
        });
    },

    store: async (request, response) => {
        try{
            // console.log('before creating ',request.body);
            // check if project is already exists 
            const alreadyExists = await Project.exists({project: request.body.project});
            
            // console.log('already exists',alreadyExists);
            if(alreadyExists){
                request.flash('error', 'This name is already exists...');
                return response.redirect('back');
            }

            const project = await Project.create({
                project: request.body.project,
                description: request.body.description,
                author: request.body.author,
                project_type: request.body.project_type,
                project_path: `${rootPath}/storage/${request.body.project}`,
                readme_file: request.body.readme_file ? true : false,
                gitignore: request.body.gitignore ? true : false
            });
            
            // create project folder in storage with optional files
            await FileSystemController.create(project);

            const issue_url = `/project/${project._id}`;
            request.flash('success', 'Project has been created successful...');
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
                icon: 'bug',
                project: project,
                data: issues,
                labels: labels
            });
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    },

}