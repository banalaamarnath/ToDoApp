function validateNewUser(req, res, next) {
    if (!req.body.name || !req.body.status) {
        res.status(400).send({ message: "name and status are manditory" });
        return;
    }
    return next();
}


function validateUpdateUser(req, res, next) {
    if (!req.body.name) {
        res.status(400).send({ message: "name or status are manditory" });
        return;
    }
    return next();
}

function CheckID(req, res, next) {
    if (!req.body.id) {
        res.status(400).send({ message: "ID is manditory" });
        return;
    }
    return next();
}


module.exports = {
    validateNewUser,
    CheckID,
    validateUpdateUser
}