const cron = require("node-cron");
const { InvitationUser, User, Class, Course, Enrollment } = require("../db.js");
const sendScheduledEmails = require("./sendScheduledEmails.js");

async function checkScheduledEmails() {
  try {
    const currentDayOfWeek = new Date().getDay();
    console.log("Día de la semana actual:", currentDayOfWeek);

    const courses = await Course.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: Class,
          where: {
            status: true,
          },
          include: [
            {
              model: User,
              through: {
                model: InvitationUser,
                where: {
                  status: true,
                  sent: false,
                  dayOfWeek: currentDayOfWeek,
                },
              },
              required: true,
            }
          ],
        },
      ],
    });

    let shippingDay = [];

    if (courses.length > 0) {
      for (const course of courses) {
        for (const oneClass of course.Classes) {
          for (const user of oneClass.Users) {
            const lastClassSent = await InvitationUser.findOne({
              where: {
                id_user: user.id,
                id_course: course.id,
                status: true,
                sent: true,
              },
              order: [["updatedAt", "DESC"]], 
            });

            let classSend = null;

            if (!lastClassSent) {
              classSend = await Class.findOne({ where: { id_course: course.id, classNumber: 1 } });
            }

            let allClass;
            if (lastClassSent) {
              allClass = await Class.findAll({ where: { id_course: course.id } });
              const getLastClass = await Class.findByPk(lastClassSent.id_class);

              if (allClass.length > getLastClass.classNumber) {
                const newClassNumber = getLastClass.classNumber + 1;
                classSend = await Class.findOne({ where: { id_course: course.id, classNumber: newClassNumber } });
              }
            }

            const getInvitation = await InvitationUser.findOne({
              where: {
                id_class: classSend.id,
                id_user: user.id,
              },
            });

            if (classSend && getInvitation && getInvitation.hour && getInvitation.sent === false) {
              const [hour, minute] = getInvitation.hour.split(":");
              const hourSend = parseInt(hour);
              const minSend = parseInt(minute);

              const classVerify = await Class.findOne({
                where: { id: classSend.id },
                include: [
                  {
                    model: User,
                    where: { id: user.id },
                    through: {
                      model: InvitationUser,
                      where: {
                        status: true,
                        sent: false,
                      },
                    },
                    required: true,
                  },
                ],
              });

              if (classVerify) {
                let result = shippingDay.find((object) => object.id_user === user.id && object.id_course === course.id);

                if (result) {
                  continue;
                }

                shippingDay.push({ id_user: user.id, id_course: course.id });

                cron.schedule(`${minSend} ${hourSend} * * ${currentDayOfWeek}`, async () => {
                  await sendScheduledEmails(user, classSend, course.courseName);

                  await getInvitation.update({ sent: true });
                  const actuView = await Enrollment.findOne({ where: { id_user: user.id, id_course: course.id } });
                  const countClassView = actuView.classView + 1;
                
                  await Enrollment.update(
                    { classView: countClassView },
                    { where: { id_user: user.id, id_course: course.id } }
                  );
                  
                  if (allClass.length === classSend.classNumber) {
                    const dateToday = new Date();
                    await Enrollment.update(
                      { completionDate: dateToday },
                      { where: { id_user: user.id, id_course: course.id } }
                    );
                  }
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error al verificar y enviar correos programados:", error);
  }
}

module.exports = checkScheduledEmails;
