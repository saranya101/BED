// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/spellModel");


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO DISPLAY ALL SPELLS
// ##############################################################

module.exports.readAllSpells = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllSpells:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAll(callback);
};


// ##############################################################
// DEFINE CONTROLLER TO GET SPELLS THAT CAN BE BOUGHT BY USER
// ##############################################################

module.exports.selectByPoints = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectByPoints:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'User not found.' });
            } else {
                const userPoints = results[0].total_points;

                if (userPoints === 0) {
                    res.status(404).json({ message: 'You can\'t buy any spells. Do tasks and try again!' });
                } else {
                    res.status(200).json(results);
                }
            }
        }
    };

    model.selectByPoints(data, callback);
};


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO GET SPECIFIC SPELL BY ID
// ##############################################################

module.exports.selectBySpellId = (req, res, next) => {
    const data = {
        spell_id: req.params.spell_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectBySpellId:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Spell ID not found' });
            } else {
                res.status(200).json(results);
            }
        }
    };

    model.selectById(data, callback);
};



// ##############################################################
// DEFINE CONTROLLER FUNCTION TO GET ALL SPELLS BOUGHT BY USER
// ##############################################################


module.exports.selectBySpellIdPurchase = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectBySpellIdPurchase:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'No spells bought' });
            } else {
                res.status(200).json(results);
            }
        }
    };

    model.selectByPurchase(data, callback);
};


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR BUYING A SPELL
// ##############################################################

module.exports.buySpell = (req, res) => {
    const userId = res.locals.userId;
    const spellId = req.params.spell_id;

    // Check if the user has enough points to purchase the spell
    model.checkPoints(userId, spellId, (error, hasEnoughPoints) => {
        if (error) {
            console.error("Error checking points:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (!hasEnoughPoints) {
            return res.status(400).json({ message: "Insufficient points to purchase spell" });
        }

        // Check if the user already owns the spell
        model.checkSpellOwnership(userId, spellId, (error, alreadyOwned) => {
            if (error) {
                console.error("Error checking spell ownership:", error);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (alreadyOwned) {
                return res.status(409).json({ message: "Conflict: Spell already owned by user" });
            }

            // If user has enough points and doesn't already own the spell, proceed with the purchase
            model.purchaseSpell(userId, spellId, (error, success) => {
                if (error) {
                    console.error("Error purchasing spell:", error);
                    return res.status(500).json({ error: "Internal server error" });
                }
                
                if (success) {
                    return res.status(200).json({ message: "Spell purchased successfully" });
                } else {
                    // If success is false, it means the purchase failed
                    return res.status(400).json({ error: "Failed to purchase spell" });
                }
            });
        });
    });
};
