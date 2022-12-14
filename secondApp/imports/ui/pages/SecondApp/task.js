import './task.html'

const Todos = new Mongo.Collection(null);


Template.task.onCreated(function () {
    // Todos.insert({name: 'salam vermek'});
    // Todos.insert({name: 'salam vermek1'});
    // Todos.insert({name: 'salam vermek2'});
    // Todos.insert({name: 'salam vermek3'});
    // Todos.insert({name: 'salam vermek4'});



    // Todos.remove({name: 'salam vermek4'});
    // Todos.update({name: 'salam vermek3'}, {
    //     $set: {
    //         name: 'yes'
    //     }
    // }, {multi: true});
});





Template.task.helpers({
    showTodos() {
        return Todos.find({ type: true });
    },

    deleteOneTodo() {
        return Todos.findOne();
    },

    showPrivateTodos() {
        return Todos.find({ type: false });
    }
    // showTodosArr() {
    //     return Todos.find().fetch();
    // },
});



Template.task.events({
    'submit #addTaskForm'(event, template) {
        event.preventDefault();
        var y = event.target.typeApp.checked == false
        console.log(y);
        var x = event.target.taskName.value
        // Todos.insert({name: event.target.taskName.value})   
        if (x.length > 0) {
            Todos.insert({ name: x, type: y })
        }
        $('#addTaskForm').trigger('reset')

    },
    'click .delete'(event, template) {
        event.preventDefault()
        var itemId = this._id;
        Todos.remove({ _id: itemId });
        // console.log(itemId )
    },
    'submit #edit'(event, template) {
        event.preventDefault()
        var itemId = this._id;
        var x = event.target.editTask.value;
        // console.log(x)
        Todos.update({ _id: itemId }, {
            $set: {
                name: x
            }
        });
    },
    'click .btnDeleteAllPublic'(event,template){
        event.preventDefault()
        Todos.remove({type: true});
    },
    'click .btnDeleteAllPrivate'(event,template){
        event.preventDefault()
        Todos.remove({type: false});
    }
});