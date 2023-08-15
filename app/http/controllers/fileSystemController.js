const fs = require('fs');

module.export = {
    /**
     * create Directory & files
     * 
     * 
     * @param {*} request 
     * @returns response
     */
    create: (request) => {
        try {
            const directoryName = `${rootPath}/storage/${request.project}`;
            // console.log('directory ===',directoryName);
            fs.mkdir(directoryName, ()=>{
                if(request.readme_file){
                    fs.copyFileSync(`${rootPath}/storage/README.md`,`${directoryName}/README.md`);
                }
                if(request.gitignore){
                    fs.copyFileSync(`${rootPath}/storage/.gitignore`,`${directoryName}/.gitignore`);
                    // fs.writeFileSync(`${directoryName}/.gitignore`,`# Dependency directories \n node_modules/ \n jspm_packages/`);
                }
                return true;
            });
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
    showFiles: (project) => {
        const projectDirectory = `${rootPath}/storage/${project}`;
        return fs.readdirSync(projectDirectory);
    }
}