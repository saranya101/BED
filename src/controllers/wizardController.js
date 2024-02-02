// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/wizardModel")


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO DISPLAY ALL IDS
// ##############################################################

module.exports.readAllWizards = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER TO READ SPECIFIC ID
// ##############################################################

module.exports.selectById = (req, res, next) => {
    const data = {
        wizard_id: req.params.wizard_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send({
                    message: 'ID is not found. Check and try again'
                });
            }
            else res.status(200).send(results);
        }
    }

    model.selectById(data, callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO UNIQUE SPECIAL ABILITY NAMES
// ##############################################################

module.exports.readUniqueSpecialAbility = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.getUniqueSpecialAbilities(callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO GET WIZARD BY ABILITY
// ##############################################################

module.exports.selectBySpecialAbility = (req, res, next) => {
    const special_ability = req.body.special_ability


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send({
                    message: 'No special ability found'
                });
            }
            else res.status(200).send(results);
        }
    }

    model.selectByType(special_ability, callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ WIZARD BY ID
// ##############################################################

module.exports.selectById = (req, res, next) => {
    const data = {
        wizard_id: req.params.wizard_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send({
                    message: 'ID is not found. Check and try again'
                });
            }
            else res.status(200).send(results);
        }
    }

    model.selectById(data, callback);
}


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR SPELL GROUP
// ##############################################################

module.exports.selectByMagicGroup = (req, res, next) => {
    const data = {
        magic_group: req.body.magic_group
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send({
                    message: 'No wizards in this category.'
                });
            }
            else res.status(200).send(results);
        }
    }

    model.selectByMagicGroup(data, callback);
}
