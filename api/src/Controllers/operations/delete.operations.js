const { Operation } = require('../../db');

module.exports = {

    deleteOperationById: async(idOperation) => {

        return await Operation.destroy({
            where:{
                id: idOperation
            }
        })
    }
}