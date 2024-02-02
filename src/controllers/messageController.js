// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/messageModel")


// ##############################################################
// DEFINE CONTROLLER FUNCTION TO CREATE MESSAGE
// ##############################################################

module.exports.createMessage = (req, res, next) => {
    if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).send("Error: message_text is undefined");
        return;
    }
    else if(req.params.user_id == undefined)
    {
        res.status(400).send("Error: user_id is undefined");
        return;
    }

    const data = {
        user_id: res.locals.userId,
        message_text: req.body.message_text
    }

    console.log("data", data);

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}


// ##############################################################
// DEFINE CONTROLLER TO READ ALL MESSAGES
// ##############################################################

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}



// ##############################################################
// DEFINE CONTROLLER TO READ MESSAGES BY ID
// ##############################################################

module.exports.readMessageById = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER TO UPDATE MESSAGE BY ID
// ##############################################################

module.exports.updateMessageById = (req, res, next) => {
    if(req.params.id == undefined)
    {
        res.status(400).send("Error: id is undefined");
        return;
    }
    else if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).send("Error: message_text is undefined or empty");
        return;
    }
    const data = {
        id: req.params.id,
        user_id: res.locals.userId,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER TO DELETEE MESSAGE BY ID
// ##############################################################

module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteById(data, callback);
}