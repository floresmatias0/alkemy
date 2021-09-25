const { User,Operation } = require('../../db');

module.exports = {
    getAllUsers: async() => {
       return await User.findAll()
    },
    getUserById: async(idUser) => {

        return await User.findByPk(idUser,
            {
                include: [{
                    model: Operation, as: 'operations',
                    attributes: ["id","concept","mount","type","createdAt"]
                }]
            })
    }
}