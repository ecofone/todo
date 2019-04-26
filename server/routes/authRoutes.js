const User = require('../models/User');

module.exports = app => {

    //Create a new User
    app.post('/api/auth', async (req,res) => {
        const user = await new User(req.body).save();
        res.send("User Created!");
    });

    //Get current user logged in
    app.get('/api/users', async (req,res) => {
        const users = await User.find();
        res.send(users);
    });
}
