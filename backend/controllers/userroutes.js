const { Userdata } = require('../models/userdata');

const handleSignin = async (req, res) => {
    try {
        const body = req.body;
        const user = new Userdata({
            name: body.name,
            email: body.email,
            password: body.password,
            pic: {
                data: req.file.buffer,
                name: req.file.originalname
            }
        });
        await user.save();
        return res.json({ message: true });
    } catch (err) {
        return res.json({ message: false });
    }
}

const handleLogin = async (req, res) => {
    try {
        const data = await Userdata.findOne({ email: req.body.mail });
        if (!data || data.password !== req.body.pass) {
            return res.json({ message: false });
        } else {
            return res.json({ pic: data.pic.data, message: true });
        }
    } catch (err) {
        return res.json({ message: false });
    }
}

const handleRecieverdata = async (req, res) => {
    try {
        const data = await Userdata.findOne({ email: req.body.email });
        if (!data) {
            return res.json({ message: false });
        } else {
            return res.json({ name: data.name, pic: data.pic.data, message: true });
        }
    } catch (error) {
        return res.json({ message: false });
    }
}

module.exports = {
    handleSignin,
    handleLogin,
    handleRecieverdata,
}
