const {User} = require("../../db")

const getProfile = async (id) => {
    const user = await User.findByPk(parseInt(id))
    if(user) return user
    throw new Error("Usuario no encontrado")
};

module.exports = getProfile