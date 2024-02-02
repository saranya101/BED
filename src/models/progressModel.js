// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR TASK_PROGRESS
// ##############################################################

module.exports.validateuser = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    
    
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.validatetask = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}



module.exports.insertSingle = (data, callback) => {
    // insert values into the database
    const SQLSTATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id)
        VALUES (?, ?);
    `;
    const VALUES = [data.user_id, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, (error, results) => {
        if (error) {
            console.error("Error inserting TaskProgress:", error);
            callback(error);
        } else {
            // Update total_points in the User table
            const updateTotalPoints = `
                UPDATE User
                SET total_points = total_points + (SELECT points FROM Task WHERE task_id = ?)
                WHERE user_id = ?;
            `;
            const updateValues = [data.task_id, data.user_id];

            pool.query(updateTotalPoints, updateValues, (error, updateResults) => {
                if (error) {
                    console.error("Error updating total_points:", error);
                    callback(error);
                } else {
                    callback(null, results);
                }
            });
        }
    });
}



// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR TASK PROGRESS
// ##############################################################

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
const VALUES = [data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}



// ##############################################################
// DEFINE UPDATE OPERATIONS FOR NOTES IN PROGRESS_ID
// ##############################################################


module.exports.updateById = (progressId, userData, callback) => {
    const SQL_STATEMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;
    `;
    const VALUES = [userData.notes, progressId];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.fetchDetailsById = (progressId, callback) => {
    const SQL_FETCH = `
        SELECT user_id, task_id, completion_date
        FROM TaskProgress
        WHERE progress_id = ?;
    `;
    pool.query(SQL_FETCH, [progressId], callback);
};


// ##############################################################
// DEFINE DELETE OPERATIONS FOR TASKPROGRESS
// ##############################################################

module.exports.deleteById = (progressId, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;
    `;
    const VALUES = [progressId];

    pool.query(SQL_STATEMENT, VALUES, callback);
};