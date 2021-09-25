const { Operation } = require('../../db');

module.exports = {
    getAllOperations: async() => {
        return await Operation.findAll()
    },
    getOperationById: async(idOperation) => {
        return await Operation.findByPk(idOperation)
    }
}