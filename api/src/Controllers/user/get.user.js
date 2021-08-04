const { User,Operation } = require('../../db');

module.exports = {

    getUserById: async(idUser) => {

        return await User.findOne({
            where:{
                id: idUser
            },
            include: [{
                model: Operation, as: 'operations',
                attributes: ["id","concept","mount","type","createdAt"]
            }]
        })
    }
}