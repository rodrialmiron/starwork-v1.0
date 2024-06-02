function addCourseMid(req, res, next) {
    const { courseName, description, topic } = req.body;

    try {
  
        const courseNameRegex = /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;
        if (!courseName) {
            throw new Error("El nombre del Curso es obligatorio.");
        } else if (typeof courseName !== "string") {
            throw new Error("El nombre del curso debe ser tipo String");
        } else if (!courseNameRegex.test(courseName) || courseName.length < 5 || courseName.length > 100) {
            throw new Error("El nombre del curso debe tener entre 5 y 100 caracteres y solo puede incluir letras, números, espacios, y caracteres especiales permitidos.");
        }


        if (!description) {
            throw new Error("La descripcion del curso es obligatoria.");
        } else if (typeof description !== "string") {
            throw new Error("La descripcion debe ser de tipo String");
        } else if (description.length < 10 || description.length > 200) {
            throw new Error("La descripción del curso debe tener entre 10 y 200 caracteres.");
        }

        const topicRegex = /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;
        if (!topic) {
            throw new Error("El tema es obligatorio.");
        } else if (typeof topic !== "string"){
            throw new Error("El tema debe ser de tipo string")            
        } else if (!topicRegex.test(topic) || topic.length < 1 || topic.length > 100) {
            throw new Error("El tema del curso debe tener entre 1 y 100 caracteres y solo puede incluir letras, números, espacios, y caracteres especiales permitidos.");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = addCourseMid;
