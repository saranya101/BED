// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/questModel")


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO DISPLAY ALL QUESTS
// ##############################################################

module.exports.readAllQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);

}
// ##############################################################
// DEFINE CONTROLLER TO READ SPECIFIC ID
// ##############################################################


module.exports.selectById = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send({
                    message: 'ID is not found. Check and try again'
                });
            }
            else res.status(200).send(results);
        }
    }

    model.selectById(data, callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO ACCEPT QUEST
// ##############################################################

module.exports.acceptQuest = (req, res, next) => {
    const user_id = res.locals.userId;
    const quest_id = req.params.quest_id;

    const callback = (error, result) => {
        if (error) {
            console.error("Error accepting quest:", error);
            // Check if the error message indicates missing magic groups
            if (error.message && error.message.startsWith("Player does not have")) {
                console.error("Player does not have required magic groups:", error.message);
                res.status(400).json({ error: error.message });
                // Send a 400 Bad Request status code with the error message
            } else if (res.status(409)) {
                console.error("User has already accepted this quest:", error.message);
                res.status(409).json({ message: "User has accepted this quest already." });
            } else {
                console.error("Internal server error:", error);
                res.status(500).json({ error: "Internal server error" }); // Send a 500 Internal Server Error status code for other errors
            }
        } else {
            console.log("Quest accepted successfully");
            res.status(200).json({ message: "Quest accepted successfully" });
        }
    };


    // Call the model function to accept the quest
    model.acceptQuest({ user_id, quest_id }, callback);
};



// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR COMPLETE QUEST
// ##############################################################

module.exports.completeQuest = (req, res, next) => {
    const user_id = res.locals.userId;
    const quest_id = req.params.quest_id

    // Callback function to handle the response from the model
    const callback = (error, result) => {
        if (error) {
            console.error("Error completing quest:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ message: "Quest completed successfully" });
        }
    };

    // Call the model function to complete the quest
    model.updateQuestProgress(user_id, quest_id, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION TO SEE PENDING QUESTS
// ##############################################################


module.exports.getPendingQuests = (req, res, next) => {
    const user_id = res.locals.userId; // Assuming userId is available in the request params

    const callback = (error, results) => {
        if (error) {
            console.error("Error fetching quests:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).send({
                    message: 'No quests are pending for this user.'
                });
            } else {
                res.status(200).json(results);
            }
        }
    };

    model.selectQuestsForUser(user_id, callback);
};


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR AVAILABLE QUESTS 
// ##############################################################

module.exports.getAvailableQuests = (req, res, next) => {
    const user_id = res.locals.userId;
    // Assuming userId is available in the request params

    const callback = (error, results) => {
        if (error) {
            console.error("Error fetching available quests:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).send({
                    message: 'No available quests for this user.'
                });
            } else {
                res.status(200).json(results);
            }
        }
    };

    model.displayAvailableQuests(user_id, callback);
};



// ##############################################################
// DEFINE CONTROLLER FUNCTION TO DELETE QUEST PROGRESS
// ##############################################################

module.exports.deleteQuestProgress = (req, res, next) => {
    const user_id = res.locals.userId;
    const quest_id = req.params.quest_id
    // Callback function to handle the response from the model
    const callback = (error, result) => {
        if (error) {
            console.error("Error deleting quest progress:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ message: "Quest progress deleted successfully" });
        }
    };

    // Call the model function to delete the quest from user progress
    model.deleteQuestProgress(user_id, quest_id, callback);
};
