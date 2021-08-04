const { User } = require('../../db');

module.exports = {

    getUserById: async(idUser) => {

        return await User.findOne({
            where:{
                id: idUser
            }
        })
    }
}