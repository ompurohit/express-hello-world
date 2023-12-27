const Project = require("../../models/project");
const Issue = require("../../models/issue");
const Label = require("../../models/label");
// const FileSystemController = require('./fileSystemController');

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
            // check if project id is exists in request then update project else create 
            
            // check if project is already exists 
            let alreadyExists;
            
            if(!request.body.project_id){
                alreadyExists = await Project.exists({project: request.body.project});
            }else{
                alreadyExists = await Project.exists(
                    { $and :[{_id:{$ne:request.body.project_id}},{project: request.body.project}]}
                );
            }
            
            if(alreadyExists){
                request.flash('error', 'This name is already exists...');
                return response.redirect('back');
            }
            
            const documentData = {
                project: request.body.project,
                description: request.body.description,
                author: request.body.author,
                project_type: request.body.project_type,
                // project_path: `${rootPath}/storage/${request.body.project}`,
                readme_file: request.body.readme_file ? true : false,
                gitignore: request.body.gitignore ? true : false
            };

            let result = 'Update';
            let redirection = '/project';
            // console.log('document ', documentData, 'issue id', request.body.issue_id);
            if(request.body.project_id){
                await Project.findByIdAndUpdate(request.body.project_id,{$set: documentData}, {new: true});
            }else{
                const project = await Project.create(documentData);
                redirection = `/project/${project._id}`;
                result = 'Create';
                
            }
            // create project folder in storage with optional files
            // await FileSystemController.create(project);

            request.flash('success', `Project has been ${result} successful...`);
            return response.redirect(redirection);
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

    edit: async (request, response) => {
        try {
            const project = await Project.findById(request.params._id);
            if(!project){
                request.flash('error','no record found ...');
                return response.redirect('back');
            }
            return response.render('projects/edit', {
                title: 'Edit Project',
                data: project,
                icon: 'pencil'
            });
        } catch (error) {
            console.error('error while fetching data ',error);
        }
    },

    delete: async (request, response) => {
        try {
            const project = await Project.findById(request.params._id);
            if(!project){
                return response.json({status:'error', data: {'title':'Oops'},message: 'Project not found...'});
            }
            const issues = await Issue.deleteMany({project: project._id});
            console.log('issues '+issues);

            if(project.deleteOne()){
                return response.json({status:'success', data: {'title':'Yay'},message: 'record has bee deleted successfully...'});
            }
            return response.json({status:'error', data: {'title':'Oops'},message: 'Something went wrong...'});
            
        } catch (error) {
            console.error('Error while delete record ', error);
            return response.json({status:'error', data: {'title':'Oops'},message: error.message});
        }
    }

}