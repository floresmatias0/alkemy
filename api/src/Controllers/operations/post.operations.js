const { Operation } = require('../../db');

module.exports = {

    createOperation: async(concept, mount, type) => {

        return await Operation.create({
            concept : concept,
            mount: mount,
            type: type
        })
    }
}