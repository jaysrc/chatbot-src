const express = require('express');
const UserRouter = express.Router();

const User = require('./Schema')
UserRouter.route('/add').post((req, res) => {
    let user = new User(req.body)
    console.log(user)
    user.save()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

module.exports = UserRouter;