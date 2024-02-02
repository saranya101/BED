// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/userModel")


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR GETTING USER BY USER ID
// ##############################################################

module.exports.getSpecificUser = (req, res, next) => {
    const user_id = res.locals.userId; // Extract user_id from request parameters

    if (!user_id) {
        return res.status(400).json({ error: "user ID is missing" });
    }

    const data = { user_id }; // Create data object with user_id property

    const callback = (error, results) => {
        if (error) {
            console.error("Error retrieving user data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (!results || Object.keys(results).length === 0) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json(results);
    };

    model.selectById(data, callback);
};


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO UPDATE THE PLAYER
// ##############################################################


module.exports.updateUserById = (req, res, next) => {
    if (req.body.username === undefined || req.body.email === undefined) {
        res.status(404).send();
        return;
    }

    const userId = req.params.user_id;
    const updatedUserData = {
        username: req.body.username,
        email: req.body.email
    };

    model.checkAndUpdateUser(userId, updatedUserData, (status, result) => {
        res.status(status).json(result);
    });
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION TO DELETE THE PLAYER
// ##############################################################

module.exports.deleteUserById = (req, res, next) => {

    const user_id = req.params.user_id


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).send();
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(user_id, callback);
}




//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    if (!req.body.username || !req.body.email) {
        res.status(400).json({ Error: "Missing required data." });
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectByUsernameOrEmail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            } else {
                next();
            }
        }
    }

    model.chkExist(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////

module.exports.register = (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.userId = results.insertId;
            res.locals.message = "User " + data.username + " created successfully.";
            next();
        }
    }
    model.insertSingle(data, callback);
}


//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////

module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 1) {
            // console.log(results)
            res.locals.userId = results[0].user_id;
            res.locals.hash = results[0].password;
            next();
        } else if (results.length > 1) {
            res.status(409).json({
                message: "Username already exists"
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }
    model.selectUserByUsernameAndPassword(data, callback);
};
