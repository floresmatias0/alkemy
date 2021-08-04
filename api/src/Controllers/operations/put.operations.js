const { Operation } = require('../../db');

module.exports = {

    updateOperationById: async(idOperation,concept, mount, type) => {

        return await Operation.findOne({
            where:{
                id: idOperation
            }
        })
        .then(async(operation) => {
            if(concept){
                operation.concept = concept
            }
            if(mount){
                operation.mount = mount
            }
            if(type){
                operation.type = type
            }

            await operation.save()

            return operation
        })
    }
}