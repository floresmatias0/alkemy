const { User } = require('../../db');

module.exports = {

    deleteUserById: async(idUser) => {

        return await User.destroy({
            where:{
                id: idUser
            }
        })
    }
}