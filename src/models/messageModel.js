// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');


// ##############################################################
// MODEL TO CREATE MESSAGE
// ##############################################################

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE MODEL TO READ ALL MESSAGES
// ##############################################################


module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT Messages.*, User.username, User.email 
    FROM Messages 
    LEFT JOIN User ON Messages.user_id = User.user_id;
    `;

    pool.query(SQLSTATEMENT, callback);
}

// ##############################################################
// DEFINE MODEL TO SELECT MESSAGE BY ID
// ##############################################################

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// ##############################################################
// DEFINE MODEL TO UPDATE MEESAGE BY ID
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?, user_id = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.user_id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// ##############################################################
// DEFINE MODEL TO DELETE BY ID
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


