const fs = require('fs');

module.exports = {
    /**
     * create Directory & files
     * 
     * 
     * @param {*} request 
     * @returns response
     */
    create(request){
        try {
            const directoryName = `${rootPath}/storage/${request.project}`;
            
            // check if folder is already exists or not  
            if (fs.existsSync(directoryName)) {
                console.log(` ${request.project} Directory is already exists`);
                return true;
            }

            // create directory first 
            fs.mkdirSync(directoryName);

            if(request.readme_file){
                fs.copyFileSync(`${rootPath}/storage/samples/README.md`,`${directoryName}/README.md`);
            }
            if(request.gitignore){
                fs.copyFileSync(`${rootPath}/storage/samples/.gitignore`,`${directoryName}/.gitignore`);
                // fs.writeFileSync(`${directoryName}/.gitignore`,`# Dependency directories \n node_modules/ \n jspm_packages/`);
            }
            return true;
            
        } catch (error) {
            console.error('error while creating file/directory',error);
        }
    },

    /**
     * Return speicific Project or Directories's all Files name
     * 
     * @param request (Project name/ Directory name)
     * @return array (all folders name in array formate)
     */
    showFiles(project) {
        const projectDirectory = `${rootPath}/storage/${project}`;
        return fs.readdirSync(projectDirectory);
    }
}