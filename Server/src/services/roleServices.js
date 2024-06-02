const admin = (req, res, next) => {
  const role = req.role;

  if (role !== 1) {
    return res.status(401).json({ error: "Tu rol no tiene permiso de acceso" });
  }

  next();
};

const sup = (req, res, next) => {
  const role = req.role;

  if (role !== 2) {
    return res.status(401).json({ error: "Tu rol no tiene permiso de acceso" });
  }

  next();
};

const collab = (req, res, next) => {
  const role = req.role;

  if (role !== 3) {
    return res.status(401).json({ error: "Tu rol no tiene permiso de acceso" });
  }

  next();
};

const code = (req, res, next) => {
  const role = req.role;

  if (role === 3) {
    return res.status(401).json({ error: "Tu rol no tiene permiso de acceso" });
  }

  next();
};

const roleServices = {
  admin,
  sup,
  collab,
  code,
};

module.exports = roleServices;
