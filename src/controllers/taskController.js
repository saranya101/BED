// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/taskModel")

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATING NEW TASK
// ##############################################################

module.exports.createNewTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).send();
        return;
    }
    
    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Message: Internal server error", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                user_id: results.insertId,
                title: data.title,
                description: data.description,
                points: data.points
            });
        }
    }

    model.insertSingle(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL TASKS
// ##############################################################

module.exports.readAllTasks = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);

}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TASK BY ID
// ##############################################################

module.exports.selectById = (req, res, next) =>
{
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).send();
            }
            else res.status(200).send(results);
        }
    }

    model.selectById(data, callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE TASK BY ID
// ##############################################################

module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title === undefined || req.body.description === undefined || req.body.points == undefined) {
        res.status(400).send();
        return;
    }

    const taskId = req.params.task_id;
    const updatedUserData = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };



    const callback = (error, results) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send();
            } else {
                res.status(200).json({
                    task_id: taskId,
                    title: updatedUserData.title,
                    description: updatedUserData.description,
                    points: updatedUserData.points
                });
            }
        }
    };

    model.updateById(taskId, updatedUserData, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE TASK BY ID
// ##############################################################

module.exports.deleteTaskById = (req, res, next) => {
    const taskId = req.params.task_id; // Extract task ID from request parameters

    const callback = (error, results) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send();
            } else {
                res.status(204).send(); // task was successfully deleted
            }
        }
    };

    model.deleteById(taskId, callback);
};

