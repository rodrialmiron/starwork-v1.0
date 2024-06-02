const { Class, InvitationUser } = require("../../db");
const orderClassNumber = require("../../utils/orderClassNumber");
const addOrderClassNumber = require("../../utils/addOrderClassNumber");

const statusClass = async (id, status) => {
  const cls = await Class.findByPk(id);
  if (cls) {
    cls.status = status;
    await cls.save();

    const allInvitations = await InvitationUser.findAll({ where: { id_class: id } });
    if (allInvitations.length > 0) {
      const invitationUpdate = await InvitationUser.update(
        { status: status },
        {
          where: { id_class: id },
        }
      );

      if (invitationUpdate[0] === 0) {
        throw new Error(`No se pudieron actualizar los datos de las invitaciones de la clase ${cls.classTitle}`);
      }
    }

    if (status === false) {
      await orderClassNumber(cls);
      await Class.update({ classNumber: 0 }, { where: { id: id } });
    } else {
      await addOrderClassNumber(cls);
    }

    let msjStatus;
    if (status === false) {
      msjStatus = "inhabilitado";
    } else {
      msjStatus = "habilitado";
    }

    const allClass = await Class.findAll({ where: { id_course: cls.id_course } });

    return {
      message: `La clase ${cls.classTitle} y sus invitaciones asociadas se han ${msjStatus} correctamente`,
      allClass,
    };
  } else {
    throw new Error("Clase no encontrada");
  }
};

module.exports = statusClass;
