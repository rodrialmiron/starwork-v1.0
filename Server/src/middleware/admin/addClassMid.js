function addClassMid(req, res, next) {
    const { classTitle, classContent, id_course, link, menssage } = req.body;

    try {
        const titleRegex = /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;

        if (!id_course) {
            throw new Error("El ID del curso es obligatorio.");
        } else if (isNaN(parseInt(id_course)) || parseInt(id_course) < 1) {
            throw new Error("El ID del curso debe ser un número entero positivo.");
        }


        if (typeof classTitle !== "string") {
            throw new Error("El titulo de la clase debe ser tipo String")
        } else if (!classTitle || classTitle.trim() === "") {
            throw new Error("El titulo de la clase es obligatorio");
        } else if (!titleRegex.test(classTitle) || classTitle.trim().length < 5 || classTitle.trim().length > 100) {
            throw new Error("El título de la clase debe tener entre 5 y 100 caracteres y solo puede incluir letras, números, espacios y caracteres especiales permitidos.");
        }


        if (typeof classContent !== "string") {
            throw new Error("El contenido de la clase debe ser un string")
        } else if (!classContent ||classContent.trim() === "") {
            throw new Error("El contenido de la clase es obligatorio.");
        } else if (classContent.trim().length < 10 || classContent.trim().length > 200) {
            throw new Error("El contenido de la clase debe tener entre 10 y 200 caracteres.");
        }


        if (link && (typeof link !== 'string' || !link.startsWith("http"))) {
            throw new Error("El enlace proporcionado debe ser una URL válida.");
        }


        if (typeof menssage !== 'string') {
            throw new Error("El mensaje debe ser un string")
        }

        if (menssage && (menssage.trim().length < 10 || menssage.trim().length > 500)) {
            throw new Error("El mensaje debe tener entre 10 y 500 caracteres");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = addClassMid;
