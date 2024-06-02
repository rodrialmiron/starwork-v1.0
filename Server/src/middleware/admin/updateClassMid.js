function updateClassMid(req, res, next) {
    const { id, classTitle, classContent, link, menssage } = req.body;

    try {

        if (!id) {
            throw new Error("El campo 'id' es obligatorio.");
        } else if (isNaN(parseInt(id)) || parseInt(id) < 1) {
            throw new Error("El 'id' debe ser un número entero positivo.");
        }

        const titleRegex = /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;
        if (!classTitle) {
            throw new Error("El campo 'classTitle' es obligatorio.");
        } else if (typeof classTitle !== "string") {
            throw new Error("El titulo clase debe ser string");
        } else if (!titleRegex.test(classTitle) || classTitle.trim().length < 5 || classTitle.trim().length > 100) {
            throw new Error("El título de la clase debe tener entre 5 y 100 caracteres y solo puede incluir letras, números, espacios y caracteres especiales permitidos.");
        }

        if (!classContent) {
            throw new Error("El campo 'classContent' es obligatorio.");
        } else if (typeof classContent !== "string") {
            throw new Error("El contenido de la clase debe ser string");
        } else if (classContent.trim().length < 10 || classContent.trim().length > 200) {
            throw new Error("El contenido de la clase debe tener entre 10 y 200 caracteres.");
        }

        if (link && (typeof link !== 'string' || !link.startsWith("http"))) {
            throw new Error("El enlace proporcionado debe ser una URL válida.");
        }


        if (menssage && (typeof menssage !== 'string' || menssage.trim().length < 5)) {
            throw new Error("El mensaje debe ser una cadena con al menos 5 caracteres.");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = updateClassMid;
