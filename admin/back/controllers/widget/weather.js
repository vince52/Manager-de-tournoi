const User = require("../../schema/schemaUser.js");
const Widget = require("../../schema/schemaWidget.js");
const passwordHash = require("password-hash");

async function addWeather(req, res) {
    const { value, time, token, postion} = req.body;
    if (!value || !token) {
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
    const schem = {
        name,
        value,
        findMail,
        postion,
        time
    };
    if (!time)
        schem.time = 100;
    if (!position)
        schem.postion = 0;
    try {
        const schemData = new Widget(schem);
        const userObject = await userData.save();
        return res.status(200).json({
            text: "Success",
            widgetName: schem.name
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

exports.addWeather = addWeather;