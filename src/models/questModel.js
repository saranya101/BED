// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');


// ##############################################################
// DISPLAY ALL QUESTS
// ##############################################################

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Quest;
    `;

    pool.query(SQLSTATMENT, callback);
}



// ##############################################################
// DEFINE MODEL FOR A SPECIFIC QUEST
// ##############################################################

module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}



// ##############################################################
// DEFINE MODEL TO ACCEPT QUESTS
// ##############################################################

module.exports.acceptQuest = (data, callback) => {
    const { user_id, quest_id } = data;

    // Check if the user already accepted the quest
    const checkQuestProgressQuery = `
        SELECT COUNT(*) AS progress_count
        FROM UserQuestProgress
        WHERE user_id = ? AND quest_id = ?;
    `;
    const checkQuestProgressValues = [user_id, quest_id];

    pool.query(checkQuestProgressQuery, checkQuestProgressValues, (progressError, progressResults) => {
        if (progressError) {
            console.error('Error checking quest progress:', progressError);
            return callback(progressError);
        }

        if (progressResults[0].progress_count > 0) {
            // User has already accepted the quest
            return callback({ message: 'User has already accepted this quest' });
        }

        // Fetch the quest's required magic groups
        const questMagicGroupsQuery = `
            SELECT magic_group_required
            FROM Quest
            WHERE quest_id = ?;
        `;
        const questMagicGroupsValues = [quest_id];

        pool.query(questMagicGroupsQuery, questMagicGroupsValues, (questError, questResults) => {
            if (questError) {
                console.error('Error retrieving quest magic groups:', questError);
                return callback(questError);
            }

            console.log('questResults:', questResults); // Log questResults to inspect its structure

            if (!questResults || questResults.length === 0) {
                // Handle case where no quest data is found
                return callback({ message: 'Quest not found or missing data' });
            }

            const requiredMagicGroups = questResults[0].magic_group_required.split(',').map(group => group.trim());

            // Retrieve the magic groups of the player's spells
            const spellMagicGroupsQuery = `
                SELECT DISTINCT s.magic_group
                FROM SpellOwnership so
                INNER JOIN Spell s ON so.spell_id = s.spell_id
                WHERE so.user_id = ?;
            `;
            const spellMagicGroupsValues = [user_id]; // Use user_id instead of data.user_id

            pool.query(spellMagicGroupsQuery, spellMagicGroupsValues, (spellError, spellResults) => {
                if (spellError) {
                    console.error('Error retrieving player spell magic groups:', spellError);
                    return callback(spellError);
                }

                const playerSpellMagicGroups = spellResults.map(result => result.magic_group);

                // Retrieve the magic group of the player's wizard
                const wizardMagicGroupQuery = `
                    SELECT magic_group 
                    FROM Wizard
                    WHERE wizard_id = (
                        SELECT wizard_id 
                        FROM User 
                        WHERE user_id = ?
                    );
                `;
                const wizardMagicGroupValues = [user_id]; // Use user_id instead of data.user_id

                pool.query(wizardMagicGroupQuery, wizardMagicGroupValues, (wizardError, wizardResults) => {
                    if (wizardError) {
                        console.error('Error retrieving player wizard magic group:', wizardError);
                        return callback(wizardError);
                    }

                    const playerWizardMagicGroup = wizardResults.length > 0 ? wizardResults[0].magic_group : null;

                    // Combine player's spell magic groups with wizard's magic group
                    const allPlayerMagicGroups = playerSpellMagicGroups.concat(playerWizardMagicGroup).filter(Boolean);

                    // Check if all required magic groups are included in the player's spells or wizard's magic group
                    const missingMagicGroups = requiredMagicGroups.filter(group => !allPlayerMagicGroups.includes(group));

                    if (missingMagicGroups.length > 0) {
                        // Player doesn't have spells or wizard's magic group for all required magic groups
                        return callback({ message: `Player does not have spells or wizard's magic group for required magic groups: ${missingMagicGroups.join(', ')}` });
                    }

                    // All required magic groups are fulfilled, proceed with accepting the quest
                    const insertQuery = 'INSERT INTO UserQuestProgress (user_id, quest_id) VALUES (?, ?)';
                    const insertValues = [user_id, quest_id];

                    pool.query(insertQuery, insertValues, (insertError, insertResults) => {
                        if (insertError) {
                            console.error('Error accepting quest:', insertError);
                            return callback(insertError);
                        }

                        // Return null for the error and the inserted results
                        callback(null, insertResults);
                    });
                });
            });
        });
    });
};



// ##############################################################
// DEFINE MODEL TO UPDATE QUEST PROGRESS
// ##############################################################


module.exports.updateQuestProgress = (user_id, quest_id, callback) => {
    // Retrieve the points awarded for the completed quest
    const getPointsQuery = `
        SELECT points_awarded
        FROM Quest
        WHERE quest_id = ?;
    `;
    const getPointsValues = [quest_id];

    pool.query(getPointsQuery, getPointsValues, (error, results) => {
        if (error) {
            console.error('Error retrieving points for quest:', error);
            return callback(error);
        }

        if (results.length === 0) {
            return callback({ message: 'Quest not found' });
        }

        const points_awarded = results[0].points_awarded;

        // Update the completion status of the quest for the player
        const updateQuery = `
            UPDATE UserQuestProgress
            SET completed = true
            WHERE user_id = ? AND quest_id = ?;
        `;
        const updateValues = [user_id, quest_id];

        pool.query(updateQuery, updateValues, (updateError, updateResults) => {
            if (updateError) {
                console.error('Error updating quest progress:', updateError);
                return callback(updateError);
            }

            // Check if the quest completion was successful
            if (updateResults.affectedRows === 0) {
                return callback({ message: 'Failed to update quest progress' });
            }

            // Update the player's total points
            const updateTotalPointsQuery = `
                UPDATE User
                SET total_points = total_points + ?
                WHERE user_id = ?;
            `;
            const updateTotalPointsValues = [points_awarded, user_id];

            pool.query(updateTotalPointsQuery, updateTotalPointsValues, (pointsError, pointsResults) => {
                if (pointsError) {
                    console.error('Error updating total points:', pointsError);
                    return callback(pointsError);
                }

                // Return success message
                callback(null, { message: 'Quest progress updated successfully' });
            });
        });
    });
};


// ##############################################################
// DEFINE MODEL TO DISPLAY AVAILABLE QUESTS PER USER
// ##############################################################


module.exports.displayAvailableQuests = (user_id, callback) => {
    // Query to retrieve quests available for the user based on magic groups possessed
    const availableQuestsQuery = `
        SELECT q.quest_id, q.title, q.description, q.points_awarded, q.magic_group_required
        FROM Quest q
        WHERE q.magic_group_required IN (
            SELECT DISTINCT s.magic_group
            FROM Spell s
            JOIN SpellOwnership so ON s.spell_id = so.spell_id
            WHERE so.user_id = ?
        )
        AND q.quest_id NOT IN (
            SELECT pq.quest_id
            FROM UserQuestProgress pq
            WHERE pq.user_id = ?
        );
    `;
    const availableQuestsValues = [user_id, user_id];

    pool.query(availableQuestsQuery, availableQuestsValues, (error, results) => {
        if (error) {
            console.error('Error retrieving available quests:', error);
            return callback(error);
        }

        // Return the list of available quests
        callback(null, results);
    });
};



// ##############################################################
// DEFINE MODEL TO DISPLAY ALL PENDING QUESTS BY USER
// ##############################################################

module.exports.selectQuestsForUser = (user_id, callback) => {
    const selectQuery = `
        SELECT *
        FROM UserQuestProgress uqp
        INNER JOIN Quest q ON uqp.quest_id = q.quest_id
        WHERE uqp.user_id = ? AND uqp.completed = false;
    `;
    const selectValues = [user_id];

    pool.query(selectQuery, selectValues, (error, results) => {
        if (error) {
            // Pass error to the callback function
            callback(error);
        } else {
            // Pass results to the callback function
            callback(null, results);
        }
    });
};



// ##############################################################
// DEFINE MODEL TO DELETE QUEST PROGRESS
// ##############################################################


module.exports.deleteQuestProgress = (user_id, quest_id, callback) => {
    // SQL query to delete the quest from user progress
    const deleteQuery = `
        DELETE FROM UserQuestProgress
        WHERE user_id = ? AND quest_id = ?;
    `;
    const deleteValues = [user_id, quest_id];

    // Execute the query
    pool.query(deleteQuery, deleteValues, (error, results) => {
        if (error) {
            console.error('Error deleting quest progress:', error);
            return callback(error);
        }

        // Check if the quest progress was deleted successfully
        if (results.affectedRows === 0) {
            return callback({ message: 'Quest progress not found' });
        }

        // Return success message
        callback(null, { message: 'Quest progress deleted successfully' });
    });
};
