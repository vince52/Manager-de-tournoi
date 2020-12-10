const User = require("../../schema/schemaUser.js");
const Widget = require("../../schema/schemaWidget.js");
const passwordHash = require("password-hash");

async function getWidgects(req, res) {
    const { token} = req.body;
    if (!token) {
        return res.status(400).json({
            text: "Invalid Request"
        });
    }
    var findMail;
    User.collection.find().forEach( function test(tuser) {findMail = tuser.getEmail(token)})
    if (!findMail) {
        return res.status(401).json({
            text: "The User doesn't exist"
        });
    }
    const findMod = await User.find({ findMail });
    return res.status(200).json({
            text: "Success",
            widgets: findMod
    });
}

exports.getWidgects = getWidgects;