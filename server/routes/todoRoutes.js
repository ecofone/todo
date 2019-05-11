//todoRoutes.js: Todo CRUD routes
var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');
const requireLogin = require('../middlewares/requireLogin');

//Get one Todo
router.get('/:todoID', requireLogin, async (req,res) => {
    try {
        var todo = await Todo.getTodo(req.params.todoID);
        if (todo){
            res.send(todo);
        }
        else {
            res.status(404).send({msg:"Todo does not Exist"});
        }
    } catch (err) {
        res.status(422).send(err);
    }
});

//Get All Todos
router.get('/', requireLogin, async (req,res) => {
    try {
        var todos = await Todo.getAllTodosOfUser(req.user);
        res.send(todos);
    } catch (err) {
        res.status(422).send(err);
    }
});

//Create a new TODO
router.post('/create', requireLogin, async (req,res) => {
    try {
        const todo = await new Todo({...req.body, createdBy: req.user.id}).save();
        res.send(todo);
    } catch (err) {
        res.status(422).send(err);
    }
});

//Edit a TODO
router.post('/edit/:todoID', requireLogin, async (req,res) => {
    try {
        var todo = await Todo.findById(req.params.todoID);
        if (todo){
            todo.updateFields(req.body);
            todo = await todo.save()
            res.send(todo);
        }
        else {
            res.status(404).send({msg:"Todo do not Exist"});
        }
    } catch (err) {
        res.status(422).send(err);
    }
});


//Delete a TODO
router.delete('/delete/:todoID', requireLogin, async (req,res) => {
    try {
        await Todo.deleteOne({_id: req.params.todoID});
        res.send({ msg: "Todo Deleted"} );
    } catch (err) {
        res.status(422).send(err);
    }
});

module.exports = router;

