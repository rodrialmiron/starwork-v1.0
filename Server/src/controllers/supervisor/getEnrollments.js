const { Enrollment, Course, Class, User } = require("../../db");

const getEnrollments = async (id) => {
  const allUsers = await User.findAll({
    include: [
      {
        model: Course,
        through: {
          model: Enrollment,
          where: { id_supervisor: id },
        },
        required: true,
      },
    ],
  });

  if (allUsers.length > 0) {
    let results = [];
    for (const user of allUsers) {
      let userEnrollments = [];
      for (const course of user.Courses) {
        const totalClass = await Class.count({ where: { id_course: course.id } });
        const classView = course.Enrollment.classView || 0;
        let progress = totalClass > 0 ? (classView / totalClass) * 100 : 0;

        progress = Math.ceil(progress);

        const enrollmentData = {
          courseName: course.courseName,
          progress: progress,
          classView: course.Enrollment.classView,
          totalClass: totalClass,
          registerEnrollment: course.Enrollment.createdAt,
          completionDate: course.Enrollment.completionDate,
        };
        userEnrollments.push(enrollmentData);
      }

      results.push({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        enrollments: userEnrollments,
      });
    }
    return results;
  } else {
    throw new Error("Aún no tienes colaboradores a tu cargo para ver su seguimiento");
  }
};

module.exports = getEnrollments;
