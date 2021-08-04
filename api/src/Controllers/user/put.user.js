const { User } = require('../../db');

module.exports = {

    updateUserById: async(idUser,name,surname,email) => {

        return await User.findOne({
            where:{
                id: idUser
            }
        })
        .then(async(user) => {
            if(name){
                user.name = name
            }
            if(surname){
                user.surname = surname
            }
            if(email){
                user.email = email
            }

            await user.save()

            return user
        })
    }
}