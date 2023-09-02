const Issue = require("../../models/issue");
const Project = require("../../models/project");

module.exports = {
    index: async (request, response) => {
        const projects = await Project.find({}).count();
        const openIssues = await Issue.find({status:true}).count();
        const closedIssues = await Issue.find({status:false}).count();
        return response.render('index',{
            title:'Home Page',
            icon: 'home',
            projects: projects,
            openIssues: openIssues,
            closedIssues: closedIssues,
        });
    }
}