// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR NEW TASK
// ##############################################################

module.exports.insertSingle = (data, callback) =>
{
    // insert into table
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points, task_id)
    VALUES (?, ?, ?, ?);
    `;
const VALUES = [data.title, data.description, data.points, data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);

}

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR TREE
// ##############################################################

module.exports.selectAll = (callback) =>
{
    // select all from the task table
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

pool.query(SQLSTATMENT, callback); 
}

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR TASK
// ##############################################################

module.exports.selectById = (data, callback) =>
{
    // select tasks by task_id
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
const VALUES = [data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


// ##############################################################
// DEFINE UPDATE OPERATIONS FOR TASK
// ##############################################################

module.exports.updateById = (taskId, taskData, callback) => {
    // update task by task id where you can change title description and points
    const SQL_STATEMENT = `
        UPDATE Task
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
    `;
    const VALUES = [taskData.title, taskData.description,taskData.points, taskId];

    pool.query(SQL_STATEMENT, VALUES, callback);
};


// ##############################################################
// DEFINE DELETE OPERATIONS FOR TASKS
// ##############################################################

module.exports.deleteById = (taskId, callback) => {
    // you can delete tasks accordingly
    const SQL_STATEMENT = `
        DELETE FROM Task
        WHERE task_id = ?;
    `;
    const VALUES = [taskId];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
