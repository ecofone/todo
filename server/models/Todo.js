//Todo.js: TODO Model
const mongoose = require('mongoose');
const {Schema} = mongoose;

const TodoSchema = new Schema({
    name: String,
    description: String,
    dateCreated: { type: Date, default: Date.now },
    dueDate: { type: Date, default: Date.now },
    priority: { type: String, default: "medium" },
    status: { type: String, default: "open"},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
    assignedTo:  { type: Schema.Types.ObjectId, ref: 'User' } 
});


TodoSchema.pre('save', function(next) {
    // Check if AssignedTo is null, in that case assigns user who created
    if (this.isNew && !this.assignedTo) {
        const document = this;
        this.assignedTo = this.createdBy;
    } 
    next();
});

//Update Todo Fields
TodoSchema.methods.updateFields = function(modifiedTodo){
    this.name = modifiedTodo.name;
    this.description = modifiedTodo.description;
    this.dueDate = modifiedTodo.dueDate;
    this.priority = modifiedTodo.priority;
    this.assignedTo = modifiedTodo.assignedTo;
  }


//Associate Schema to the Model (Collection)
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;