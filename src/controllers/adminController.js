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
// DEFINE CONTROLLER TO READ ALL
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

module.exports.deleteUser = (req, res, next) => {

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

  model.deleteByMessageId(data, callback);
}





// ##############################################################
// DEFINE CONTROLLER TO CREATE SPELL
// ##############################################################

module.exports.createSpell = (req, res, next) => {
    if (req.body.name === undefined || req.body.description === undefined|| req.body.points_cost === undefined || req.body.magic_group === undefined) {
        res.status(404).send({
            message : "Required data is undefined"
        });
        return;
    }

    const data = {
        spell_id : req.params.spell_id,
        name: req.body.name,
        description: req.body.description,
        points_cost: req.body.points_cost,
        magic_group: req.body.magic_group
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Create Spell", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    model.insertSpell(data, callback);
};










// ##############################################################
// DEFINE CONTROLLER TO UPDATE SPELL BY ID
// ##############################################################

module.exports.updateSpell = (req, res, next) => {
    if (req.body.name === undefined || req.body.description === undefined|| req.body.points_cost === undefined || req.body.magic_group === undefined) {
        res.status(404).send({
            message : "Required data is undefined"
        });
        return;
    }

    const data = {
        spell_id : req.params.spell_id,
        name: req.body.name,
        description: req.body.description,
        points_cost: req.body.points_cost,
        magic_group: req.body.magic_group
    };

    model.updateById(data, (status, result) => {
       console.log(result)
    });
};



// ##############################################################
// DEFINE CONTROLLER TO DELETE SPELL BY ID
// ##############################################################

module.exports.deleteSpell = (req, res, next) => {
    const spell_id = req.params.spell_id
    // Callback function to handle the response from the model
    const callback = (error, result) => {
        if (error) {
            console.error("Error deleting spell:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ message: "Spell deleted successfully" });
        }
    };

    // Call the model function to delete the quest from user progress
    model.deleteSpell(spell_id, callback);
};



// ##############################################################
// DEFINE CONTROLLER TO CREATE QUESTS
// ##############################################################


module.exports.createQuest = (req, res, next) => {
    if (req.body.title === undefined || req.body.description === undefined|| req.body.points_awarded === undefined || req.body.magic_group_required === undefined) {
        res.status(404).send({
            message : "Required data is undefined"
        });
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points_awarded: req.body.points_awarded,
        magic_group_required: req.body.magic_required
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Create Quest", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    model.insertQuest(data, callback);
};


// ##############################################################
// DEFINE CONTROLLER TO UPDATE QUEST BY ID
// ##############################################################

module.exports.updateQuest = (req, res, next) => {
    if (req.body.title === undefined || req.body.description === undefined|| req.body.points_awarded === undefined || req.body.magic_group_required === undefined) {
        res.status(404).send({
            message : "Required data is undefined"
        });
        return;
    }

    const data = {
        quest_id : req.params.quest_id,
        title: req.body.title,
        description: req.body.description,
        points_awarded: req.body.points_awarded,
        magic_group_required: req.body.magic_group_required
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Update Quest", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    model.updateQuest(data, callback);
};


// ##############################################################
// DEFINE CONTROLLER TO DELETE QUEST BY ID
// ##############################################################

module.exports.deleteQuest = (req, res, next) => {
    const quest_id = req.params.quest_id
    // Callback function to handle the response from the model
    const callback = (error, result) => {
        if (error) {
            console.error("Error deleting quest:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ message: "Quest deleted successfully" });
        }
    };

    // Call the model function to delete the quest from user progress
    model.deleteQuest(quest_id, callback);
};
