// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE MODEL FUNCTION TO SELECT ALL SPELLS
// ##############################################################

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Spell;
    `;
    pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE MODEL FUNCTION TO SELECT SPELLS THAT CAN BE BOUGHT BY USER
// ##############################################################

module.exports.selectByPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT *
        FROM Spell
        WHERE points_cost <= (
            SELECT total_points
            FROM User
            WHERE user_id = ?
        );
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL FUNCTION TO SELECT SPECIFIC SPELL BY ID
// ##############################################################

module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Spell
        WHERE spell_id = ?;
    `;
    const VALUES = [data.spell_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE MODEL FUNCTION TO CHECK IF USER HAS ENOUGH POINTS
// ##############################################################


// Function to check if the user already owns the spell
module.exports.checkSpellOwnership = (userId, spellId, callback) => {
    // Query to check if the user already owns the spell
    const CHECK_SPELL_OWNERSHIP_QUERY = `
        SELECT COUNT(*) AS count FROM SpellOwnership WHERE user_id = ? AND spell_id = ?;
    `;

    // Execute the query
    pool.query(CHECK_SPELL_OWNERSHIP_QUERY, [userId, spellId], (error, results) => {
        if (error) {
            // If an error occurs, return the error
            return callback(error);
        }

        // Retrieve the count of spell ownership from the query results
        const spellOwnershipCount = results[0].count;

        // Determine if the user already owns the spell based on the count
        const alreadyOwned = spellOwnershipCount > 0;

        // Return the result to the callback function
        callback(null, alreadyOwned);
    });
};

module.exports.checkPoints = (userId, spellId, callback) => {
    const CHECK_POINTS_QUERY = `
        SELECT points_cost FROM Spell WHERE spell_id = ?;
    `;
    pool.query(CHECK_POINTS_QUERY, [spellId], (error, results) => {
        if (error) {
            return callback(error);
        }

        const spellPoints = results[0].points_cost;

        const GET_USER_POINTS_QUERY = `
            SELECT total_points FROM User WHERE user_id = ?;
        `;
        pool.query(GET_USER_POINTS_QUERY, [userId], (error, results) => {
            if (error) {
                return callback(error);
            }

            const userPoints = results[0].total_points;
            const hasEnoughPoints = userPoints >= spellPoints;

            // Pass the boolean result to the callback
            callback(null, hasEnoughPoints);
        });
    });
};

// ##############################################################
// DEFINE MODEL FUNCTION TO PURCHASE A SPELL
// ##############################################################



module.exports.purchaseSpell = (userId, spellId, callback) => {
    module.exports.checkPoints(userId, spellId, (error, hasEnoughPoints) => {
        if (error) {
            console.error("Error checking points:", error);
            return callback(error);
        }

        if (!hasEnoughPoints) {
            return callback(null, false); // Insufficient points
        }

        // Check if the spell has already been bought by the user
        const CHECK_SPELL_OWNERSHIP_QUERY = `
            SELECT COUNT(*) AS count FROM SpellOwnership WHERE user_id = ? AND spell_id = ?;
        `;
        pool.query(CHECK_SPELL_OWNERSHIP_QUERY, [userId, spellId], (error, results) => {
            if (error) {
                return callback(error);
            }

            const spellOwnershipCount = results[0].count;

            if (spellOwnershipCount > 0) {
                return callback(null, false); // Spell already owned
            }

            // Deduct spell points from the player's total points
            const CHECK_POINTS_QUERY = `
                SELECT points_cost FROM Spell WHERE spell_id = ?;
            `;
            pool.query(CHECK_POINTS_QUERY, [spellId], (error, results) => {
                if (error) {
                    return callback(error);
                }

                const spellPoints = results[0].points_cost;

                const DEDUCT_POINTS_QUERY = `
                    UPDATE User SET total_points = total_points - ? WHERE user_id = ?;
                `;
                pool.query(DEDUCT_POINTS_QUERY, [spellPoints, userId], (error, results) => {
                    if (error) {
                        return callback(error);
                    }

                    // Insert into SpellOwnership table
                    const INSERT_SPELL_OWNERSHIP_QUERY = `
                        INSERT INTO SpellOwnership (user_id, spell_id) VALUES (?, ?);
                    `;
                    pool.query(INSERT_SPELL_OWNERSHIP_QUERY, [userId, spellId], (error, results) => {
                        if (error) {
                            return callback(error);
                        }
                        callback(null, true); // Successful purchase
                    });
                });
            });
        });
    });
};





// ##############################################################
// DEFINE MODEL FUNCTION TO GET SPELLS BOUGHT BY A PLAYER
// ##############################################################

module.exports.selectByPurchase = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT SpellOwnership.player_id, Spell.*
        FROM SpellOwnership
        INNER JOIN Spell ON SpellOwnership.spell_id = Spell.spell_id
        WHERE SpellOwnership.player_id = ?;
    `;
    const VALUES = [data.player_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};
