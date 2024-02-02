// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/progressModel")

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR MARKING TASK AS COMPLETE 
// ##############################################################

module.exports.ValidateUserExistence = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    };
   
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "User_id does not exist." });
            return;
        }
        next();
    }
    model.validateuser(data, callback);
}

module.exports.ValidateTaskExistence = (req, res, next) => {
    const data = {
        task_id: req.body.task_id
    };
    if (!data.task_id) {
        return res.status(400).json({
            message: "Task ID is required in the request body."
        })

    }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "Task_id does not exits." });
            return;
        }
        next();
    }
    model.validatetask(data, callback);
}



module.exports.completedTask = (req, res, next) => {

    if (req.body.user_id == undefined || req.body.task_id == undefined) {
        res.status(404).send();
        return;
    }
      
    const data = {
        user_id: res.locals.userId,
        task_id: req.body.task_id

    }

    // internal server error
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Message: Internal server error", error);
            res.status(500).json(error);
        } else if (results && results.status === 409) {
        // conflict of input 
            res.status(409).send({
                message: 'Note is already in the database'
            }); 
        } else {
            res.status(201).json({
        // results
               
                progress_id: results.insertId,
                user_id: data.user_id,
                task_id: data.task_id
        
            });
        }
    };

    model.insertSingle(data, callback);
};


module.exports.createNewProgress = (req, res, next) => {
    // if (req.body.user_id == undefined || req.body.task_id == undefined) {
    //     res.status(400).json({
    //         message: "Missing required data"
    //     });
    //     return;
    // }
    const data = {
        user_id : res.locals.userId,
        task_id : req.params.task_id
    }
 
    const callback = (error, results, fields) => {
        console.log(results)
        // console.log(results)
        if (error) {
            console.error("Error updatePlayerById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task or User not found"
                });
            }
            else {
                // const getProgressdata = (error, results) => {
                //     if (error) {
                //         console.error("Error getting user data", error);
                //         res.status(500).json(error);
                //     }
                //     else {
                        res.status(201).json( results );
                    }
                // }
                // model.gettingProgressData(data, getProgressdata);
    //         }
       }
     }
    model.insertSingle(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ SPECIFIC TASK PROGRESS
// ##############################################################

module.exports.selectById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json();
            }
            else res.status(200).send(results);
        }
    }

    model.selectById(data, callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE NOTES BY ID
// ##############################################################

module.exports.updateNotesById = (req, res, next) => {
    if (req.body.notes === undefined) {
        res.status(400).send();
        return;
    }

    const progressId = req.params.progress_id;
    const updatedUserData = {
        notes: req.body.notes,
    };

    const updateCallback = (error, results) => {
        if (error) {
            console.error("Error updateProgressById:", error);
            res.status(400).json();
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send();
            } else {
                model.fetchDetailsById(progressId, (fetchError, fetchResults) => {
                    if (fetchError) {
                        console.error("Error fetching progress details:", fetchError);
                        res.status(500).json();
                    } else {
                        if (fetchResults.length === 0) {
                            res.status(404).send();
                        } else {
                            const { user_id, task_id, completion_date } = fetchResults[0];
                            res.status(200).json({
                                progress_id: progressId,
                                user_id,
                                task_id,
                                completion_date,
                                notes: updatedUserData.notes
                            });
                        }
                    }
                });
            }
        }
    };

    model.updateById(progressId, updatedUserData, updateCallback);
};



// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE TASK PROGRESS FROM TABLE
// ##############################################################
module.exports.deleteProgressById = (req, res, next) => {
    const progressId = req.params.progress_id; 
    
    const callback = (error, results) => {
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send();
            } else {
                res.status(204).send(); // User was successfully deleted
            }
        }
    };

    model.deleteById(progressId, callback);
};

