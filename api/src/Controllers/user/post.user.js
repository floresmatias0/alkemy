const { User } = require('../../db');

module.exports = {

    createUser: async(name,surname,email,password,password_virtual) => {

        return await User.findOrCreate({
            where:{
                email: email
            },
            defaults:{
                name: name,
                surname: surname,
                password: password,
                password_virtual: password_virtual
            }
        })
    }
}