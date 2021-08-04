const { Operation,User } = require('../../db');

module.exports = {

    createOperation: async(concept, mount, type, idUser) => {

        return await Operation.create({
            concept : concept,
            mount: mount,
            type: type
        })
        .then(async(result) => {
            await Operation.findByPk(result.id)
            .then(async(newOp) => {
                await User.findByPk(idUser)
                .then((user) => {
                    newOp.addUser(user);
                })
            })
            return result
        })
    }
}