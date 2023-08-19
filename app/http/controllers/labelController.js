const Label = require('../../models/label');

module.exports = {
    /**
     * check if Label is already exists then return Label id 
     * otherwise create new Label and return Label id 
     * 
     * @param string name 
     * @returns array label id
     */

    checkLabelId: async(name) => {
        const label_ids =[];
        let labels_array = [];

        // if string have a value with comma seprated then split it, into the array 
        if(name.indexOf(',') > -1){
            labels_array = name.split(',');
            // console.log(labels_array);
        }else{
            labels_array.push(name.trim());
        }
            
        for (const key of labels_array) {
            if (key != '' && key != ' ') {
                const label = await Label.exists({name:key.trim()});
                if (label != null) {
                    label_ids.push(label._id);
                }else{
                    const label = await Label.create({name:key.trim()});
                    label_ids.push(label._id);
                }
            }
        }
        return label_ids;
    },

    /**
     * Ajax call
     * get labels name with id
     * 
     * @param {*} name 
     * @returns collection of data
     */
    getLabelsData: async(request, response) => { 
        return response.status(200).json( 
            await Label.find({ name: { $regex: request.params.name } }).select('_id name')
        );
    },
}