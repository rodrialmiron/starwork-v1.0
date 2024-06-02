const {User} = require("../../db");

const searchByName = async (firstName) => {
    const user = await User.findOne({
        where:{
            firstName
        }
    });
    if(user) return user;
    throw new Error("El usuario no existe")
}

module.exports = searchByName