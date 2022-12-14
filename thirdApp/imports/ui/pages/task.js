import './task.html'
import { Todos } from '../../api/todos/collections';




Template.task.onCreated(function () {
    let self = this
    this.autorun(()=> {
        self.subscribe('get.todos')
    });
});





Template.task.helpers({
    showTodos() {
        return Todos.find({});
    },
    // getOneTodo() {
    //     return Todos.findOne({text: 'Salam'});
    // }

});



Template.task.events({
    'submit #addTaskForm'(event, template){
        event.preventDefault();
        let text = event.target.txtTaskName.value;
        let y = event.target.typeApp.checked == true;


        let data = {
            text: text,
            type: y
        }


        if(!text) {
            return;
        }

        if(text.length>0){
            Meteor.call('addTaskForm', data,  function(error, success) { 
                if (error) { 
                    console.log('error', error); 
                } 
                if (success) { 
                     console.log('insertedId: ', success)
                } 
            });
        }
       
        $('#addTaskForm').trigger('reset')
    },

    'click .delete'(event, template){
        event.preventDefault()
        Meteor.call('remove.todo', this._id, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                console.log('removeId: ', success)
            } 
        });
    },
    'submit #edit'(event, template) {
        event.preventDefault()
        // var itemId = this._id;
        var x = event.target.editTask.value;
        let editX ={
            text: x,
        }
        // console.log(x)
        Meteor.call('edit.todo',this._id, editX, function(error, success) { 
            if (error) { 
                console.log('error nuruscum error ', error); 
            } 
            if (success) { 
                 console.log('updated: ', success)
            } 
        });
   
    },
    'click #btnDeleteAll'(event,template){
        event.preventDefault()
        Meteor.call('removeAll.todo', function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                console.log('removeId: ', success)
            } 
        });
    }
});