// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/adminModel")

// ##############################################################
// DEFINE CONTROLLER FUNCTION TO LOGIN ADMIN
// ##############################################################

module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 1) {
            // console.log(results)
            res.locals.adminId = results[0].admin_id;
            res.locals.hash = results[0].password;
           next();
        } else {
            res.status(404).json({
                message: "Admin not found"
            });
        }
    }
    model.selectAdminByUsernameAndPassword(data, callback);
};



// ##############################################################
// DEFINE CONTROLLER TO READ ALL USERS IN DB
// ##############################################################

module.exports.readAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAlluser:", error);
        res.status(500).json(error);
      } else {
        const formattedResults = results.map(user => {
          return {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            total_points: user.total_points, // Now getting total_points directly from the query
            wizard: {
              wizard_id: user.wizard_id,
              wizard_name: user.wizard_name,
              special_ability: user.wizard_ability,
              magic_group: user.wizard_magic_group
            }
          };
        });
  
        res.status(200).json(formattedResults);
      }
    };
  
    model.selectAll(callback);
  };


// ##############################################################
// DEFINE CONTROLLER TO READ SPECIFIC USER
// ##############################################################


  module.exports.getSpecificUser = (req, res, next) => {
    const user_id = req.params.user_id; // Extract user_id from request parameters

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
// DEFINE CONTROLLER TO DELETE SPECIFIC USER
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






// ##############################################################
// DEFINE CONTROLLER TO DELETE MESSAGES
// ##############################################################

module.exports.deleteMessageById = (req, res, next) => {
  const data = {
      id: req.params.id
  }

  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error deleteMessageById:", error);
          res.status(500).json(error);
      } else {
          res.status(200).json(results);
      }
  }

  model.deleteById(data, callback);
}