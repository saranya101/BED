// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
//  DEFINE INSERT OPERATION FOR USER
// ##############################################################

module.exports.insertSingle = (data, callback) => {
    const { username, email, password } = data;

    const insertUserQuery = `
        INSERT INTO User (username, email, password, wizard_id)
        VALUES (?, ?, ?, (SELECT wizard_id FROM Wizard ORDER BY RAND() LIMIT 1))
    `;

    // Execute the INSERT INTO User query
    pool.query(insertUserQuery, [username, email, password], (error, results) => {
        if (error) {
            return callback(error);
        }
        callback(null, results);
        
    });
};


// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR user
// ##############################################################

const getUser = (user_id) => {
    
    return new Promise((resolve, reject) => {
        const SQL_user = `
        SELECT user.user_id, user.username, user.email, user.total_points, w.*
        FROM user
        LEFT JOIN Wizard w ON user.wizard_id = w.wizard_id
        WHERE user.user_id = ?;

        `;
        
        const VALUES_user = [user_id];
        pool.query(SQL_user, VALUES_user, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};


const getuserSpells = (user_id) => {
    return new Promise((resolve, reject) => {
        const SQL_SPELLS = `
            SELECT s.* FROM Spell s
            INNER JOIN SpellOwnership so ON s.spell_id = so.spell_id
            WHERE so.user_id = ?;
        `;
        const VALUES_SPELLS = [user_id];
        pool.query(SQL_SPELLS, VALUES_SPELLS, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getuserWizard = (user_id) => {
    return new Promise((resolve, reject) => {
        const SQL_WIZARD = `
            SELECT w.* FROM Wizard w
            INNER JOIN user p ON w.wizard_id = p.wizard_id
            WHERE p.user_id = ?;
        `;
        const VALUES_WIZARD = [user_id];
        pool.query(SQL_WIZARD, VALUES_WIZARD, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const getuserQuests = (user_id) => {
    return new Promise((resolve, reject) => {
        const SQL_QUESTS = `
            SELECT q.* 
            FROM Quest q
            INNER JOIN userQuestProgress pq ON q.quest_id = pq.quest_id
            WHERE pq.user_id = ? AND pq.completed = false;
        `;
        const VALUES_QUESTS = [user_id];
        pool.query(SQL_QUESTS, VALUES_QUESTS, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getTaskProgress = (user_id) => {
    return new Promise((resolve, reject) => {
        const SQL_TASK_PROGRESS = `
            SELECT tp.*, t.title, t.points
            FROM TaskProgress tp
            INNER JOIN Task t ON tp.task_id = t.task_id
            WHERE tp.user_id = ?;
        `;
        const VALUES_TASK_PROGRESS = [user_id];
        pool.query(SQL_TASK_PROGRESS, VALUES_TASK_PROGRESS, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports.selectById = async (data, callback) => {
    try {
        const user = await getUser(data.user_id);
        const spells = await getuserSpells(data.user_id);
        const wizard = await getuserWizard(data.user_id);
        const quests = await getuserQuests(data.user_id);
        const taskProgress = await getTaskProgress(data.user_id);

        const formattedResults = {
            user: user,
            spells: spells.length > 0 ? spells : 'No spells bought by this user',
            wizard: wizard,
            quests: quests.length > 0 ? quests : 'No quests taken up by this user',
            taskProgress: taskProgress.length > 0 ? taskProgress : 'No task progress for this user'
        };

        callback(null, formattedResults);
    } catch (error) {
        callback(error);
    }
};



// ##############################################################
// DEFINE MODEL TO UPDATE USER BY A SPECIFIC ID
// ##############################################################


module.exports.checkAndUpdateUser = (userId, userData, callback) => {
    const checkExisting = `
        SELECT user_id
        FROM User
        WHERE (user_id <> ? AND username = ?) OR (user_id <> ? AND email = ?);
    `;
    const checkValues = [userId, userData.username, userId, userData.email];

    pool.query(checkExisting, checkValues, (error, results) => {
        if (error) {
            console.error("Error checking existing data:", error);
            callback(500, { error: "Internal Server Error" });
            return;
        }

        if (results.length > 0) {
            callback(409);
            return;
        }

        const SQL_STATEMENT = `
            UPDATE User 
            SET username = ?, email = ?
            WHERE user_id = ?;
        `;
        const VALUES = [userData.username, userData.email, userId];

        pool.query(SQL_STATEMENT, VALUES, (updateError, updateResults) => {
            if (updateError) {
                console.error("Error updating user:", updateError);
                callback(500, { error: "Internal Server Error" });
                return;
            }

            if (updateResults.affectedRows === 0) {
                callback(404, { error: "User not found" });
                return;
            }

            callback(200, {
                user_id: userId,
                username: userData.username,
                email: userData.email
            });
        });
    });
};




// ##############################################################
// DEFINE MODEL TO DELETE USER BY A SPECIFIC ID
// ##############################################################

module.exports.deleteById = (user_id, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;
    `;
    const VALUES = [user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};


//////////////////////////////////////////////////////
// SELECT USER BY USERNAME AND PASSWORD
//////////////////////////////////////////////////////
module.exports.selectUserByUsernameAndPassword = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id, password FROM User
        WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}


// ##############################################################
// DEFINE MODEL TO DELETE USER BY A SPECIFIC ID
// ##############################################################

module.exports.chkExist = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id FROM User
        WHERE username = ? OR email = ?;
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}