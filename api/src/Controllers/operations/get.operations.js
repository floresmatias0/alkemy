const { Operation } = require('../../db');

module.exports = {

    getOperationById: async(idOperation) => {

        return await Operation.findOne({
            where:{
                id: idOperation
            }
        })
    }
}