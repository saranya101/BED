// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');


// ##############################################################
// MODEL FOR LOG IN
// ##############################################################

module.exports.selectAdminByUsernameAndPassword = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT admin_id, password FROM admin
        WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE MODEL FOR RETRIEVE ALL USERS
// ##############################################################

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

pool.query(SQLSTATMENT, callback); 
}


// ##############################################################
// DEFINE MODEL FOR RETRIEVE SPECIFIC USER
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


module.exports.selectById = async (data, callback) => {
    try {
        const user = await getUser(data.user_id);
        const wizard = await getuserWizard(data.user_id);

        const formattedResults = {
            user: user,
            wizard: wizard
        };

        callback(null, formattedResults);
    } catch (error) {
        callback(error);
    }
};


// ##############################################################
// DEFINE MODEL FOR DELETE USER BY ID
// ##############################################################
module.exports.deleteById = (user_id, callback) => {
    const SQL_STATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;
    `;
    const VALUES = [user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};






// ##############################################################
// DEFINE MODEL FOR DELETE MESSAGES 
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}