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
            
            const project = await Project.aggregate([
                { 
                    $lookup: {
                        from: "issues",
                        localField: "_id",
                        foreignField: "project",
                        as: "issuesData",
                    }
                },
                { 
                    $addFields: {
                        issueCount: {$size: "$issuesData"}
                    }
                }
            ]);
            
            return response.render('issues/index', {
                title: 'Issues',
                data: project,
                icon: 'bug'
            });
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    },

    store: async (request, response) => {
        try {
            const project = await Project.findById(request.body.project_id);
            
            if (project.isEmpty) {
                // console.log('project not found', request.body);
                request.flash('error','Project not exists!!!');
                return response.redirect('back');
            }

            // check if issue is already exists 
            
            if(!request.body.issue_id){
                const alreadyExists = await Issue.exists({title: request.body.title, author: request.body.author});

                if(alreadyExists){
                    request.flash('error','This issue is already exists!!!');
                    return response.redirect('back');
                }

            }

            // check if label is already exists then return label id otherwise create and return label id 
            // console.log('status ', request.body.status);
            const labelIds = await labelController.checkLabelId(request.body.labels.toLowerCase());
            const documentData = {
                project: project._id,
                title: request.body.title,
                description: request.body.description,
                labels: labelIds,
                author: request.body.author,
                status: request.body.status != undefined && request.body.status != null  ? request.body.status : true
            };
            
            let result = 'created';
            let redirection = 'back';
            // console.log('document ', documentData, 'issue id', request.body.issue_id);
            if(request.body.issue_id){
                await Issue.findByIdAndUpdate(request.body.issue_id,{$set: documentData}, {new: true});
                result = 'Updated';
                redirection = `/project/${project._id}`;
            }else{
                await Issue.create(documentData);
            }
            
            console.log('after create issue', result);
            request.flash('success',`Issue has been ${result} successfully ...`);
            return response.redirect(redirection);
        } catch (e) {
            console.error('error when fetching projects', e);
        }
    },

    edit: async (request, response) => {
        try {
            const issue = await Issue.findById(request.params._id).populate('labels project');
            if(!issue){
                request.flash('error','no record found ...');
                return response.redirect('back');
            }
            const labelsString = issue.labels.map(key => key.name).toString();
            return response.render('issues/edit', {
                title: 'Edit Issue',
                data: issue,
                icon: 'pencil',
                labelsString: labelsString
            });
        } catch (error) {
            console.error('error while fetching data ',error);
        }
    },

    delete: async (request, response) => {
        try {
            const issue = await Issue.findByIdAndDelete(request.params._id);
            if(!issue){
                request.flash('error','no record found ...');
                return response.redirect('back');
            }
            request.flash('success','record has been deleted successfully ...');
            return response.redirect('back');

        } catch (error) {
            console.error('Error while delete record ', error);
        }
    }
}