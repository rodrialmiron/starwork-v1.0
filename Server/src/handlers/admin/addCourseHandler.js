const addCourse = require("../../controllers/admin/addCourse.js");

const addCourseHandler = async (req, res) => {
  const { courseName, description, topic } = req.body;

  try {
    const result = await addCourse({ courseName, topic, description });
    return res.status(201).send({ message: `Curso ${result.courseName} creado`, result});
  } catch (error) {
    if (error.message === "Ya tenes este curso") {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
 
  }
};

module.exports = addCourseHandler;
