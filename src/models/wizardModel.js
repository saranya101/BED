// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');


// ##############################################################
// DISPLAY ALL WIZARDS
// ##############################################################

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Wizard;
    `;

    pool.query(SQLSTATMENT, callback);
}



// ##############################################################
// DEFINE MODEL FOR A SPECIFIC ID
// ##############################################################

module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Wizard
    WHERE wizard_id = ?;
    `;
    const VALUES = [data.wizard_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}




// ##############################################################
// DEFINE MODEL TO GET UNIQUE SPECIAL ABILITY NAMES
// ##############################################################

module.exports.getUniqueSpecialAbilities = (callback) => {
    const SQL_STATEMENT = `
        SELECT special_ability, COUNT(*) AS wizard_count
        FROM Wizard
        GROUP BY special_ability;
    `;

    pool.query(SQL_STATEMENT, callback);
};



// ##############################################################
// DEFINE MODEL TO GET WIZARDS BY SPECIAL ABILITY
// ##############################################################

module.exports.selectByType = (special_ability, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Wizard
    WHERE special_ability = ?;
    `;
    const VALUES = [special_ability];

    pool.query(SQLSTATMENT, VALUES, callback);
}



// ##############################################################
// DEFINE SELECT WIZARD BY WIZARD_ID
// ##############################################################

module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Wizard
    WHERE wizard_id = ?;
    `;
    const VALUES = [data.wizard_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}




// ##############################################################
// DEFINE MODEL TO GET UNIQUE MAGIC GROUP
// ##############################################################


module.exports.selectByMagicGroup = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Wizard
    WHERE magic_group = ?;
    `;
    const VALUES = [data.magic_group];

    pool.query(SQLSTATMENT, VALUES, callback);
}
