import './todo.html'

Template.todo.onCreated(function () {
    this.taskList = new ReactiveVar([]);
});





Template.todo.helpers({
    showTodos() {
        return Template.instance().todos.get();
    },

    increase(eded) {
        return this + 10 + eded;
    },
    allEvents(){
        return Template.instance().taskList.get();
    },
    removeItem(){
        return Template.instance().taskList.get()
    }
});



Template.todo.events({
    'submit #addTaskForm'(event, template){
        event.preventDefault();
        console.log('submitin cavabi', event.target.taskName.value);
        template.taskList.set([...template.taskList.get(), event.target.taskName.value]);        
    },


        

        // function sumbitHandler(){
        //     var input =$('#txtTaskName');
        //     // 'keyup #txtTaskName'(e, template){
        //     //     e.target.value;
        //     //     console.log(e.target.value);
        //     // }
        // }
        // console.log('evenet: ', event);
        // template.taskList.set([...template.taskList.get()])


    'click .delete-item'(event, template){
        event.preventDefault()

        // var x = $('.list-group-item').value;
        // var x = template.taskList.set([ documentId])
        // var y = event.target;
        var itemId = this;
        itemId
        console.log(itemId);
        // template.tasklist.set(template.taskList.get(), []);
    }
    // 'keyup #txtTaskName'(event, template){
    //     // var sumbitForm =$("#addTaskForm");
    //     // submitForm =event.target.value;
    //     console.log(event.target.value);

    // }
    

});