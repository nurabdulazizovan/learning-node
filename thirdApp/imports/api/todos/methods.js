import { Todos } from "./collections";

Meteor.methods({ 
    addTaskForm: function(data) { 
        return Todos.insert(data);
    
    },



    'remove.todo': function (_id) { 
        return Todos.remove({_id});
    },
    'removeAll.todo': function () { 
        return Todos.remove({});
    },
    'edit.todo': function (_id,editX) { 
        return Todos.update(
          {_id},
            {
                $set: {
                    text: editX.text
                }
            },

        )
       
    }
        
});